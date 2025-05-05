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
  theatre: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("movie_schedules").insert({
    movie: movieId,
    started_at: timeStart,
    end_at: timeEnd,
    price: price,
    cinema_location: cinema.cinemaId,
    available_seating_schema: cinema.seatingSchema,
    theatre_location: theatre,
    buyed_seating_schema: {},
  });
  await executeQuery(query, "INSERT", "movie_schedules");
}
//cari schedule dari sebuah range
async function getMovieSchedule(
  theatre: string,
  timeStart: string,
  timeEnd: string,
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

async function getCinemaInfo(
  cinemaId: string,
  trx?: Knex.Transaction
): Promise<CinemaInfo> {
  const db = trx || knexDB;
  const result = await db("movie_cinemas")
    .select("capacity", "cinema_id", "cinema_name", "seating_schema")
    .where("cinema_id", "=", cinemaId)
    .first();
  return result;
}

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
