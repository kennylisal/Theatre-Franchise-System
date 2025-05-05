import { AuthTokensPayload, EmployeeJWTData } from "./interfaces.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken } from "./query.js";

async function generateTokens(
  credential: EmployeeJWTData
): Promise<AuthTokensPayload> {
  const jwtSecret = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const accessToken = jwt.sign(
    {
      employee_id: credential.employee_id,
      employee_role: credential.employee_role,
      account_username: credential.account_username,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );
  //
  const secretKey = CryptoJS.lib.WordArray.random(32).toString(
    CryptoJS.enc.Hex
  );
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await generateRefreshToken(credential.employee_id, secretKey, expireAt);
  return {
    accessToken: accessToken,
    refreshToken: secretKey,
  };
}

export { generateTokens };
