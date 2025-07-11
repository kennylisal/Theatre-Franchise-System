import axios from "axios";
import type { UserJWTData } from "./interface";
import { baseApiUrl } from "../../../global";

const checkUserVerification = async (): Promise<{
  success: boolean;
  data: UserJWTData;
}> => {
  try {
    const request = await axios.get(`${baseApiUrl}/userAuth/userData`, {
      withCredentials: true,
    });
    console.log(request);
    if (request.status === 200) {
      return { success: true, data: request.data };
    } else {
      return {
        success: false,
        data: { user_id: "", username: "" },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: { user_id: "", username: "" },
    };
  }
};

export { checkUserVerification };
