import { Handler } from 'aws-lambda';
import { verify, VerifyOptions } from 'jsonwebtoken';
import { Env } from '../../Env';
import jwksClient from 'jwks-rsa';

export const handler: Handler = (event, context, callback) => {
  const token = (event.authorizationToken || event.header.authorization).slice(7);
  const idpUrl = `https://cognito-idp.${Env.AWS_REGION}.amazonaws.com/${Env.AWS_COGNITO_USER_POOL_ID}`;
  const jwksUri = `${idpUrl}/.well-known/jwks.json`;

  const jwks = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri,
  });
  const verifyOptions: VerifyOptions = {
    issuer: idpUrl,
    algorithms: ['RS256'],
  };

  function getKey(header, callback): void {
    jwks.getSigningKey(header.kid, (err, key) => {
      if (err) {
        callback(err);
      } else {
        const signingKey = key?.getPublicKey();

        callback(null, signingKey);
      }
    });
  }

  try {
    verify(token, getKey, verifyOptions, (err, data) => {
      if (err) {
        console.error(err);

        return callback('Unauthorized');
      } else {
        callback(null, generatePolicy(data, 'Allow', event.methodArn));
      }
    });
  } catch (e) {
    console.error(e);

    return callback('Unauthorized');
  }
};

function generatePolicy(user: any, effect: string, resource: string[]): PolicyResponse {
  const { sub, 'cognito:username': username, 'cognito:groups': groups, email } = user;

  return {
    principalId: sub,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: ['execute-api:Invoke', 'lambda:InvokeFunction'],
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context: {
      id: sub,
      username,
      groups: groups?.join(';') ?? '',
      email,
    },
  };
}

type PolicyResponse = {
  principalId?: string;
  policyDocument?: {
    Version: string;
    Statement: Array<{
      Action: string | string[];
      Effect: any;
      Resource: any;
    }>;
  };
  context: {
    id: string;
    username: string;
    groups: string;
    email: string;
  };
};
