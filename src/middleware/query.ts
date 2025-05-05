import knexDB from "../config/knex_db.js";
import { EmployeeJWTData } from "../router/auth/interfaces.js";
import { RefreshTokenData } from "./interfaces.js";

//cek refresh token dan status
async function getRefreshTokenData(token: string): Promise<RefreshTokenData> {
  const result: RefreshTokenData = await knexDB("employee_refresh_token")
    .select("employee_id", "revoked", "token", "revoked_at")
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

export { getRefreshTokenData, getEmployeeJWTData };
