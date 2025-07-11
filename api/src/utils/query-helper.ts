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

// import { AppError, HttpCode } from '../utils/AppError'; // Adjust path

// interface QueryResult<T> {
//   success: boolean;
//   data?: T;
//   error?: AppError;
// }

// async function executeQuery<T>(
//   query: any, // Replace 'any' with your query type, e.g., Knex.QueryBuilder
//   operation: string,
//   table: string,
//   logger?: () => Promise<void>
// ): Promise<QueryResult<T>> {
//   try {
//     const sql = query.toSQL().sql;
//     if (logger) {
//       await logger();
//     }
//     const result = await query;
//     return { success: true, data: result };
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'Unknown Database Error';
//     return {
//       success: false,
//       error: new AppError(
//         'Database Error',
//         HttpCode.INTERNAL_SERVER_ERROR,
//         `${operation} on ${table} ${message} \n query: ${sql}`,
//         false
//       ),
//     };
//   }
// }

// export default executeQuery;

// import { AppError, HttpCode } from '../utils/AppError'; // Adjust path
// import executeQuery from './executeQuery'; // Adjust path
// import { EmployeeJWTData } from './interfaces'; // Adjust path

// async function getEmployeeCredential(
//   username: string
// ): Promise<EmployeeJWTData> {
//   const query = /* Your query, e.g., Knex('employees').where({ account_username: username }).first() */;
//   const result = await executeQuery<EmployeeJWTData>(
//     query,
//     'SELECT',
//     'employees',
//     async () => console.log(`Executing query for username: ${username}`)
//   );

//   if (!result.success) {
//     throw result.error; // Throw to be caught by route handler
//   }

//   if (!result.data) {
//     throw new AppError(
//       'Not Found',
//       HttpCode.NOT_FOUND,
//       `User ${username} not found`,
//       true
//     );
//   }

//   return result.data;
// }

// export { getEmployeeCredential };
