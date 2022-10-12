import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Env } from '../env';

const ddb = new DynamoDBClient({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { shopToken } = JSON.parse(event.body!);

    const res = await ddb.send(
      new PutItemCommand({
        TableName: Env.AWS_DYNAMODB_TABLE_NAME,
        Item: {
          hashKey: { S: `s:${shopToken}` },
          rangeKey: { S: 'counter' },
          counter: { N: '0' },
        },
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
