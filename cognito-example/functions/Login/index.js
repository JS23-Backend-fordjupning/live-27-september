import { cognito } from "../../services/cognito";
import { sendResponse } from "../../responses";
import { AuthFlowType } from "@aws-sdk/client-cognito-identity-provider";

export const handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  const credentials = {
    ClientId: "",
    UserPoolId: "",
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  const response = await cognito.initiateAuth(credentials);

  return sendResponse({ token: response.AuthenticationResult.AccessToken });
};
