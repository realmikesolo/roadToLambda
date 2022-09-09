import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { Env } from '../env';

const sqs = new SQSClient({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { shopToken, email, password } = JSON.parse(event.body!);

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: Env.AWS_DISTRIBUTE_QUEUE_URL,
        MessageBody: JSON.stringify({
          id: randomUUID(),
          shopToken,
          email,
          password,
        }),
        MessageGroupId: 'users',
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Request was sent to SQS' }),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
