import { Knex } from "knex";
import { MovieResult } from "./interface.js";
import knexDB from "../../../config/knex_db.js";

async function getActiveMovies({
  limit = 20,
  orderBy = "created_at",
  trx,
}: {
  limit?: number;
  orderBy?: string;
  trx?: Knex.Transaction;
}): Promise<MovieResult[]> {
  const db = trx || knexDB;
  const result = await db("movies")
    .select(
      "movie_name",
      "external_link",
      "external_info",
      "created_at",
      "movie_image",
      "movie_duration",
      "movie_id"
    )
    .where("movie_is_active", "=", true)
    .limit(limit)
    .modify((query) => {
      if (orderBy) query.orderBy(orderBy);
    });
  return result;
}

export { getActiveMovies };
