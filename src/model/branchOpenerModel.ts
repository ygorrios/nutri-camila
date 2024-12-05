import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import convertDynamoDBToObject from 'src/utils/convertDynamoDBToObject'
import { dynamodbDocClient } from 'src/utils/serverlessDynamoDB'

const boTableName = 'branch-opener-mapping-table'
const addEnvironment = async (data: any) => {
  const commandMT = new ScanCommand({
    TableName: boTableName,
  })

  const responseMT = await dynamodbDocClient.send(commandMT)
  const convertedItemsMT = convertDynamoDBToObject(responseMT?.Items)
  const sortedItemsMT = convertedItemsMT?.sort((a: any, b: any) => b.id - a.id)?.[0]

  const newId = (Number(sortedItemsMT?.id) || 0) + 1

  const command = new PutCommand({
    TableName: boTableName,
    Item: { ...data, ...{ id: newId } },
  })

  const response = await dynamodbDocClient.send(command)
  return response
}

const editEnvironment = async (data: any) => {
  const envData = await getEnvironmentById(data.id)

  const command = new PutCommand({
    TableName: boTableName,
    Item: { ...envData, ...data },
  })

  const response = await dynamodbDocClient.send(command)
  return response
}

const getEnvironment = async ({ userEmail, isOnlyGlobal = false }: { userEmail?: string; isOnlyGlobal?: boolean }) => {
  const command = new ScanCommand({
    TableName: boTableName,
  })

  const response = await dynamodbDocClient.send(command)
  let convertedItems = convertDynamoDBToObject(response?.Items)

  if (!convertedItems || convertedItems.length === 0) {
    throw new Error('No items returned from DynamoDB.')
  }

  if (isOnlyGlobal) {
    convertedItems = convertedItems.filter((item) => item.isGlobalEnv || item.createdBy === userEmail)
  }

  // Assuming you want to create `envObj` for each item in `convertedItems`
  const envObjs: EnvDropdown[] = convertedItems.map((item) => ({
    id: Number(item.id) as number,
    name: item.description as string,
    isGlobal: item.isGlobalEnv as boolean,
    createdBy: item.createdBy as string,
    isIntegrations: item.isIntegrations as boolean,
    kioskUsername: item.kioskUsername as string,
    kioskPw: item.kioskPw as string,
  }))

  return envObjs.sort((a, b) => a.name.localeCompare(b.name))
}

const getEnvironmentById = async (envId: number) => {
  const command = new QueryCommand({
    TableName: boTableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': Number(envId),
    },
    ReturnConsumedCapacity: 'NONE',
  })

  const resultQuery = await dynamodbDocClient.send(command)
  const result = resultQuery?.Items?.[0]
  if (!result) {
    return null
  }
  return {
    id: result.id,
    name: result.description,
    isIntegrations: result.isIntegrations,
    kioskUsername: result.kioskUsername,
    kioskPw: result.kioskPw,
    dbHost: result.dbHost,
    dbUser: result.dbUser,
    dbPass: result.dbPass,
    dbSid: result.dbSid,
    clientId: result.clientId,
    isGlobalEnv: result.isGlobalEnv,
    createdBy: result.createdBy,
  }
}

export { addEnvironment, editEnvironment, getEnvironment, getEnvironmentById }
