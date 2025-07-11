import axios from "axios";

async function adminLogin(
  username: string,
  password: string
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const body = {
      username: username,
      newPassword: password,
    };
    const request = await axios.post("http://localhost:3000/auth/login", body, {
      withCredentials: true,
    });
    const { message } = request.data as { message: string };
    console.log(request);
    if (request.status === 200) {
      return { success: true, message: message };
    } else {
      return { success: false, message: message };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fatal Error" };
  }
}

export { adminLogin };
