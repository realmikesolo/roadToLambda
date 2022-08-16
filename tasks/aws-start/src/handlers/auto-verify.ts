import { CognitoUserPoolTriggerHandler } from 'aws-lambda';

export const handler: CognitoUserPoolTriggerHandler = async (event) => {
  event.response.autoConfirmUser = true;

  if (Object.hasOwn(event.request.userAttributes, 'email')) {
    event.response.autoVerifyEmail = true;
  }

  return event;
};
