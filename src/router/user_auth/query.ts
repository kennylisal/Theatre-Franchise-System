import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import { hashPassword } from "../admin-auth/password_config.js";
import executeQuery from "../../utils/query-helper.js";
import { UserJWTData } from "./interface.js";

async function createUserCredentials(
  username: string,
  name: string,
  tglLahir: string,
  password: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const hashedPassword = await hashPassword(password);
  const query = db("user_credentsials")
    .insert({
      user_id: db.raw(`${name.substring(0, 2)}/${tglLahir.substring(0, 10)}`),
      username: username,
      user_password: hashedPassword,
    })
    .returning(["user_id", "username"]);
  const result = await executeQuery<string>(query, "INSERT", "user_credential");
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
): Promise<UserJWTData> {
  const db = trx || knexDB;
  const query = await db("user_details")
    .select("user_name", "user_image", "user_id")
    .where("user_id", "=", userId)
    .first();
  return query[0];
}

async function getRefreshTokenUser(token: string): Promise<string> {
  const result = await knexDB("user_refresh_token")
    .select("user_id", "revoked", "token", "expire_at")
    .where("token", "=", token)
    .first()
    .returning("user_id");
  return result[0];
}
//bikin semua function
//bikin juga untuk login -> bikin jwt dan refreshtoken

export {
  createUserCredentials,
  createUserDetail,
  getUserData,
  getRefreshTokenUser,
};
