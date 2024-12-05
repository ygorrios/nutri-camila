import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const region = 'eu-west-1'
const dynamodbClient = new DynamoDBClient({
  region,
})
const dynamodbDocClient = DynamoDBDocumentClient.from(dynamodbClient, {
  marshallOptions: {
    removeUndefinedValues: true, // This option removes undefined values
  },
})

export { dynamodbDocClient }
