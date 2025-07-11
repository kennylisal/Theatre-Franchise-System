import axios from "axios";
import type { EmployeeJWTData } from "./interface";

const checkVerification = async (): Promise<{
  success: boolean;
  data: EmployeeJWTData;
}> => {
  try {
    const request = await axios.get("http://localhost:3000/auth/employeeData", {
      withCredentials: true,
    });
    console.log(request);
    if (request.status === 200) {
      return { success: true, data: request.data as EmployeeJWTData };
    } else {
      return {
        success: false,
        data: { account_username: "", employee_id: "", employee_role: "" },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: { account_username: "", employee_id: "", employee_role: "" },
    };
  }
};
export { checkVerification };
