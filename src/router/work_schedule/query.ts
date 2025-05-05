//tiap bioskop punya 2 locket

import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import executeQuery from "../../utils/query-helper.js";

//tambah logger ke semua
async function addWorkSchedule(
  employeeId: string,
  timeStart: string,
  timeEnd: string,
  theatre: string,
  locketName: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("locket_shcedule").insert({
    theatre_location: theatre,
    started_at: timeStart,
    end_at: timeEnd,
    locket_name: locketName,
    employee: employeeId,
  });
  const res = await executeQuery(query, "INSERT", "locket_schedule");
}

//bikin update delete
async function deleteWorkSchedule(scheduleId: string, trx?: Knex.Transaction) {
  const db = trx || knexDB;
  const query = db("locket_schedule")
    .where("schedule_id", "=", scheduleId)
    .delete();
  await executeQuery(query, "DELETE", "locket_schedule");
}

//ganti employee yang jaga
async function updateSchedule(
  scheduleId: string,
  newEmployeeId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("locket_schedule")
    .where("schedule_id", "=", scheduleId)
    .update({ employee: newEmployeeId });
  await executeQuery(query, "UPDATE", "locket_schedule");
}

//bikin read
async function getLocketSchedule(
  theatreId: string,
  timeStart: string,
  timeEnd: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const result = await db("locket_schedule as ls")
    .join("employee as e", "e.employee_id", "=", "ls.employee")
    .select("e.name", "ls.locket_name", "ls.started_at", "ls.end_at")
    .where("ls.theatre_location", "=", theatreId)
    .whereBetween("ls.started_at", [timeStart, timeEnd]);
  return result;
}
//ini pakai range
// async function getSchedule
