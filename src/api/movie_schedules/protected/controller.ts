import express from "express";
import {
  addMovieSchedule,
  getCinemaInfo,
  getMoviesShowingAtDate,
  updateMovieSchedule,
} from "./services.js";
import routeErrorHandler from "../../../utils/route-error-handler.js";
import knexDB from "../../../config/knex_db.js";
import { CinemaInfo } from "./interface.js";
import dayjs from "dayjs";

export class ProtectedMovieScheduleController {
  static updateRequestedMovieSchedule = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await updateMovieSchedule(
        req.body.movieId,
        req.body.timeStart,
        req.body.timeEnd,
        req.body.price,
        req.body.movie_schedule_id
      );
      res.status(200).send({
        message: `Schedule Film ${req.body.movie_schedule_id} berhasil ditambahkan`,
      });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
  static createMovieSchedule = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const idBaru = await knexDB.transaction(async (trans) => {
        const cinema: CinemaInfo = await getCinemaInfo(req.body.cinema);
        const scheduleId = await addMovieSchedule(
          req.body.movieId,
          req.body.timeStart,
          req.body.timeEnd,
          req.body.price,
          cinema,
          trans
        );
        return scheduleId;
      });

      res
        .status(200)
        .send({ message: `Schedule film ${idBaru} berhasil ditambahkan` });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static sendTransanctionalMovieList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { timeStart } = req.query as { timeStart: string };
      const date = dayjs(timeStart);
      const getMovieData = await getMoviesShowingAtDate(
        date.startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        date.endOf("day").format("YYYY-MM-DDTHH:mm:ss")
      );
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
