import { object, string} from 'yup';

export const loginSchema = object({
  phone: string().required("Phone number is required")
    .matches('/^[0-9]{10}$', "Enter a valid phone number, start with 09"),
  password: string().required("password is required"),
});