import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBStreamHandler } from 'aws-lambda';
import { Env } from '../env';

const ddb = new DynamoDBClient({ region: Env.AWS_REGION });

export const handler: DynamoDBStreamHandler = async (event) => {
  try {
    console.debug('records', event.Records.length);
    const counters: Record<string, number> = {};
    for (const x of event.Records) {
      const shopToken = x.dynamodb!.Keys!.rangeKey.S!.split(':')[1];
      if (counters[shopToken] != null) {
        counters[shopToken]++;
      } else {
        counters[shopToken] = 1;
      }
    }
    console.debug('counters', counters);
    const result = await Promise.all(
      Object.entries(counters).map(([key, value]) =>
        ddb.send(
          new UpdateItemCommand({
            TableName: Env.AWS_DYNAMODB_TABLE_NAME,
            Key: { hashKey: { S: `s:${key}` }, rangeKey: { S: 'counter' } },
            UpdateExpression: 'ADD #counter :increment',
            ExpressionAttributeNames: { '#counter': 'counter' },
            ExpressionAttributeValues: { ':increment': { N: `${value}` } },
          }),
        ),
      ),
    );
    console.debug('result', JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  }
};
