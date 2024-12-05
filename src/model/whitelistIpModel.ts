import { ScanCommand } from '@aws-sdk/client-dynamodb'
import {
  AuthorizeSecurityGroupIngressCommand,
  DescribeSecurityGroupsCommand,
  EC2Client,
  IpRange,
  Ipv6Range,
  RevokeSecurityGroupIngressCommand,
  SecurityGroup,
} from '@aws-sdk/client-ec2'
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import lodash from 'lodash'
import { AcreIntranetIp, Group } from 'src/types/Whitelist.types'
import convertDynamoDBToObject from 'src/utils/convertDynamoDBToObject'
import { dynamodbDocClient } from 'src/utils/serverlessDynamoDB'
const ec2Client = new EC2Client({ region: 'eu-west-1' }) // Replace with your region
const acreIntranetIpsTableName = 'acre-intranet-ips'
const acreIntranetSecurityGroupsTableName = 'acre-intranet-security-groups'

export interface SecurityGroupProps extends SecurityGroup {
  ip: string
  name: string
  fromPort: number
  toPort: number
  ipProtocol: string
  ipRanges: IpRange[]
  ipv6Ranges: Ipv6Range[]
  // prefixListIds: string[] | string
  // vpcName: 'tds.ie' | 'tdscloud.ie' | 'tdscloud.io'
  // securityGroupName: string;
  // securityGroupDescription: string;
  // ingressRules: IngressRule[];
}

// type SecurityGroup = {
//   GroupId: string
//   GroupName: string
//   Description: string
//   IpPermissions: IpPermission[]
// }

// type IpPermission = {
//   FromPort: number
//   ToPort: number
//   IpProtocol: string
//   IpRanges: IpRange[]
//   Ipv6Ranges: Ipv6Range[]
//   PrefixListIds: string[]
// }

// type IpRange = {
//   CidrIp: string
// }

// type Ipv6Range = {
//   CidrIpv6: string
// }

type AcreIntranetIps = {
  ip: string
  name: string
  group: string
}

// type AcreIps = {
//   checked?: boolean
//   ip: string
//   name: string
//   ruleNumber: number
//   fromPort: number
//   toPort: number
//   ipProtocol: string
//   ipRanges: IpRange[]
//   ipv6Ranges: Ipv6Range[]
//   prefixListIds: string[]
// }

const getSecurityGroupById = async (groupId: string | string[]) => {
  const isArray = lodash.isArray(groupId)
  const command = new DescribeSecurityGroupsCommand({
    Filters: [
      {
        Name: 'group-id',
        Values: isArray ? groupId : [groupId],
      },
    ],
  })

  try {
    const response = await ec2Client.send(command)
    if (response.SecurityGroups && response.SecurityGroups.length > 0) {
      return response.SecurityGroups as SecurityGroup[]
    } else {
      throw new Error(`No security group found with the name: ${groupId}`)
    }
  } catch (error) {
    console.error('Error fetching security group:', error)
  }
}

const getUserExistentInSecurityGroup = (securityGroup: SecurityGroup) => {
  let result: SecurityGroupProps[] = []

  securityGroup?.IpPermissions?.forEach((ipItem) => {
    ipItem?.IpRanges?.forEach((rule: any, index) => {
      result.push({
        ip: rule.CidrIp,
        name: rule.Description,
        fromPort: ipItem.FromPort ?? 0,
        toPort: ipItem.ToPort ?? 0,
        ipProtocol: ipItem.IpProtocol ?? '',
        ipRanges: ipItem.IpRanges ?? [],
        ipv6Ranges: ipItem.Ipv6Ranges ?? [],
        // prefixListIds: ipItem.PrefixListIds ?? [],
      })
    })
  })
  return result
}

const getSecurityGroupIps = (securityGroups: SecurityGroup[]) => {
  let result: AcreIntranetIp[] = []

  securityGroups.forEach((securityGroup) => {
    const currentGroup = {
      id: securityGroup.GroupId,
      name: securityGroup?.Tags?.find((tag) => tag.Key === 'Name')?.Value || securityGroup.GroupName,
    } as Group
    securityGroup?.IpPermissions?.forEach((ipItem) => {
      ipItem?.IpRanges?.forEach((rule: any, index) => {
        const newResult = [...result]
        const foundIp = newResult.find((item) => item.ip === rule.CidrIp) as AcreIntranetIp
        if (foundIp) {
          // foundIp.name = rule.Description
          if (!foundIp?.groups) {
            foundIp.groups = []
          }
          foundIp.groups.push(currentGroup)
        } else {
          result.push({
            ip: rule.CidrIp,
            name: rule.Description,
            groups: [currentGroup],
          })
        }
      })
    })
  })
  return result
}

const addIpsToDynamoDB = async (ips: SecurityGroupProps[], securityGroup: any) => {
  const requests = ips?.map(async (item) => {
    // Use GetCommand to retrieve the existing item by IP
    const getCommand = new GetCommand({
      TableName: acreIntranetIpsTableName,
      Key: { ip: item.ip },
    })

    const existingData = (await dynamodbDocClient.send(getCommand))?.Item

    // Merge groups using lodash.unionBy to avoid duplicates
    const newGroups = lodash.unionBy(
      existingData?.groups || [],
      [{ id: securityGroup?.GroupId, name: securityGroup?.GroupName }],
      'id',
    )

    // Prepare the item for insertion/updating
    const putCommand = new PutCommand({
      TableName: acreIntranetIpsTableName,
      Item: {
        ip: item.ip,
        name: item?.name || '',
        groups: newGroups,
      },
    })

    // Return the promise for sending the command
    return dynamodbDocClient.send(putCommand)
  })

  try {
    // Execute all requests in parallel
    await Promise.all(requests)
    console.log('All items inserted or updated successfully.')
  } catch (error) {
    console.error('Error inserting items into DynamoDB:', error)
  }
}

const getIpsModel = async () => {
  const command = new ScanCommand({
    TableName: acreIntranetIpsTableName,
  })

  const response = await dynamodbDocClient.send(command)
  const convertedItems = convertDynamoDBToObject(response?.Items)

  if (!convertedItems) {
    throw new Error('No items returned from DynamoDB.')
  }
  return convertedItems as AcreIntranetIps[]
}

const getSecurityGroupsModel = async () => {
  const command = new ScanCommand({
    TableName: acreIntranetSecurityGroupsTableName,
  })

  const response = await dynamodbDocClient.send(command)
  const convertedItems = convertDynamoDBToObject(response?.Items)

  if (!convertedItems) {
    throw new Error('No items returned from DynamoDB.')
  }
  return convertedItems
}

/**
 * Add a new IP to the security group
 * @param {string} securityGroupId - The ID of the security group
 * @param {string} ip - The IP address to allow (CIDR format, e.g., "203.0.113.0/32")
 * @param {string} description - A description for the new rule
 */
const addIpToSecurityGroup = async ({
  securityGroupId,
  ip,
  description,
}: {
  securityGroupId: string
  ip: string
  description: string
}) => {
  const params = {
    GroupId: securityGroupId,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: 0,
        ToPort: 65535,
        IpRanges: [
          {
            CidrIp: ip,
            Description: description,
          },
        ],
      },
    ],
  }

  try {
    const data = await ec2Client.send(new AuthorizeSecurityGroupIngressCommand(params))
    // console.log('IP added to security group:', data)
  } catch (err) {
    console.error('Error adding IP:', err)
  }
}

/**
 * Update an IP in the security group based on its description
 * @param {string} securityGroupId - The ID of the security group
 * @param {string} oldIp - The current IP address to update
 * @param {string} newIp - The new IP address
 * @param {string} description - The description used to identify the rule
 */
async function updateIpInSecurityGroup({
  newSecurityGroupId,
  oldSecurityGroupId,
  oldIp,
  newIp,
  description,
}: {
  newSecurityGroupId: string
  oldSecurityGroupId: string
  oldIp: string
  newIp: string
  description: string
}) {
  // First, remove the old IP
  await removeIpFromSecurityGroup({ securityGroupId: oldSecurityGroupId, ip: oldIp })
  // Then, add the new IP with the same description
  await addIpToSecurityGroup({ securityGroupId: newSecurityGroupId, ip: newIp, description })
}

/**
 * Remove an IP from the security group
 * @param {string} securityGroupId - The ID of the security group
 * @param {string} ip - The IP address to remove (CIDR format)
 */
const removeIpFromSecurityGroup = async ({ securityGroupId, ip }: { securityGroupId: string; ip: string }) => {
  const params = {
    GroupId: securityGroupId,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: 0,
        ToPort: 65535,
        IpRanges: [
          {
            CidrIp: ip,
          },
        ],
      },
    ],
  }

  try {
    const data = await ec2Client.send(new RevokeSecurityGroupIngressCommand(params))
    // console.log('IP removed from security group:', data)
  } catch (err) {
    console.error('Error removing IP:', err)
  }
}

/**
 * Find an IP rule in the security group by description
 * @param {string} securityGroupId - The ID of the security group
 * @param {string} description - The description used to find the IP rule
 */
const findIpInSecurityGroupByDescription = async ({
  securityGroupId,
  description,
}: {
  securityGroupId: string
  description: string
}) => {
  const params = {
    GroupIds: [securityGroupId],
  }

  try {
    const data = await ec2Client.send(new DescribeSecurityGroupsCommand(params))
    const securityGroup = data?.SecurityGroups?.[0]

    if (securityGroup?.IpPermissions) {
      for (const permission of securityGroup?.IpPermissions) {
        if (permission?.IpRanges) {
          for (const range of permission?.IpRanges) {
            if (range.Description === description) {
              return range.CidrIp
            }
          }
        }
      }
    }
    return null // IP not found
  } catch (err) {
    console.error('Error finding IP in security group:', err)
    return null
  }
}

export {
  addIpsToDynamoDB,
  addIpToSecurityGroup,
  getIpsModel,
  getSecurityGroupById,
  getSecurityGroupIps,
  getSecurityGroupsModel,
  getUserExistentInSecurityGroup,
  removeIpFromSecurityGroup,
  updateIpInSecurityGroup,
}
