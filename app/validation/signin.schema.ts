import { object, string } from "yup";

export const SignInSchema = object().shape({
  email: string()
    .email("Email is not valid!")
    .required("Email is required!")
    .defined("Email can't be empty!"),
  password: string()
    .required("Email or Password are not correct. Please try again.")
    .defined("Password can't be empty!"),
});
