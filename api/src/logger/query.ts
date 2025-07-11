import { Knex } from "knex";
import knexDB from "../config/knex_db.js";
import executeQuery from "../utils/query-helper.js";
import dayjs from "dayjs";

async function adminLog(
  adminId: string,
  action: string,
  documentId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const awalId = `ALOG/${adminId}/`;
  const akhirId = dayjs().format("MM/YYYY");
  const query = db("admin_log").insert({
    admin_id: adminId,
    admin_action: `${action} ${documentId}`,
    admin_log_id: db.raw(
      `'${awalId}' || LPAD((SELECT (COUNT(*) + 1):: TEXT from admin_log where admin_id = '${adminId}') ,3,'0') || '${akhirId}'`
    ),
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

  const query = db("employee_log").insert({
    employee_id: employeeId,
    employee_action: action,
    employee_log_id: logId,
  });
  await executeQuery(query, "INSERT", "employee_log");
}

export { adminLog, employeeLog };
