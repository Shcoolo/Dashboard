import { date, number, object, string} from 'yup';

export const taskValidation = object(
  {
     subject: string().required('subject feild is rquired'),
      academic_year: string().required('year field is required'),
      academic_term: string().required('term feild is required'),
      exam_type: string().required('task type is required')
        .oneOf([ 'quiz', 'midterm', 'final', 'quiz', 'assignment']),
      exam_date: string().required('task date is required'),
      total_marks: number().required('total mark is required'),
      target_class: string().required('class feild is required')
    }
);