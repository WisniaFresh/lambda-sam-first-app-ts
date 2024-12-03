import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const TABLE_NAME = "dev_dummies";

export const lambdaHandler = async (): Promise<any> => {
  try {
    const item = {
      id: { S: new Date().toISOString() },
      message: { S: "This is a dummy row added by Lambda" },
      createdAt: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: item,
    });

    await dynamoClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Row inserted successfully!", item }),
    };
  } catch (error) {
    console.error("Error inserting row:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to insert row", error }),
    };
  }
};
