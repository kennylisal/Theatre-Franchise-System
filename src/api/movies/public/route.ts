import express, { NextFunction } from "express";

import { getActiveMoviesSchema } from "./joi-schema.js";
import validateQuery from "../../../middlewares/validate-query.js";
import { PublicMoviesController } from "./controller.js";

const publicMoviesRouter = express.Router();

publicMoviesRouter.get(
  "/activeMovies",
  validateQuery(getActiveMoviesSchema),
  PublicMoviesController.sendActiveMovies
);

export default publicMoviesRouter;
