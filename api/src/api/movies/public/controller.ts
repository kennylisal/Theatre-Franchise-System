import express, { NextFunction } from "express";
import { getActiveMovies } from "./services.js";
import routeErrorHandler from "../../../utils/route-error-handler.js";
export class PublicMoviesController {
  static sendActiveMovies = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { limit, orderBy } = req.query as {
        limit?: string;
        orderBy?: string;
      };
      const movies = await getActiveMovies({
        limit: limit ? Number(limit) : undefined,
        orderBy: orderBy ? orderBy : undefined,
      });
      res.status(200).send(movies);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
