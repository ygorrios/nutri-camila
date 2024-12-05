import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import convertDynamoDBToObject from 'src/utils/convertDynamoDBToObject'
import { dynamodbDocClient } from 'src/utils/serverlessDynamoDB'

const userTableName = 'acre-intranet-users'
const logUser = async (data: any) => {
  try {
    const scanCommand = new ScanCommand({
      TableName: userTableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: data?.email },
      },
      ReturnConsumedCapacity: 'NONE',
    })
    const result = (await dynamodbDocClient.send(scanCommand)) as any
    const convertedItems = convertDynamoDBToObject(result?.Items) as any
    if (convertedItems?.length > 0) {
      return convertedItems?.[0]
    }

    const command = new PutCommand({
      TableName: userTableName,
      Item: data,
    })

    const newUser = await dynamodbDocClient.send(command)
    return newUser
  } catch (error) {
    console.log('Error in logUser', error)
  }
  return false
}

const getUserByEmail = async (email: string) => {
  try {
    const scanCommand = new ScanCommand({
      TableName: userTableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: email },
      },
      ReturnConsumedCapacity: 'NONE',
    })

    const result = (await dynamodbDocClient.send(scanCommand)) as any
    const convertedItems = convertDynamoDBToObject(result?.Items) as any
    if (convertedItems?.length > 0) {
      return convertedItems?.[0]
    }
  } catch (error: any) {
    if (error.message !== 'Credential is missing') {
      console.log('Error in getUserByEmail', error)
    }
  }
  return null
}

const isAdminHandler = async (email: string) => {
  if (!email) {
    return false
  }

  try {
    const userData = await getUserByEmail(email)
    const isAdmin = userData?.isAdmin || false
    return isAdmin
  } catch (error) {
    console.log('Error in isAdminHandler', error)
    return false
  }
}

export { getUserByEmail, isAdminHandler, logUser }
