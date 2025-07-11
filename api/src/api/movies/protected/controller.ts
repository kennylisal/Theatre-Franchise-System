import { ProtectedRequest } from "../../../middlewares/interfaces.js";
import express, { NextFunction } from "express";
import { insertMovie } from "./services.js";
import knexDB from "../../../config/knex_db.js";
import { CreateMovieSchema } from "../public/interface.js";
import { tesLogAdmin } from "../../../logger/index.js";
import routeErrorHandler from "../../../utils/route-error-handler.js";
export class ProtectedMoviesController {
  static createNewMovies = async (
    req: ProtectedRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const data: CreateMovieSchema = req.body;
      await knexDB.transaction(async (trx) => {
        const movieId = await insertMovie(
          data.movieName,
          data.activeStatus,
          data.movieImage,
          data.movieDuration,
          data.externalInfo,
          data.externalLink,
          trx
        );
        if (req.user)
          await tesLogAdmin(req.user.employee_id, "INSERT", movieId, trx);
      });
      res
        .status(200)
        .send({ message: `Film ${data.movieName} berhasil ditambahkan` });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
