import express from "express";
import { Knex } from "knex";
import knexDB from "../../config/knex_db.js";
import {
  changeEmployeePassword,
  createEmployee,
  generateRefreshToken,
  getEmployeeCredential,
} from "./query.js";
import validateBody from "../../middleware/validate-body.js";
import {
  employeeCredentialSchema,
  employeeLoginValidationSchema,
} from "./joi-schemas.js";
import { hashPassword, matchCryptedPassword } from "./password_config.js";
import dotenv from "dotenv";
import { AuthRequest } from "../../middleware/interfaces.js";
import authValidator from "../../middleware/authMiddleware.js";
import { AppError, HttpCode } from "../../utils/app-error.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import {
  AuthTokensPayload,
  EmployeeCredential,
  EmployeeJWTData,
} from "./interfaces.js";
import { generateTokens } from "./utils.js";
import { adminLog } from "../../logger/query.js";
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
        const result = generateTokens(credential);
        res.status(200).json(result);
      } else res.status(403).json({ message: "Password Tidak Sesuai" });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);
// const jwtSecret = process.env.JWT_SECRET_KEY || "jwt-secret-key";
// const accessToken = jwt.sign(
//   {
//     employee_id: credential.employee_id,
//     employee_role: credential.employee_role,
//     account_username: credential.account_username,
//   },
//   jwtSecret,
//   { expiresIn: "1h" }
// );
// //
// const secretKey = CryptoJS.lib.WordArray.random(32).toString(
//   CryptoJS.enc.Hex
// );
// const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
// await generateRefreshToken(credential.employee_id, secretKey, expireAt);
//

//ini khusus untuk pertama ambil data" penting
//pertama ambil data dari header -> ke req,user
authRouter.post(
  "/refresh",
  authValidator,
  async (
    req: AuthRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (req.user) {
        const empCredential: EmployeeJWTData = {
          employee_id: req.user.employee_id,
          employee_role: req.user.employee_role,
          account_username: req.user.account_username,
        };
        const result = generateTokens(empCredential);
        res.status(200).json(req.user);
      } else
        throw new AppError(
          "Token Tidak ditemukan",
          HttpCode.INTERNAL_SERVER_ERROR,
          "path /getCredential tidak temukan token",
          true
        );
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

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

export default authRouter;
