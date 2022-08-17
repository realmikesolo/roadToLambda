import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Env } from '../../env';

const cognito = new CognitoIdentityProviderClient({ region: Env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body!);

    const res = await cognito.send(
      new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
        ClientId: Env.AWS_COGNITO_CLIENT_ID,
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
