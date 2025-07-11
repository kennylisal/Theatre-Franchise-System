import express, { NextFunction } from "express";
import { generateUserToken } from "../protected/services.js";
import { matchCryptedPassword } from "../../../utils/password_config.js";
import routeErrorHandler from "../../../utils/route-error-handler.js";
import knexDB from "../../../config/knex_db.js";
import {
  createUserCredentials,
  createUserDetail,
  getUserCredential,
} from "./services.js";

export class PublicUserController {
  static userLogin = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const credential = await getUserCredential(req.body.username);
      if (!credential) {
        res.status(401).json({ message: "Invalid Credential" });
      }
      if (credential.is_banned) {
        res.status(403).json({ message: "Akun ter banned, akses ditolak" });
      }
      const isPasswordMatched = await matchCryptedPassword(
        req.body.password,
        credential.user_password
      );
      if (isPasswordMatched) {
        const result = await generateUserToken(credential);
        res.cookie("accessToken", result.accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches refresh token expiration)
        });
        res.status(200).json({ message: "berhasil login" });
      } else {
        res.status(401).json({ message: "Invalid Credential" });
      }
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static signUpUser = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);
      await knexDB.transaction(async (trx) => {
        const idUserBaru = await createUserCredentials(
          req.body.username,
          req.body.name,
          req.body.dateOfBirth,
          req.body.password,
          trx
        );
        console.log(idUserBaru);
        await createUserDetail(
          idUserBaru.user_id,
          req.body.name,
          req.body.dateOfBirth,
          "image_placeholder",
          trx
        );
      });
      res.status(200).json({ message: "Signup berhasil, Silahkan login" });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
