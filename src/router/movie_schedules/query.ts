//atur schedule film dulu

import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import { CinemaInfo, MovieSchedule } from "./interface.js";
import executeQuery from "../../utils/query-helper.js";

//CRUD
async function addMovieSchedule(
  movieId: string,
  timeStart: string,
  timeEnd: string,
  price: number,
  cinema: CinemaInfo,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const idShcedule = cinema.theatreLocation.substring(3);
  const query = db("movie_schedules")
    .insert({
      movie: movieId,
      started_at: new Date(timeStart),
      end_at: new Date(timeEnd),
      price: price,
      movie_schedule_id: knexDB.raw(
        `? || LPAD((select (count(*)+2)::TEXT from movie_schedules ms, movie_cinemas mc, theatres t where ms.cinema_location = mc.cinema_id and t.theatre_id = ?),5,'0')`,
        [idShcedule, cinema.theatreLocation]
      ),
      cinema_location: cinema.cinemaId,
      available_seating_schema: JSON.stringify(cinema.seatingSchema),
      buyed_seating_schema: {},
    })
    .returning(["movie_schedule_id"]);
  return await executeQuery<string>(query, "INSERT", "movie_schedules");
}

async function getCinemaInfo(
  cinemaId: string,
  trx?: Knex.Transaction
): Promise<CinemaInfo> {
  const db = trx || knexDB;
  const query = await db("movie_cinemas")
    .select({
      cinemaId: "cinema_id",
      capacity: "capacity",
      seatingSchema: "seating_schema",
      cinemaName: "cinema_name",
      theatreLocation: "theatre_location",
    })
    .where("cinema_id", "=", cinemaId)
    .first();
  return query;
}
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
    .leftJoin(
      "movie_schedules as ms",
      "ms.cinema_location",
      "=",
      "mc.cinema_id"
    )
    .leftJoin("movies as m", "ms.movie", "=", "m.movie_id")
    .leftJoin("movie_schedules as msx", function () {
      this.on(
        "msx.started_at",
        "BETWEEN",
        db.raw("? AND ?", [timeEnd, timeStart])
      );
    })
    .where("mc.theatre_location", "=", theatreLocation)
    .orderBy("mc.cinema_name", "asc");
  // .leftJoin("movie_schedules as msx", function () {
  //   this.on("ms.cinema_location", "=", "mc.cinema_id").andOn(
  //     "ms.started_at",
  //     "BETWEEN",
  //     db.raw("? AND ?", [timeEnd, timeStart])
  //   );
  // })

  console.log(result.toSQL());
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
//nanti tambahi logger kalau sudah dites berhasil
async function deleteMovieSchedule(
  movie_schedule: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("movie_shcedule")
    .where("movie_schedule_id", "=", movie_schedule)
    .delete();
  await executeQuery(query, "DELETE", "movie_schedule");
}

export { addMovieSchedule, getMovieSchedule, getCinemaInfo, getMoviesShowing };
//schedule locket
//hanya ad shift siang dan malam
//jadi update hanya ganti employee

//dibawah contoh insert timestamp
// async function insertEvent(eventName: string, eventTime: Date | string): Promise<void> {
//     try {
//       await db('events').insert({
//         event_name: eventName,
//         event_time: eventTime, // Can be a Date object or ISO string
//       });
//       console.log('Event inserted successfully');
//     } catch (error) {
//       console.error('Error inserting event:', error);
//     }
//   }

//   // Example usage
//   (async () => {
//     // Using a Date object
//     await insertEvent('Meeting', new Date()); // Current timestamp

//     // Using a string (ISO format)
//     await insertEvent('Conference', '2025-04-29 14:30:00');

//     // Close the connection
//     await db.destroy();
//   })();
