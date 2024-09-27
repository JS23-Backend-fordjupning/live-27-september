import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProvider({
  region: process.env.AWS_REGION,
});

export { cognito };
