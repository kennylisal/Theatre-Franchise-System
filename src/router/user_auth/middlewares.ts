import { UserJWTData } from "./interface.js";
import jwt from "jsonwebtoken";

async function generateAccesToken(credential: UserJWTData): Promise<string> {
  const jwtSecret = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const accessToken = jwt.sign(
    {
      user_id: credential.user_id,
      user_image: credential.user_image,
      user_name: credential.user_name,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );
  //
  return accessToken;
}

export { generateAccesToken };
