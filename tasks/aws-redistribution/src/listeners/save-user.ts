import { BatchWriteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { SQSHandler } from 'aws-lambda';
import { Env } from '../env';
import { chunk } from '../utils';

const ddb = new DynamoDBClient({ region: Env.AWS_REGION });

export const handler: SQSHandler = async (event) => {
  try {
    const chunked = chunk(
      event.Records.map((x) => {
        const body = JSON.parse(x.body);

        return {
          PutRequest: {
            Item: {
              hashKey: { S: `u:${body.userId}` },
              rangeKey: { S: `s:${body.shopToken}` },
              word: { S: body.word },
              password: { S: body.password },
            },
          },
        };
      }),
      25,
    );
    await Promise.all(
      chunked.map(async (x) => {
        await ddb.send(new BatchWriteItemCommand({ RequestItems: { [Env.AWS_DYNAMODB_TABLE_NAME]: x } }));
      }),
    );
    //
    // const result = await ddb.send(
    //   new BatchWriteItemCommand({
    //     RequestItems: {
    //       [Env.AWS_DYNAMODB_TABLE_NAME]: event.Records.map((x) => {
    //         const body = JSON.parse(x.body);

    //         return {
    //           PutRequest: {
    //             Item: {
    //               hashKey: { S: `u:${body.userId}` },
    //               rangeKey: { S: `s:${body.shopToken}` },
    //               word: { S: body.word },
    //               password: { S: body.password },
    //             },
    //           },
    //         };
    //       }),
    //     },
    //   }),
    // );
    // console.debug('result', JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  }
};
