import { bool, object, string } from "yup";
import { emailRegex } from "./regex";

export const ClientSchema = object().shape({
  name: string().required("This field is mandatory"),
  code: string().required("This field is mandatory"),
  color: string().required("This field is mandatory"),
  is_active: bool().required("This field is mandatory"),
  contact_name: string().required("This field is mandatory"),
  contact_email: string()
    .required("This field is mandatory")
    .matches(emailRegex, "Email is not valid"),
  contact_phone: string().required("This field is mandatory"),
});
