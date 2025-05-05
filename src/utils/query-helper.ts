import { Knex } from "knex";
import { AppError, HttpCode } from "./app-error.js";

async function executeQuery<T>(
  query: Knex.QueryBuilder,
  operation: string,
  table: string,
  logger?: () => Promise<void>
): Promise<T> {
  try {
    const sql = query.toSQL().sql;
    if (logger) await logger();
    return await query;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Database Error";
    throw new AppError(
      "Database Error",
      HttpCode.INTERNAL_SERVER_ERROR,
      `${operation} on ${table} ${message} \n query : ${query}`,
      false
    );
  }
}

export default executeQuery;
