import { object, string } from "yup";

export const EpicSchema = object().shape({
  key: string().required("Title is required!").defined("Title can't be empty!"),
  title: string()
    .required("Display as can't be empty!")
    .defined("Display can't be empty!"),
  description: string()
    .required("Description can't be empty!")
    .defined("Display can't be empty!"),
});
