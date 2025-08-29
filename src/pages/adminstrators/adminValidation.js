import * as Yup from "yup";

export const adminSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Phone number is required"),
  department: Yup.string().required("Department is required"),
});
