import { APIGatewayProxyHandler } from 'aws-lambda';
import { Env } from '../../env';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.requestContext.authorizer!.id as string;
    const filename = event.queryStringParameters?.filename;
    if (!filename) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad request' }),
      };
    }

    const { url, fields } = await createPresignedPost(s3, {
      Bucket: Env.AWS_S3_BUCKET_NAME,
      Key: `${userId}/${filename}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url, fields }),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
