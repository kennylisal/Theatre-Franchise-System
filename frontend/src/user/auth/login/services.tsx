import axios from "axios";
import type { LoginFormType } from "./interface";
import { baseApiUrl } from "../../../global";

const loginUser = async (
  body: LoginFormType
): Promise<{ message: string; isSuccess: boolean }> => {
  try {
    const request = await axios.post(`${baseApiUrl}/userAuth/login`, body);
    console.log(request);
    if (request.status === 200) {
      return {
        isSuccess: true,
        message: request.data.message,
      };
    } else {
      return {
        isSuccess: false,
        message: "gagal login",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Gagal Login",
    };
  }
};

export { loginUser };
