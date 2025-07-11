import express from "express";
import {
  getMovieSchedule,
  getMoviesShowing,
  getSeatingSchema,
} from "./services.js";
import routeErrorHandler from "../../../utils/route-error-handler.js";
export class PublicMovieScheduleController {
  static sendMovieScheduleDetail = async (
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
  };

  static sendScheduleOfMovieShoing = async (
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
  };

  static sendMovieScheduleSeating = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { movieScheduleId } = req.query as { movieScheduleId: string };
      const schema = await getSeatingSchema(movieScheduleId);
      res.status(200).send(schema);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
