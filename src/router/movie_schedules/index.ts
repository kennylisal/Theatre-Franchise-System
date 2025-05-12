import express from "express";
import validateBody from "../../middleware/validate-body.js";
import {
  createMovieScheduleSchema,
  getMovieScheduleQuery,
} from "./joi-schema.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import { addMovieSchedule, getMovieSchedule } from "./query.js";
import validateQuery from "../../middleware/validate-query.js";

const movieScheduleRouter = express.Router();

movieScheduleRouter.post(
  "/create",
  validateBody(createMovieScheduleSchema),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const scheduleId = await addMovieSchedule(
        req.body.movieId,
        req.body.timeStart,
        req.body.timeEnd,
        req.body.price,
        req.body.cinema,
        req.body.theatre
      );
      res
        .status(200)
        .send({ message: `Schedule film ${scheduleId} berhasil ditambahkan` });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

movieScheduleRouter.get(
  "/get",
  validateQuery(getMovieScheduleQuery),
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

export default movieScheduleRouter;
