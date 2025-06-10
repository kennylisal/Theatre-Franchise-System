import express from "express";
import { AppError, HttpCode } from "../../utils/app-error.js";
import jwt from "jsonwebtoken";
import { ProtectedRequest } from "../../middleware/interfaces.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import { getRefreshTokenData } from "../../middleware/query.js";
import { EmployeeJWTData } from "./interfaces.js";
import { getEmployeeCredentialwithId } from "./query.js";
import { generateAccesToken } from "./utils.js";

const verifyToken = async (
  req: ProtectedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!token) {
    next(
      new AppError(
        "Unauthorized",
        HttpCode.UNAUTHORIZED,
        "No AccessToken Provided",
        true
      )
    );
  }
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
    const x = jwt.verify(token, jwtSecret) as EmployeeJWTData;
    console.log(x);
    req.user = x;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      try {
        const check = await getRefreshTokenData(token);
        if (check) {
          const credential = await getEmployeeCredentialwithId(
            check.employee_id
          );
          const newAcessToken = await generateAccesToken(credential);
          res.cookie("accessToken", newAcessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
          });
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
