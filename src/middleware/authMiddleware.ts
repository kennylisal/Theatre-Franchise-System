import { Request, Response, NextFunction } from "express";
import { auhtorizationSchema, AuthRequest } from "./interfaces.js";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import knexDB from "../config/knex_db.js";
import {
  AuthTokensPayload,
  EmployeeJWTData,
  EmployeeMiddlewareVerifData,
} from "../router/auth/interfaces.js";
import routeErrorHandler from "../utils/route-error-handler.js";
import joiValidationtoAppError from "../utils/joi-validaton-errors.js";
import Joi from "joi";
import { AppError, HttpCode } from "../utils/app-error.js";
import { getEmployeeJWTData, getRefreshTokenData } from "./query.js";
import { getEmployeeCredential } from "../router/auth/query.js";
import { generateTokens } from "../router/auth/utils.js";

const authValidator = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = await auhtorizationSchema.validateAsync(req.headers, {
      abortEarly: false,
    });
    const token = validated.authorization.startsWith("Bearer ")
      ? validated.authorization.split(" ")[1]
      : null;

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "jwt_secret_key"
    ) as EmployeeJWTData;
    console.log(decoded);
    const user: EmployeeMiddlewareVerifData = await knexDB("employees")
      .select("employee_id", "employee_role", "account_username", "is_banned")
      .where("employee_id", "=", decoded.employee_id)
      .first();

    console.log(user);

    if (!user) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return;
    }

    if (user.is_banned) {
      res.status(403).json({ error: "Forbidden: Account banned" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
          throw new AppError(
            "No Refresh Token Found",
            HttpCode.BAD_REQUEST,
            "No Refresh Token Found on body",
            false
          );
        } else {
          const tokenData = await getRefreshTokenData(refreshToken);
          if (!tokenData)
            throw new AppError(
              "Authorization Error",
              HttpCode.FORBIDDEN,
              "No Token Credential Matched",
              false
            );
          if (tokenData.revoked || new Date() > new Date(tokenData.expire_at))
            throw new AppError(
              "Forbidden Access",
              HttpCode.FORBIDDEN,
              "Account authorization revoked",
              false
            );

          const credential = await getEmployeeJWTData(tokenData.employee_id);
          const newAccess = await generateTokens(credential);
          res.set("X-New-Access-Token", newAccess.accessToken);
          res.cookie("refreshToken", newAccess.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        }
      } catch (error) {
        routeErrorHandler(next, error);
      }
    } else {
      routeErrorHandler(next, error);
    }
  }
};

// async function refreshTokenFlow(
//   next: NextFunction,
//   refreshToken: any | undefined
// ): Promise<AuthTokensPayload?> {
//   try {
//     if (!refreshToken) {
//       throw new AppError(
//         "No Refresh Token Found",
//         HttpCode.BAD_REQUEST,
//         "No Refresh Token Found on body",
//         false
//       );
//     } else {
//       const tokenData = await getRefreshTokenData(refreshToken);
//       if (!tokenData)
//         throw new AppError(
//           "Authorization Error",
//           HttpCode.FORBIDDEN,
//           "No Token Credential Matched",
//           false
//         );
//       if (tokenData.revoked || new Date() > new Date(tokenData.expire_at))
//         throw new AppError(
//           "Forbidden Access",
//           HttpCode.FORBIDDEN,
//           "Account authorization revoked",
//           false
//         );

//       const credential = await getEmployeeJWTData(tokenData.employee_id);
//       return await generateTokens(credential);
//     }
//   } catch (error) {
//     routeErrorHandler(next, error);
//   }
// }

async function modularJoiValidator(schema: any, next: NextFunction) {
  try {
    const validated = await auhtorizationSchema.validateAsync(schema, {
      abortEarly: false,
    });
  } catch (error) {
    if (error instanceof Joi.ValidationError)
      next(joiValidationtoAppError(error));
  }
}

//bikin function untuk proses jwt.veirfy baru next() kan data req.user
//ini bisa dipakai untuk skenario expired dan non-expired

export default authValidator;
