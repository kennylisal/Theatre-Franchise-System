import express from "express";
import validateBody from "../../middlewares/validate-body.js";
import {
  changePasswordRequestSchema,
  createEmployeeRequestScehma,
  employeeLoginValidationSchema,
} from "./joi-schemas.js";
import dotenv from "dotenv";

import { AdminAuthController } from "./controller.js";

dotenv.config();

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateBody(employeeLoginValidationSchema),
  AdminAuthController.adminLogin
);

authRouter.post(
  "/createEmployee",
  validateBody(createEmployeeRequestScehma),
  AdminAuthController.createNewEmployee
);

authRouter.put(
  "/changePassword",
  validateBody(changePasswordRequestSchema),
  AdminAuthController.changePassword
);

authRouter.get("/employeeData", AdminAuthController.sendEmployeeData);

export default authRouter;
