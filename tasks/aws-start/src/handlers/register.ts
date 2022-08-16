import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Env } from '../Env';

const cognito = new CognitoIdentityProviderClient({ region: 'eu-central-1' });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { name, email, password } = JSON.parse(event.body!);

    const res = await cognito.send(
      new SignUpCommand({
        ClientId: Env.AWS_COGNITO_CLIENT_ID,
        Username: name,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
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
