import { object, string } from "yup";
import { emailRegex } from "./regex";

export const TokenSchema = object().shape({
  name: string().required("This field is mandatory"),
  kind: string().required("This field is mandatory"),
  email: string()
    .required("This field is mandatory")
    .matches(emailRegex, "Email is not valid"),
  token: string().required("This field is mandatory"),
});
