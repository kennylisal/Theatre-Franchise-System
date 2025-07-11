import axios from "axios";
import type { RowSchema, ScheduleSeating } from "./interface";

const getSeatingSchema = async (
  movieScheduleId: string
): Promise<RowSchema[]> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/movieSchedule/getScheduleSeating",
      {
        params: {
          movieScheduleId: movieScheduleId,
        },
      }
    );
    if (response.status === 200) {
      // console.log(response.data);
      const data: ScheduleSeating = response.data;
      console.log(data);
      return data.seating_schema;
    } else {
      return [];
    }
  } catch (error) {
    console.log(`Gagal load schedule cinema \n ${error}`);
    return [];
  }
};

export { getSeatingSchema };
