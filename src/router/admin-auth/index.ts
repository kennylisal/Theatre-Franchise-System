import express from "express";
import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import {
  changeEmployeePassword,
  createEmployee,
  getEmployeeCredential,
  getEmployeeData,
} from "./query.js";
import validateBody from "../../middleware/validate-body.js";
import { employeeLoginValidationSchema } from "./joi-schemas.js";
import dotenv from "dotenv";
import { ProtectedRequest } from "../../middleware/interfaces.js";
import routeErrorHandler from "../../utils/route-error-handler.js";

import { generateTokens } from "./utils.js";
import { adminLog } from "../../logger/query.js";
import { verifyToken } from "./middlewares.js";
import { matchCryptedPassword } from "./password_config.js";
dotenv.config();
//login employee itu dua tahap
//pertama cek ada tidak kredensialnya & dia ter-banned tidak
//kedua baru mulai generate JWT dan kasih info dll

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateBody(employeeLoginValidationSchema),
  async (
    req: express.Request,
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
        const result = await generateTokens(credential);
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
  }
);
authRouter.get(
  "/employeeData",
  verifyToken,
  async (
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
  }
);

//

authRouter.post(
  "/createEmployee",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { name, password, role, location, acc_status, adminId, action } =
        req.body as {
          name: string;
          password: string;
          role: string;
          location: string;
          acc_status: string;
          adminId: string;
          action: string;
        };
      const pesan = await knexDB.transaction(async (trans) => {
        const respon = await createEmployee(
          name,
          password,
          role,
          location,
          acc_status,
          trans
        );
        await adminLog(adminId, action, respon.documentId, trans);
        return respon;
      });
      res.status(200).json(pesan);
    } catch (error) {
      console.log("masukk catch error");
      routeErrorHandler(next, error);
    }
  }
);

authRouter.put(
  "/changePassword",
  async (
    req: express.Request,
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
  }
);

//ingat disini tes coba ambil cookie
// authRouter.post(
//   "/refresh",
//   authValidator,
//   async (
//     req: ProtectedRequest,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     try {
//       if (req.user) {
//         const empCredential: EmployeeJWTData = {
//           employee_id: req.user.employee_id,
//           employee_role: req.user.employee_role,
//           account_username: req.user.account_username,
//         };
//         const result = generateTokens(empCredential);
//         res.status(200).json(req.user);
//       } else
//         throw new AppError(
//           "Token Tidak ditemukan",
//           HttpCode.INTERNAL_SERVER_ERROR,
//           "path /getCredential tidak temukan token",
//           true
//         );
//     } catch (error) {
//       routeErrorHandler(next, error);
//     }
//   }
// );

export default authRouter;
