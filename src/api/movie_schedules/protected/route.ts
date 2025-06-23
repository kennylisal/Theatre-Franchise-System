import express from "express";
import {
  createMovieScheduleSchema,
  getTheatreMovieQuery,
  updateMovieScheduleSchema,
} from "./joi-schema.js";
import validateBody from "../../../middlewares/validate-body.js";
import validateQuery from "../../../middlewares/validate-query.js";
import { ProtectedMovieScheduleController } from "./controller.js";

const protectedMovieScheduleRouter = express.Router();

protectedMovieScheduleRouter.put(
  "/update",
  validateBody(updateMovieScheduleSchema),
  ProtectedMovieScheduleController.updateRequestedMovieSchedule
);

protectedMovieScheduleRouter.post(
  "/create",
  validateBody(createMovieScheduleSchema),
  ProtectedMovieScheduleController.createMovieSchedule
);

protectedMovieScheduleRouter.get(
  "/getTransactionalMovie",
  validateQuery(getTheatreMovieQuery),
  ProtectedMovieScheduleController.sendTransanctionalMovieList
);

export default protectedMovieScheduleRouter;
