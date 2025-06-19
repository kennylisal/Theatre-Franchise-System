import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import { hashPassword } from "../admin-auth/password_config.js";
import executeQuery from "../../utils/query-helper.js";
import { UserCredential, UserDisplayData, UserJWTData } from "./interface.js";
import { AuthTokensPayload } from "../admin-auth/interfaces.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

async function createUserCredentials(
  username: string,
  name: string,
  tglLahir: string,
  password: string,
  trx?: Knex.Transaction
): Promise<{ user_id: string; username: string }> {
  const db = trx || knexDB;
  const hashedPassword = await hashPassword(password);
  const query = db("user_credentials")
    .insert({
      user_id: db.raw(`'${name.substring(0, 2)}/${tglLahir.substring(0, 10)}'`),
      username: username,
      user_password: hashedPassword,
    })
    .returning(["user_id", "username"]);
  const result = await executeQuery<{ user_id: string; username: string }[]>(
    query,
    "INSERT",
    "user_credential"
  );
  return result[0];
}

async function createUserDetail(
  userId: string,
  username: string,
  tglLahir: string,
  userImage: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("user_details").insert({
    user_id: userId,
    user_name: username,
    date_of_birth: tglLahir,
    user_image: userImage,
  });
  return await executeQuery(query, "insert", "user_details");
}

async function getUserData(
  userId: string,
  trx?: Knex.Transaction
): Promise<UserDisplayData> {
  const db = trx || knexDB;
  const query = await db("user_details")
    .select("user_name", "user_image", "date_of_birth")
    .where("user_id", "=", userId)
    .first();
  return query[0];
}

async function getRefreshTokenUser(token: string): Promise<string> {
  const result = await knexDB("user_refresh_token")
    .select("user_id")
    .where("token", "=", token)
    .first();
  return result.user_id;
}
//bikin semua function
//bikin juga untuk login -> bikin jwt dan refreshtoken

async function getUserCredential(
  username: string,
  trx?: Knex.Transaction
): Promise<UserCredential> {
  const db = trx || knexDB;
  const query = await db("user_credentials")
    .select("user_id", "username", "user_password", "is_banned")
    .where("username", "=", username)
    .first();

  return query;
}

async function getUserCredentialwithId(
  user_id: string,
  trx?: Knex.Transaction
): Promise<UserCredential> {
  const db = trx || knexDB;
  const query = await db("user_credentials")
    .select("user_id", "username", "user_password", "is_banned")
    .where("user_id", "=", user_id)
    .first();

  return query;
}

async function generateUserToken(
  credential: UserCredential
): Promise<AuthTokensPayload> {
  const jwtSecret = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const accessToken = jwt.sign(
    {
      user_id: credential.user_id,
      username: credential.username,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );
  //
  const secretKey = CryptoJS.lib.WordArray.random(32).toString(
    CryptoJS.enc.Hex
  );
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await generateUserRefreshToken(credential, secretKey, expireAt);
  return {
    accessToken: accessToken,
    refreshToken: secretKey,
  };
}

async function generateUserRefreshToken(
  credential: UserCredential,
  token: string,
  expire: Date,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("user_refresh_token").insert({
    user_id: credential.user_id,
    token: token,
    expire_at: expire,
  });
  await executeQuery(query, "INSERT", "user_refresh_token");
}

export {
  createUserCredentials,
  createUserDetail,
  getUserData,
  getRefreshTokenUser,
  getUserCredential,
  generateUserToken,
  getUserCredentialwithId,
};
