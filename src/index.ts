import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AppError, HttpCode } from "./utils/app-error.js";
import logger from "./utils/cli-logger.js";
import moviesRouter from "./router/movies/index.js";
import authRouter from "./router/admin-auth/index.js";
import cors from "cors";
import movieScheduleRouter from "./router/movie_schedules/index.js";
import workScheduleRouter from "./router/work_schedule/index.js";
import cookieParser from "cookie-parser";
import userAuth from "./router/user_auth/index.js";
dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

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
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express App!");
});

app.use("/movies", moviesRouter);
app.use("/auth", authRouter);
app.use("/movieSchedule", movieScheduleRouter);
app.use("/workSchedule", workScheduleRouter);
app.use("/userAuth", userAuth);

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
