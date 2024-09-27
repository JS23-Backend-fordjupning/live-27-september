import { CognitoJwtVerifier } from "aws-jwt-verify";

const validateToken = {
  before: async (request) => {
    console.log("validateToken:", request);
    try {
      const token = request.event.headers.authorization.replace("Bearer ", "");
      console.log(token);

      if (!token) throw Error();

      const verifier = CognitoJwtVerifier.create({
        clientId: "",
        userPoolId: "",
        tokenUse: "access",
      });

      const data = await verifier.verify(token);

      console.log(data);

      request.event.username = data.username;

      return request.response;
    } catch (error) {
      console.log(error);
      request.event.error = "401";
      return request.response;
    }
  },
};

export { validateToken };
