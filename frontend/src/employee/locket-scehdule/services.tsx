import axios from "axios";
import { baseApiUrl } from "../../global";
import type { EmployeeWorkSchduleType } from "./interfaces";

async function getWorkSchedule(): Promise<{
  success: boolean;
  data: EmployeeWorkSchduleType[];
}> {
  try {
    const request = await axios.get(
      `${baseApiUrl}/workSchedule/getEmployeeSchedule`,
      {
        withCredentials: true,
      }
    );
    console.log(request);
    if (request.status === 200) {
      return { success: true, data: request.data };
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
}

export { getWorkSchedule };
