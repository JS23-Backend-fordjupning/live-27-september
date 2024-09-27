import { cognito } from "../../services/cognito";
import { sendResponse } from "../../responses/index";

export const handler = async (event) => {
  const { username, password, email, given_name, family_name } = JSON.parse(
    event.body
  );

  const user = {
    ClientId: "",
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "given_name",
        Value: given_name,
      },
      {
        Name: "family_name",
        Value: family_name,
      },
    ],
  };

  const response = await cognito.signUp(user);

  return sendResponse(response);
};
