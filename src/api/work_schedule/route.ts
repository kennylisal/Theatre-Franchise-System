import express from "express";
import validateBody from "../../middlewares/validate-body.js";
import {
  createWorkScheduleSchema,
  getWorkScheduleSchema,
} from "./joi-schema.js";

import validateQuery from "../../middlewares/validate-query.js";
import { WorkScheduleController } from "./controller.js";

const workScheduleRouter = express.Router();

workScheduleRouter.post(
  "/create",
  validateBody(createWorkScheduleSchema),
  WorkScheduleController.createWorkSchedule
);

workScheduleRouter.get(
  "/getSchedule",
  validateQuery(getWorkScheduleSchema),
  WorkScheduleController.sendWorkSchedule
);

//harusnya ini cek bearer
workScheduleRouter.get(
  "/getEmployeeData",
  WorkScheduleController.sendEmployeeData
);

workScheduleRouter.get(
  "/getEmployeeSchedule",
  WorkScheduleController.sendEmployeeSchedule
);
export default workScheduleRouter;
