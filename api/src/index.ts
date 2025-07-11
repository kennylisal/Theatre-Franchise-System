import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AppError, HttpCode } from "./utils/app-error.js";
import logger from "./utils/cli-logger.js";
import authRouter from "./api/admin-auth/route.js";
import cors from "cors";
import workScheduleRouter from "./api/work_schedule/route.js";
import cookieParser from "cookie-parser";
import { verifyAdminToken } from "./middlewares/verify-admin-token.js";
import protectedMovieScheduleRouter from "./api/movie_schedules/protected/route.js";
import publicMovieScheduleRouter from "./api/movie_schedules/public/route.js";
import publicMoviesRouter from "./api/movies/public/route.js";
import protectedMoviesRouter from "./api/movies/protected/route.js";
import userRoute from "./api/user_auth/protected/route.js";
import userAuthRoute from "./api/user_auth/public/route.js";
import { verifyUserToken } from "./middlewares/verify-user-token.js";
dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express App!");
});

app.use("/auth", verifyAdminToken, authRouter);
app.use("/movieSchedule", verifyAdminToken, protectedMovieScheduleRouter);
app.use("/movies", verifyAdminToken, protectedMoviesRouter);
app.use("/workSchedule", verifyAdminToken, workScheduleRouter);

app.use("/user", verifyUserToken, userRoute);

app.use("/userAuth", userAuthRoute);
app.use("/public/movies", publicMoviesRouter);
app.use("/public/movieSchedule", publicMovieScheduleRouter);

process.on("uncaughtException", (error: Error) => {
  logger.error({
    message: "Uncaught Exception",
    error: error.message,
    stack: error.stack,
  });
});

app.use(
  (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      logger.error({
        code: err.httpCode,
        stack: err.stack,
        description: err.message,
        isOperational: err.isOperational,
      });
      res
        .status(err.httpCode)
        .json({ code: err.httpCode, message: err.message });
    } else {
      // Handle unexpected errors
      const message =
        err instanceof Error ? err.message : "Unknown Error occurred";
      logger.error({
        code: HttpCode.INTERNAL_SERVER_ERROR,
        stack: err instanceof Error ? err.stack : undefined,
        description: message,
        isOperational: false,
      });
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }
);

app.listen(port, () => {
  console.log(`server mendengar ${port}`);
});
