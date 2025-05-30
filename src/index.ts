import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AppError } from "./utils/app-error.js";
import logger from "./utils/cli-logger.js";
import moviesRouter from "./router/movies/index.js";
import authRouter from "./router/auth/index.js";
import cors from "cors";
import movieScheduleRouter from "./router/movie_schedules/index.js";
dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express App!");
});

app.use("/movies", moviesRouter);
app.use("/auth", authRouter);
app.use("/movieSchedule", movieScheduleRouter);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    code: err.httpCode,
    stack: err.stack,
    description: err.message,
    isOperational: err.isOperational,
  });
  res.status(err.httpCode).json({ code: err.httpCode, message: err.message });
});

app.listen(port, () => {
  console.log(`server mendengar ${port}`);
});
