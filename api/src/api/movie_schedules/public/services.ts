import { Knex } from "knex";
import { MovieSchedule } from "../protected/interface.js";
import knexDB from "../../../config/knex_db.js";

//cari schedule dari sebuah range
async function getMovieSchedules(
  theatre: string,
  timeEnd: string,
  timeStart: string,
  trx?: Knex.Transaction
): Promise<MovieSchedule[]> {
  const db = trx || knexDB;
  const result = await db("movie_schedules as ms")
    .select(
      "m.movie_name as movieName",
      "ms.price as price",
      "ms.started_at as timeStart",
      "ms.end_at as timeEnd"
    )
    .join("movies as m", "m.movie_id", "=", "ms.movie")
    .join("movie_cinemas as mc", "mc.cinema_id", "=", "ms.cinema_location")
    .where("mc.theatre_location", "=", theatre)
    .whereBetween("ms.started_at", [timeStart, timeEnd]);
  return result;
}

async function getMoviesShowing(
  theatreLocation: string,
  timeEnd: string,
  timeStart: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const result = db("movie_cinemas as mc")
    .select(
      "mc.cinema_id",
      "mc.cinema_name",
      "ms.movie",
      "m.movie_name",
      "m.movie_image",
      "ms.started_at",
      "ms.end_at",
      "ms.price",
      "ms.movie_schedule_id"
    )
    .leftJoin("movie_schedules as ms", function () {
      this.on(
        "ms.started_at",
        "between",
        db.raw("? and ?", [timeEnd, timeStart])
      ).andOn("ms.cinema_location", "=", "mc.cinema_id");
    })

    .leftJoin("movies as m", "ms.movie", "=", "m.movie_id")
    .where("mc.theatre_location", "=", theatreLocation)
    .orderBy("mc.cinema_name", "asc");
  return await result;
}

async function getMovieSchedule(
  movieScheduleId: string,
  trx?: Knex.Transaction
): Promise<MovieSchedule[]> {
  const db = trx || knexDB;
  const result = await db("movie_schedules as ms")
    .select(
      "m.movie_name as movieName",
      "ms.price as price",
      "ms.started_at as timeStart",
      "ms.end_at as timeEnd"
    )
    .join("movies as m", "m.movie_id", "=", "ms.movie")
    .join("movie_cinemas as mc", "mc.cinema_id", "=", "ms.cinema_location")
    .where("ms.movie_schedule_id", "=", movieScheduleId)
    .first();
  return result;
}

async function getSeatingSchema(
  movie_schedule_id: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const cinemaId: { cinema_location: string } = await db("movie_schedules")
    .select("cinema_location")
    .where("movie_schedule_id", "=", movie_schedule_id)
    .first();
  const query = await db("movie_cinemas")
    .select("seating_schema")
    .where("cinema_id", "=", cinemaId.cinema_location)
    .first();
  return query;
}
export {
  getMovieSchedule,
  getMovieSchedules,
  getMoviesShowing,
  getSeatingSchema,
};
