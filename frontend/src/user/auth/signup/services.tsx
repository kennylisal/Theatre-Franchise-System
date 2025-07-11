import axios from "axios";
import { baseApiUrl } from "../../../global";
import type { singupFormType } from "./interfaces";

const signupUser = async (
  body: singupFormType
): Promise<{ message: string; isSuccess: boolean }> => {
  try {
    const request = await axios.post(`${baseApiUrl}/userAuth/signup`, body);
    console.log(request);
    if (request.status === 200) {
      return {
        isSuccess: true,
        message: request.data.message,
      };
    } else {
      return {
        isSuccess: false,
        message: "gagal signup",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "gagal signup",
    };
  }
};

export { signupUser };
