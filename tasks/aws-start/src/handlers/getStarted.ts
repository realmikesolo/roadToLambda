import { BaseError, s } from '@sapphire/shapeshift';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { fibo } from '../lib/fibo';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { name } = QuerySchema.parse(event.queryStringParameters);

    const fibonaci = fibo();

    return {
      statusCode: 200,
      body: JSON.stringify({
        task1: `Hello ${name}!`,
        task2: fibonaci,
      }),
    };
  } catch (e) {
    if (e instanceof BaseError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad request' }),
      };
    }

    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

const QuerySchema = s.object({
  name: s.string.lengthGreaterThanOrEqual(2).lengthLessThanOrEqual(32),
});
