import { Request } from "express";
interface UserJWTData {
  username: string;
  user_id: string;
}

interface UserDisplayData {
  user_name: string;
  user_image: string;
  date_of_birth: string;
}

interface UserCredential {
  user_id: string;
  username: string;
  user_password: string;
  is_banned: boolean;
}

interface UserRequest extends Request {
  user?: UserJWTData;
}
export { UserJWTData, UserCredential, UserRequest, UserDisplayData };
