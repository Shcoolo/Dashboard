import { object, string} from 'yup';


export const studentSchema = object({
        student: string().required('student is required')
    }
)

export const sectionSchema = object({
    subject: string().required('subject is required'),
    section_grades: string().required('section is required')
})

export const finalSchema = object({
    section_avarage: string().required('section is required')
})
