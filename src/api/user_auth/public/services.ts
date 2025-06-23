import { Knex } from "knex";
import knexDB from "../../../config/knex_db.js";
import { hashPassword } from "../../../utils/password_config.js";
import executeQuery from "../../../utils/query-helper.js";
import { UserCredential } from "../protected/interface.js";

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

export { createUserCredentials, createUserDetail, getUserCredential };
