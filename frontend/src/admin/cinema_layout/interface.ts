import Joi from "joi";

interface RowSchemaForm {
  //   rowName: string;
  length: number;
}

interface LayoutGeneratorType {
  row: string;
  length: number;
  sequence: number[];
  //awalnya isinya 15
  //6 -> jalan sampai 6 -1
  //12 -> jalan dari 6 sampai 11
  //jalan dari 12 sampai
  //ctr < length
}

const rowFormSchema = Joi.object({
  length: Joi.number().required().min(10),
});
export { type RowSchemaForm, rowFormSchema, type LayoutGeneratorType };
