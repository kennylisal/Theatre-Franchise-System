import express, { NextFunction } from "express";
import routeErrorHandler from "../../utils/route-error-handler.js";
import validateBody from "../../middleware/validate-body.js";
import { signUpSchema } from "./joi-schema.js";
import { createUserCredentials, createUserDetail } from "./query.js";
import knexDB from "../../config/knex_db.js";
const userAuth = express.Router();

userAuth.post(
  "/signup",
  validateBody(signUpSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
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
  }
);

export default userAuth;
