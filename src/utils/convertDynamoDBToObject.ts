type DynamoDBAttributeValue = {
  S?: string
  N?: string
  BOOL?: boolean
  NULL?: boolean
  M?: { [key: string]: DynamoDBAttributeValue } // Map type
  L?: DynamoDBAttributeValue[] // List type
}

type DynamoDBItem = Record<string, DynamoDBAttributeValue>

export interface DynamoDBConvertedItem {
  [key: string]: string | number | boolean | null
}

const convertDynamoDBToObject = (
  items: DynamoDBItem[] | undefined,
): Record<string, string | number | boolean | null | any>[] | undefined => {
  const convertAttributeValue = (attributeValue: any): any => {
    const attributeType = Object.keys(attributeValue)[0] as keyof DynamoDBAttributeValue
    const value = attributeValue[attributeType]

    // Handle MAP type
    if (attributeType === 'M') {
      const mapValue = value as Record<string, any>
      const convertedMap: Record<string, any> = {}
      for (const key in mapValue) {
        if (Object.prototype.hasOwnProperty.call(mapValue, key)) {
          convertedMap[key] = convertAttributeValue(mapValue[key])
        }
      }
      return convertedMap
    }

    // Handle LIST type
    if (attributeType === 'L') {
      const listValue = value as any[]
      return listValue.map((item) => convertAttributeValue(item))
    }

    // Handle other basic types (string, number, boolean, etc.)
    return value as string | number | boolean | null
  }

  return items?.map((item: DynamoDBItem) => {
    const cleanedItem: Record<string, string | number | boolean | null | any> = {}
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        cleanedItem[key] = convertAttributeValue(item[key])
      }
    }
    return cleanedItem
  })
}

export default convertDynamoDBToObject
