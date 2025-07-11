import Joi from "joi";
import { Request } from "express";
import { EmployeeJWTData } from "../api/admin-auth/interfaces.js";
import { UserJWTData } from "../api/user_auth/protected/interface.js";
interface HeaderRequest {
  authorization: string;
}
interface ProtectedRequest extends Request {
  user?: EmployeeJWTData;
}
interface UserRequest extends Request {
  user?: UserJWTData;
}
interface RefreshTokenData {
  token: string;
  employee_id: string;
  revoked: boolean;
  expire_at: string;
}

const auhtorizationSchema = Joi.object<HeaderRequest>({
  authorization: Joi.string().required(),
}).unknown(true);
//allow unknown headers

export { auhtorizationSchema, ProtectedRequest, RefreshTokenData, UserRequest };
