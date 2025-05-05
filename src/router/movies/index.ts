import express, { NextFunction } from "express";
import Joi from "joi";
import { AuthRequest } from "../../middleware/interfaces.js";
import authValidator from "../../middleware/authMiddleware.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import validateQuery from "../../middleware/validate-query.js";
import { createMovieSchema } from "./joi-schema.js";
import { CreateMovieSchema } from "./interface.js";
import knexDB from "../../config/knex_db.js";
import { insertMovie } from "./query.js";
import { tesLogAdmin } from "../../logger/index.js";
import { Knex } from "knex";
import { AppError, HttpCode } from "../../utils/app-error.js";
import { EmployeeJWTData } from "../auth/interfaces.js";

const moviesRouter = express.Router();

moviesRouter.post(
  "/create",
  validateQuery(createMovieSchema),
  async (req: AuthRequest, res: express.Response, next: NextFunction) => {
    console.log("Masuk create movies utama");
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
        employeeLogData("INSERT", movieId, req.user, trx);
        // if (!req.user) throw new Error("Token tidak valid Ketika ngelog");
        // else await tesLogAdmin(req.user.user_id, "INSERT", movieId, trx);
        // await tesLogAdmin("lisal_admin", "INSERT", movieId, trx);
      });
      res
        .status(200)
        .send({ message: `Film ${data.movieName} berhasil ditambahkan` });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

async function employeeLogData(
  action: string,
  docuemntId: string,
  employee?: EmployeeJWTData,
  trx?: Knex.Transaction
) {
  try {
    if (!employee) throw new Error("Token tidak valid Ketika ngelog");
    else await tesLogAdmin(employee.employee_id, action, docuemntId, trx);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Error occured";
    throw new AppError(
      "Token authorization tidak tersedia",
      HttpCode.BAD_REQUEST,
      message,
      true
    );
  }
}

export default moviesRouter;
