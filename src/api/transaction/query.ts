import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import executeQuery from "../../utils/query-helper.js";
import { tesLogAdmin } from "../../logger/index.js";
import { format } from "date-fns";
import { QueryStringResult } from "../../global/interfaces.js";

//ingat harus ada log nya ini
async function createHMovieTransaction(
  transactionId: string,
  customerId: string,
  totalPayment: number,
  headerDisplay: object,
  seatingBuyed: string,
  employeeId: string,
  locketId: string,
  trx?: Knex.Transaction
): Promise<string> {
  const db = trx || knexDB;
  const query = db("h_schedule_trans")
    .insert({
      transaction_id: generateTransIdRaw(locketId),
      customer_id: customerId,
      total_payment: totalPayment,
      schedule_header_display: headerDisplay,
      seating_buyed: seatingBuyed,
    })
    .returning(["transaction_id"]);
  const transId = await executeQuery<QueryStringResult[]>(
    query,
    "INSERT",
    "h_schedule_trans",
    () => tesLogAdmin(employeeId, "CREATE", transactionId, trx)
  );
  return transId[0].id;
}

//ini transaction ID nya ambil dari atas
async function createDMovieTransaction(
  transactionId: string,
  movieScheduleId: string,
  locketId: string,
  transactionMethod: string,
  employeeId: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("d_schedule_trans")
    .insert({
      transcation_id: transactionId,
      schedule_id: movieScheduleId,
      locket_id: locketId,
      transaction_method: transactionMethod,
      employee: employeeId,
    })
    .returning(["transaction_id"]);
  return await executeQuery<string>(query, "CREATE", "d_schedule_trans", () =>
    tesLogAdmin(employeeId, "CREATE", transactionId, trx)
  );
}

function generateTransIdRaw(locketId: string): string {
  const date = format(new Date(), "yyyy-MM-dd");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `'TRX/' || LPAD(SELECT COUNT(*) from h_schedule_trans where created_at BETWEEN '${date} 00:00:00' AND '${date} 23:59:59')::TEXT,4,'X') || /${
    year + month
  } /${locketId}`;
}
//bikin h dan d transaksi
//bikin id generator
