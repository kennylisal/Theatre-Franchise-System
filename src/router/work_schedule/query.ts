//tiap bioskop punya 2 locket

import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import executeQuery from "../../utils/query-helper.js";
import dayjs from "dayjs";

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
  const query = db("locket_schedule").insert({
    theatre_location: theatre,
    started_at: timeStart,
    end_at: timeEnd,
    locket_name: locketName,
    employee: employeeId,
    schedule_id: db.raw(
      `'LSD/${theatre}/' || LPAD((select (count(*) + 1)::TEXT from locket_schedule where theatre_location = '${theatre}'),3,'0')`
    ),
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
  const result = db("locket_schedule as ls")
    .join("employees as e", "e.employee_id", "=", "ls.employee")
    .select(
      "e.employee_name",
      "ls.locket_name",
      "ls.started_at",
      "ls.end_at",
      "ls.schedule_id"
    )
    .where("ls.theatre_location", "=", theatreId)
    .whereBetween("ls.started_at", [timeStart, timeEnd])
    .orderBy("ls.locket_name", "asc")
    .orderBy("ls.started_at", "asc");

  return await executeQuery(result, "GET", "locket_schedule");
}
//ini pakai range
// async function getSchedule

async function getAdminTheatreLocation(
  adminId: string,
  trx?: Knex.Transaction
): Promise<{ theatre_location: string }> {
  const db = trx || knexDB;
  const result = await db("employees")
    .select("theatre_location")
    .where("employee_id", "=", adminId)
    .first();
  return result;
}

async function getAllEmployeeData(
  theatreLocation: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const result = db("employees")
    .select(
      "employee_id",
      "employee_name",
      "employee_role",
      "account_status",
      "account_username"
    )
    .where("theatre_location", "=", theatreLocation);
  return await executeQuery(result, "GET", "employees");
}

// async function getAllSchedule(
//   tglAwal: string,
//   theatre: string,
//   trx?: Knex.Transaction
// ) {
//   //ambil 1 minggu setelah tgl body
//   const db = trx || knexDB;
//   const awal = dayjs(tglAwal);
//   const akhir = dayjs(tglAwal).add(7, "day");
//   const result = db("locket_schedule as ls")
//     .select(
//       "ls.started_at",
//       "ls.end_at",
//       "ls.locket_name",
//       "e.employee_name",
//       "ls.schedule_id"
//     )
//     .whereBetween("ls.started_at", [awal, akhir])
//     .where("ls.theatre_location", "=", theatre)
//     .join("employees as e", "e.employee.id", "=", "ls.employee");

//   return await executeQuery(result, "GET", "locket_schedule & employee");
// }
export {
  addWorkSchedule,
  getLocketSchedule,
  getAdminTheatreLocation,
  getAllEmployeeData,
  // getAllSchedule,
};
