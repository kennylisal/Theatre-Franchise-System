import { UserJWTData, UserRequest } from "./interface.js";
import jwt from "jsonwebtoken";
import express from "express";
import { AppError, HttpCode } from "../../utils/app-error.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import {
  getRefreshTokenUser,
  getUserCredential,
  getUserCredentialwithId,
} from "./query.js";

const verifyToken = async (
  req: UserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req.cookies);
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    next(
      new AppError(
        "Unauthorized",
        HttpCode.UNAUTHORIZED,
        "No refreshToken Provided",
        true
      )
    );
  }
  try {
    const jwtSecret = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const x = jwt.verify(token, jwtSecret) as UserJWTData;
    req.user = x;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || !token) {
      console.log("token telah expire");
      try {
        const check = await getRefreshTokenUser(refreshToken);
        if (check) {
          const credential = await getUserCredentialwithId(check);
          const jwtSecret = process.env.JWT_SECRET_KEY || "jwt-secret-key";
          const newAccessToken = jwt.sign(
            {
              user_id: credential.user_id,
              username: credential.username,
            },
            jwtSecret,
            { expiresIn: "1h" }
          );
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 1000,
          });
          req.user = {
            user_id: credential.user_id,
            username: credential.username,
          };
          next();
        } else {
          next(
            new AppError(
              "Unauthorized",
              HttpCode.UNAUTHORIZED,
              "invalid Refresh token",
              true
            )
          );
        }
      } catch (error) {
        routeErrorHandler(next, error);
      }
    } else {
      next(
        new AppError(
          "Unauthorized",
          HttpCode.UNAUTHORIZED,
          "Token is not valid",
          true
        )
      );
    }
  }
};

export { verifyToken };
