import { cognito } from "../../services/cognito";
import { sendResponse } from "../../responses";

export const handler = async (event) => {
  const { username, code } = JSON.parse(event.body);

  const data = {
    ClientId: "",
    Username: username,
    ConfirmationCode: code,
  };

  const response = await cognito.confirmSignUp(data);

  return sendResponse({ message: "Email confirmed!" });
};
