//atur schedule film dulu

import { Knex } from "knex";
import { CinemaInfo } from "./interface.js";
import knexDB from "../../../config/knex_db.js";
import executeQuery from "../../../utils/query-helper.js";

//CRUD

async function updateMovieSchedule(
  movieId: string,
  timeStart: string,
  timeEnd: string,
  price: number,
  movie_schedule_id: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = db("movie_schedules as ms")
    .update({
      movie: movieId,
      started_at: new Date(timeStart),
      end_at: new Date(timeEnd),
      price: price,
    })
    .where("ms.movie_schedule_id", "=", movie_schedule_id);
  return await executeQuery(query, "update", "movie_schedules");
}

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

async function getMoviesShowingAtDate(
  timeStart: string,
  timeEnd: string,
  trx?: Knex.Transaction
) {
  const db = trx || knexDB;
  const query = await db("movie_schedules as ms")
    .join("movies as m", "m.movie_id", "=", "ms.movie")
    .whereBetween("ms.started_at", [timeStart, timeEnd])
    .select(
      "m.movie, m.movie_name, ms.started_at, ms.movie_schedule_id,m.movie_image"
    );
  return query;
}

export {
  addMovieSchedule,
  getCinemaInfo,
  updateMovieSchedule,
  getMoviesShowingAtDate,
};
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
