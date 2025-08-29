import { object, string } from "yup";


/**
 * Validation schemas
 */
export const filterSchema = object({
  section: string().required('Section is Required To Filter'),
  date : string().required('Date is Required to Filter')
});