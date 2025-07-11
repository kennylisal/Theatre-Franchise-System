import axios from "axios";
import type { GetAllEmployeeDataType } from "../employee/interfaces";
import type { CreateScheduleType, LocketSchedule } from "./interfaces";

// const api = got.extend({

//   prefixUrl: "http://localhost:3000",
//   responseType: "json", // Automatically parse JSON
//   retry: {
//     limit: 3, // Retry up to 3 times
//     methods: ["GET", "POST"], // Retry only GET requests
//     statusCodes: [408, 429, 503], // Retry on these status codes
//   },
//   timeout: { request: 5000 },
//   headers: {
//     Authorization: "Bearer your-token-here",
//     "User-Agent": "TheatreSystem/1.0",
//   },
// });
// const getSchedule = async (waktuAwal: string): Promise<LocketSchedule[]> => {
//   try {
//     const response = await got.get(
//       "http://localhost:3000/workSchedule/getSchedule",
//       {
//         searchParams: { timeStart: waktuAwal },
//         cache: true, // Enable caching
//       }
//     );
//     return JSON.parse(response.body);
//   } catch (error) {
//     console.log(`Gagal load \n ${error}`);
//     return [];
//   }
// };
const getAllEmployee = async (): Promise<{
  data: GetAllEmployeeDataType[];
  susccess: boolean;
}> => {
  try {
    const req = await axios.get(
      "http://localhost:3000/workSchedule/getEmployeeData"
    );

    if (req.status === 200) {
      return { data: req.data, susccess: true };
    } else {
      return { data: [], susccess: false };
    }
  } catch (error) {
    console.log(`Gagal load \n ${error}`);
    return { data: [], susccess: false };
  }
};

const getSchedule = async (
  waktuAwal: string
): Promise<{ data: LocketSchedule[]; success: boolean }> => {
  try {
    const res = await axios.get(
      "http://localhost:3000/workSchedule/getSchedule",
      { params: { timeStart: waktuAwal } }
    );
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.log(`Gagal load \n ${error}`);
    return { success: false, data: [] };
  }
};

const createNewSchedule = async (
  body: CreateScheduleType
): Promise<{
  data: string;
  success: boolean;
}> => {
  try {
    console.log(body);
    const res = await axios.post(
      "http://localhost:3000/workSchedule/create",
      body
    );
    if (res.status === 200) {
      return { success: false, data: res.data.message };
    } else {
      return { success: false, data: res.data.message };
    }
  } catch (error) {
    console.log(`Gagal create \n ${error}`);
    return { success: false, data: "Internal Error" };
  }
};

export { getAllEmployee, getSchedule, createNewSchedule };
