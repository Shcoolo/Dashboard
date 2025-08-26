import * as Yup from "yup";

export const teacherSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Phone number is required"),
  specialization: Yup.string().required("Specialization is required"),
  subjects_to_teach: Yup.array().of(
    Yup.object().shape({
      subject_id: Yup.number().required("Subject is required"),
      weekly_hours: Yup.number()
        .typeError("Weekly hours must be a number")
        .required("Weekly hours is required")
        .positive("Must be greater than 0"),
    })
  ),
});
