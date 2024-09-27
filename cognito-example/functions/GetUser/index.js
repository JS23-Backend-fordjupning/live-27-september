import middy from "@middy/core";
import { validateToken } from "../../middleware/auth";
import { cognito } from "../../services/cognito";
import { sendResponse } from "../../responses";

export const handler = middy()
  .use(validateToken)
  .handler(async (event, context, { signal }) => {
    console.log("Event:", event);
    console.log("Context", context);
    console.log("Signal", signal);

    const data = {
      Username: event.username,
      UserPoolId: "",
    };

    const { UserAttributes } = await cognito.adminGetUser(data);

    const email = UserAttributes.find((a) => a.Name === "email");
    const given_name = UserAttributes.find((a) => a.Name === "given_name");
    const family_name = UserAttributes.find((a) => a.Name === "family_name");

    return sendResponse({
      email: email.Value,
      given_name: given_name.Value,
      family_name: family_name.Value,
    });
  });
