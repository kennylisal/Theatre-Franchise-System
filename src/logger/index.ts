import { Knex } from "knex";
import { adminLog } from "./query.js";
import { generateDateToString } from "./utils.js";
import knexDB from "../config/knex_db.js";
import executeQuery from "../utils/query-helper.js";
import logger from "../utils/cli-logger.js";

function generateLogId(docuemntId: string, action: string): string {
  //contoh 2025/05/13/transaksi|banned/employeeId|transaksi
  const awal = generateDateToString();
  return `${awal}/${action}/${docuemntId}`;
}

const tesLogAdmin = async (
  employeeId: string,
  action: string,
  docuemntId: string,
  trx?: Knex.Transaction
) => {
  const db = trx || knexDB;
  const query = db("employee_log").insert({
    employee_id: employeeId,
    employee_action: action,
    employee_log_id: generateLogId(docuemntId, action),
  });
  await executeQuery(query, "INSERT", "employee_log");
  // try {

  // } catch (error) {
  //   logger.error(
  //     db("employee_log")
  //       .insert({
  //         employee_id: employeeId,
  //         employee_action: action,
  //         employee_log_id: generateLogId(docuemntId, action),
  //       })
  //       .toSQL().sql
  //   );
  // }
};

async function logAdminAction(
  adminId: string,
  action: string,
  docuemntId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  try {
    const query = db("admin_log").insert({
      admin_id: adminId,
      admin_action: action,
      logId: generateLogId(docuemntId, action),
    });
    await executeQuery(query, "INSERT", "admin_log");
  } catch (error) {
    logger.error(
      db("admin_log")
        .insert({
          admin_id: adminId,
          admin_action: action,
          logId: generateLogId(docuemntId, action),
        })
        .toSQL().sql
    );
  }
}

async function logEmployeeAction(
  employeeId: string,
  action: string,
  docuemntId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  try {
    const query = db("admin_log").insert({
      admin_id: employeeId,
      admin_action: action,
      logId: generateLogId(docuemntId, action),
    });
    await executeQuery(query, "INSERT", "employee_log");
  } catch (error) {
    logger.error(
      db("admin_log")
        .insert({
          admin_id: employeeId,
          admin_action: action,
          logId: generateLogId(docuemntId, action),
        })
        .toSQL().sql
    );
  }
}

export { tesLogAdmin };
