import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Env } from '../env';

const sqs = new SQSClient({ region: Env.AWS_REGION });
const ddb = new DynamoDBClient({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { userId, shopToken, word, password } = JSON.parse(event.body!);

    const item = await ddb.send(
      new GetItemCommand({
        TableName: Env.AWS_DYNAMODB_TABLE_NAME,
        Key: {
          hashKey: { S: `s:${shopToken}` },
          rangeKey: { S: 'counter' },
        },
      }),
    );

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Shop not found' }),
      };
    }
    if (Number(item.Item!.counter.N!) > 10e3) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Limit reached' }),
      };
    }

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: Env.AWS_DISTRIBUTE_QUEUE_URL,
        MessageBody: JSON.stringify({
          userId,
          shopToken,
          word,
          password,
        }),
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Request was sent to SQS' }),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 504,
      body: JSON.stringify({ message: 'Gateway timeout' }),
    };
  }
};
