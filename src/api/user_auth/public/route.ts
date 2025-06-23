import express, { NextFunction } from "express";
import validateBody from "../../../middlewares/validate-body.js";
import { loginSchema, signUpSchema } from "./joi-schema.js";
const userAuthRoute = express.Router();

userAuthRoute.post("/login", validateBody(loginSchema));

userAuthRoute.post("/signup", validateBody(signUpSchema));
export default userAuthRoute;
