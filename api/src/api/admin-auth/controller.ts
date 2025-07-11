import express from "express";
import {
  changeEmployeePassword,
  createEmployee,
  generateAdminTokens,
  getEmployeeCredential,
  getEmployeeData,
} from "./services.js";
import { matchCryptedPassword } from "../../utils/password_config.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import { ProtectedRequest } from "../../middlewares/interfaces.js";
import knexDB from "../../config/knex_db.js";
import { adminLog } from "../../logger/query.js";

export class AdminAuthController {
  static adminLogin = async (
    req: ProtectedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const credential = await getEmployeeCredential(req.body.username);
      if (credential.account_status === "banned")
        res.status(403).json({ message: "Akun ter banned, akses ditolak" });
      if (credential.account_status === "inactive")
        res.status(403).json({ message: "Akun sedang non-aktif" });
      const isPasswordMatched = await matchCryptedPassword(
        req.body.newPassword,
        credential.account_password
      );
      if (isPasswordMatched) {
        const result = await generateAdminTokens(credential);
        // console.log(result);
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
      } else res.status(403).json({ message: "Password Tidak Sesuai" });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static sendEmployeeData = async (
    req: ProtectedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { employee_id } = req.user!;
      const result = await getEmployeeData(employee_id);
      res.status(200).json(result);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static createNewEmployee = async (
    req: ProtectedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { name, password, role, location, acc_status, action } =
        req.body as {
          name: string;
          password: string;
          role: string;
          location: string;
          acc_status: string;
          action: string;
        };
      const { employee_id } = req.user!;
      const pesan = await knexDB.transaction(async (trans) => {
        const respon = await createEmployee(
          name,
          password,
          role,
          location,
          acc_status,
          trans
        );
        await adminLog(employee_id, action, respon.documentId, trans);
        return respon;
      });
      res.status(200).json(pesan);
    } catch (error) {
      console.log("masukk catch error");
      routeErrorHandler(next, error);
    }
  };

  static changePassword = async (
    req: ProtectedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { username, newPassword } = req.body as {
        username: string;
        newPassword: string;
      };
      await changeEmployeePassword(newPassword, username);
      res.status(200).json({ message: "Berhasil ganti pass " + username });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
