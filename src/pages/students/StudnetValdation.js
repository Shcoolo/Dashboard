import { date, number, object, string} from 'yup';

export const studentValidation = object(
  {
    phone_number: string().required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Enter a valid phone number, start with 09"),
    password: string().required("password is required")
      .min(8, "Password must be at least 8 characters"),
    first_name: string().required("first name is required"),
    last_name: string().required("last name is required"),
    father_name: string(),
    gender: string().required('Gender is required')
      .oneOf(["Male", "Female"], "Gender must be either Male or Female"), 
    address: string(),
    parent_phone: string(),
    student_class: number().required("Class is required"),
    section: number().required('Section is required'),
    data_of_birth: date(),
  }
);