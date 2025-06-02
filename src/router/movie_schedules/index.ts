import express from "express";
import validateBody from "../../middleware/validate-body.js";
import {
  createMovieScheduleSchema,
  getMovieScheduleQuery,
  getMovieShowingQuery,
  updateMovieScheduleSchema,
} from "./joi-schema.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import {
  addMovieSchedule,
  getCinemaInfo,
  getMovieSchedule,
  getMoviesShowing,
  updateMovieSchedule,
} from "./query.js";
import validateQuery from "../../middleware/validate-query.js";
import knexDB from "../../config/knex_db.js";
import { CinemaInfo } from "./interface.js";

const movieScheduleRouter = express.Router();

movieScheduleRouter.put(
  "/update",
  validateBody(updateMovieScheduleSchema),
  async (
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
  }
);

movieScheduleRouter.post(
  "/create",
  validateBody(createMovieScheduleSchema),
  async (
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
  }
);

movieScheduleRouter.get(
  "/get",
  validateQuery(getMovieShowingQuery),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await getMovieSchedule(req.body.movieScheduleId);
      res.status(200).send(data);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);
//nanti bikin lagi get movie schedule

movieScheduleRouter.get(
  "/getMovieShowing",
  validateQuery(getMovieShowingQuery),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { theatreLocation, timeStart, timeEnd } = req.query as {
        theatreLocation: string;
        timeStart: string;
        timeEnd: string;
      };
      const data = await getMoviesShowing(theatreLocation, timeStart, timeEnd);
      res.status(200).send(data);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

export default movieScheduleRouter;
