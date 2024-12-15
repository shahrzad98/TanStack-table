import { bool, object, string } from "yup";

// import { object, string } from "yup";
//
// export const ProjectSchema = object().shape({
//   name: string().required("Name is required!").defined("Name can't be empty!"),
//   schedule_b_url: string()
//     .nullable()
//     .notRequired()
//     .url("URL is not valid!")
//     .transform((value) => (!!value ? value : null)),
//   time_tracker: string()
//     .required("Time Tracker is required!")
//     .defined("Select at least one Time Tracker!"),
// });

export const ProjectSchema = object().shape({
  name: string().required("This field is mandatory"),
  code: string().required("This field is mandatory"),
  status: string().required("This field is mandatory"),
});
