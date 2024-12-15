import { object, string } from "yup";

export const SOWSchema = object().shape({
  kind: string().required("This field is mandatory"),
  phase_title: string().required("This field is mandatory"),
});
