import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import executeQuery from "../../utils/query-helper.js";
import { MovieResult } from "./interface.js";
import { QueryStringResult } from "../../global/interfaces.js";
import { build } from "joi";

async function insertMovie(
  movieName: string,
  activeStatus: boolean,
  movieImage: string,
  movieDuration: number,
  externalInfo?: object,
  externalLink?: string,
  trx?: Knex.Transaction
): Promise<string> {
  const db = trx || knexDB;
  const query = db("movies")
    .insert({
      movie_id: knexDB.raw(
        `'MOV' || LPAD((SELECT COUNT(*) + 1 from movies)::TEXT,4,'0')`
      ),
      movie_name: movieName,
      external_link: externalLink ?? null,
      movie_is_active: activeStatus,
      movie_image: movieImage,
      movie_duration: movieDuration,
      external_info: externalInfo ?? null,
    })
    .returning(["movie_id"]);
  const result = await executeQuery<QueryStringResult[]>(
    query,
    "INSERT",
    "movies"
  );
  return result[0].id;
}

async function getMovies(
  orderBy?: string,
  desc?: boolean,
  searchQuery?: string,
  movieStatus?: boolean,
  firstRage?: string,
  secondRange?: string,
  trx?: Knex.Transaction
): Promise<MovieResult[]> {
  const db = trx || knexDB;
  const result = await db("movies")
    .select(
      "movie_name",
      "external_link",
      "external_info",
      "created_at",
      "movie_image",
      "movie_duration"
    )
    .where((builder) => {
      if (searchQuery) builder.where("movie_name", "ilike", searchQuery);
      if (movieStatus !== undefined)
        builder.where("movie_is_active", movieStatus);
      if (firstRage)
        builder.whereBetween("created_at", [
          firstRage,
          secondRange ?? new Date("9999-12-31T23:59:59"),
        ]);
    })
    .limit(10)
    .modify((query) => {
      if (orderBy) query.orderBy(orderBy, desc ? "desc" : "asc");
    });

  return result;
}

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
      "movie_duration"
    )
    .where("movie_is_active", "=", true)
    .limit(limit)
    .modify((query) => {
      if (orderBy) query.orderBy(orderBy);
    });
  return result;
}

export { insertMovie, getActiveMovies };
