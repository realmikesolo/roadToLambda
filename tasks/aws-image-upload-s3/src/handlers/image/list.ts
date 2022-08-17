import { paginateListObjectsV2, S3Client } from '@aws-sdk/client-s3';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Env } from '../../env';

const s3 = new S3Client({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.requestContext.authorizer!.id as string;

    const response: string[] = [];
    for await (const { Contents } of paginateListObjectsV2(
      { client: s3 },
      {
        Bucket: Env.AWS_S3_BUCKET_NAME,
        Prefix: userId,
      },
    )) {
      response.push(
        ...(Contents ?? []).map(
          (x) => `https://${Env.AWS_S3_BUCKET_NAME}.s3.${Env.AWS_REGION}.amazonaws.com/${x.Key}`,
        ),
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
