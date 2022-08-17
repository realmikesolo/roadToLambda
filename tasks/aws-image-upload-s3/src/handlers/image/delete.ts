import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Env } from '../../env';

const s3 = new S3Client({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.requestContext.authorizer!.id as string;
    const filename = event.pathParameters!.id;

    await s3.send(
      new DeleteObjectCommand({
        Bucket: Env.AWS_S3_BUCKET_NAME,
        Key: `${userId}/${filename}`,
      }),
    );

    return {
      statusCode: 204,
      body: JSON.stringify({ message: 'No content' }),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
