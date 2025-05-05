import { Knex } from "knex";
import knexDB from "../config/knex_db.js";
import executeQuery from "../utils/query-helper.js";

async function adminLog(
  adminId: string,
  action: string,
  logId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("admin_log").insert({
    admin_id: adminId,
    admin_action: action,
    logId: logId,
  });
  await executeQuery(query, "INSERT", "admin_log");
}

async function employeeLog(
  employeeId: string,
  action: string,
  logId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("admin_log").insert({
    admin_id: employeeId,
    admin_action: action,
    logId: logId,
  });
  await executeQuery(query, "INSERT", "employee_log");
}

export { adminLog, employeeLog };
