import express, { NextFunction } from "express";
import routeErrorHandler from "../../../utils/route-error-handler.js";
import { getUserData } from "./services.js";
import { verifyUserToken } from "../../../middlewares/verify-user-token.js";
import { UserRequest } from "../../../middlewares/interfaces.js";
const userRoute = express.Router();

userRoute.post(
  "/userData",
  verifyUserToken,
  async (
    req: UserRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { user_id } = req.user!;
      const result = await getUserData(user_id);
      res.status(200).json(result);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

export default userRoute;
