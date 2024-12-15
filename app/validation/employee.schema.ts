import { object, string } from "yup";
import { emailRegex } from "./regex";

export const EmployeeSchema = object().shape({
  active: string().required("This field is mandatory"),
  email: string()
    .required("This field is mandatory")
    .matches(emailRegex, "Email is not valid"),
  personal_email: string()
    .required("This field is mandatory")
    .matches(emailRegex, "Email is not valid"),
  first_name: string().required("This field is mandatory"),
  phone_number: string().required("This field is mandatory"),
  birth_date: string().required("This field is mandatory"),
  contract_renewal_date: string().required("This field is mandatory"),
  role_id: string().required("This field is mandatory"),
  jira_account: string().required("This field is mandatory"),
  date_started: string().required("This field is mandatory"),
});
