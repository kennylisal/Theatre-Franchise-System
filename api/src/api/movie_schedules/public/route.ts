import express from "express";
import validateQuery from "../../../middlewares/validate-query.js";
import { getMovieShowingQuery } from "../protected/joi-schema.js";
import { getMovieScheduleDetail } from "./joi.schema.js";
import { PublicMovieScheduleController } from "./controller.js";
const publicMovieScheduleRouter = express.Router();

publicMovieScheduleRouter.get(
  "/get",
  validateQuery(getMovieScheduleDetail),
  PublicMovieScheduleController.sendMovieScheduleDetail
);

publicMovieScheduleRouter.get(
  "/getMovieShowing",
  validateQuery(getMovieShowingQuery),
  PublicMovieScheduleController.sendScheduleOfMovieShoing
);

publicMovieScheduleRouter.get(
  "/getScheduleSeating",
  PublicMovieScheduleController.sendMovieScheduleSeating
);

export default publicMovieScheduleRouter;
