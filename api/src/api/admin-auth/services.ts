import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import executeQuery from "../../utils/query-helper.js";
import {
  AuthTokensPayload,
  EmployeeCredential,
  EmployeeJWTData,
} from "./interfaces.js";
import { RefreshTokenData } from "../../middlewares/interfaces.js";

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/password_config.js";
//tambahi lognya abis ini
//tes dulu ini yg dibawah
async function createEmployee(
  name: string,
  password: string,
  role: string,
  location: string,
  acc_status: string,
  trx?: Knex.Transaction
): Promise<{ pesan: string; documentId: string }> {
  const db = trx || knexDB;
  const hashedPassword = await hashPassword(password);
  const username = `${name.substring(2)}${usernameSuffix()}`;

  const query = db("employees")
    .insert({
      employee_id: knexDB.raw(
        `'EMP/${location.substring(
          3
        )}/' || LPAD((SELECT (COUNT(*) + 1)::TEXT from employees where theatre_location ilike '%${location}%'),3,'0')`
      ),
      // employee_id: "EMP/X/5",
      employee_name: name,
      account_password: hashedPassword,
      employee_role: role,
      theatre_location: location,
      account_username: username,
      account_status: acc_status,
    })
    .returning(["employee_id"]);
  const res = await executeQuery<string>(query, "INSERT", "employee");
  return {
    pesan: `Username : ${username}\nPassword : ${password}`,
    documentId: res,
  };
}

async function changeEmployeePassword(
  newPassword: string,
  username: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const hashedPassword = await hashPassword(newPassword);
  const query = db("employees")
    .update({ account_password: hashedPassword })
    .where({ account_username: username });
  const res = await executeQuery(query, "UPDATE", "employee");
}

async function banEmployee(username: string, trx?: Knex.Transaction) {
  const db = trx || knexDB;
  const query = db("employee")
    .update({ account_status: "banned" })
    .where({ account_username: username });
  const res = await executeQuery(query, "UPDATE", "employee");
}

function usernameSuffix(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  return `${month}${day}`;
}

//dibawah ini bagian pegawai theatre -> orang lokal-nya maksudku

//untuk ini kembalikan id & role
async function getEmployeeCredential(
  username: string,
  trx?: Knex.Transaction
): Promise<EmployeeCredential> {
  //kalau kembali @-x-@ -> artinya masalah kredensial
  //kalau kembalikan accountBanned artinya well banned
  //kalau kembalikan accountInavtive artinya sedang non-aktif
  const db = trx || knexDB;
  const query = db("employees")
    .select(
      "employee_id",
      "employee_role",
      "account_status",
      "account_password",
      "account_username"
    )
    .where("account_username", "=", username);
  const result = await executeQuery<EmployeeCredential[]>(
    query,
    "GET",
    "employee"
  );
  return result[0];
}

async function getEmployeeCredentialwithId(
  id: string,
  trx?: Knex.Transaction
): Promise<EmployeeCredential> {
  //kalau kembali @-x-@ -> artinya masalah kredensial
  //kalau kembalikan accountBanned artinya well banned
  //kalau kembalikan accountInavtive artinya sedang non-aktif
  const db = trx || knexDB;
  const query = db("employees")
    .select(
      "employee_id",
      "employee_role",
      "account_status",
      "account_password",
      "account_username"
    )
    .where("employee_id", "=", id)
    .first();

  return query;
}

async function generateRefreshToken(
  employee_id: string,
  token: string,
  expireAt: Date,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("employee_refresh_token")
    .insert({
      employee_id: employee_id,
      token: token,
      expire_at: expireAt,
      revoked: false,
    })
    .onConflict("employee_id")
    .merge({ token: token, expire_at: expireAt });
  await executeQuery(query, "INSERT", "employee_refresh_token");
}

async function getEmployeeData(
  employee_id: string,
  trx?: Knex.Transaction
): Promise<EmployeeJWTData> {
  const db = trx || knexDB;
  const query = await db("employees as e")
    .select("e.employee_id", "e.employee_role", "e.account_username")
    .where("e.employee_id", "=", employee_id)
    .first();
  return query;
}

async function getRefreshTokenData(token: string): Promise<RefreshTokenData> {
  const result: RefreshTokenData = await knexDB("employee_refresh_token")
    .select("employee_id", "revoked", "token", "expire_at")
    .where("token", "=", token)
    .first();
  return result;
}

async function getEmployeeJWTData(
  employe_id: string
): Promise<EmployeeJWTData> {
  const db = knexDB;
  const query = await db("employees")
    .select("employee_id", "employee_role", "account_username")
    .where("employee_id", "=", employe_id)
    .first();

  return query;
}

async function generateAdminTokens(
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

async function generateAdminAccesToken(
  credential: EmployeeJWTData
): Promise<string> {
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
  return accessToken;
}

export {
  getEmployeeCredential,
  generateRefreshToken,
  createEmployee,
  changeEmployeePassword,
  getEmployeeData,
  getEmployeeCredentialwithId,
  getRefreshTokenData,
  getEmployeeJWTData,
  generateAdminTokens,
  generateAdminAccesToken,
};
