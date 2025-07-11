import Joi from "joi";
import joiErrortoDetail from "../global/joi-error-helper";
import axios from "axios";
import type { CreateEmployeeDataType } from "./interfaces";

const requestAddEmployee = async (
  body: CreateEmployeeDataType
): Promise<boolean> => {
  try {
    const req = await axios.post(
      "http://localhost:3000/auth/createEmployee",
      body
    );
    if (req.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      console.log(joiErrortoDetail(error));
    } else {
      console.log(`Gagal tambah schedule cinema baru \n ${error}`);
    }
    return false;
  }
};

export { requestAddEmployee };
