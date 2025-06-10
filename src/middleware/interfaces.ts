import Joi from "joi";
import { Request } from "express";
import {
  CredentialPayload,
  EmployeeJWTData,
} from "../router/auth/interfaces.js";
interface HeaderRequest {
  authorization: string;
}
interface ProtectedRequest extends Request {
  user?: EmployeeJWTData;
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

export { auhtorizationSchema, ProtectedRequest, RefreshTokenData };
