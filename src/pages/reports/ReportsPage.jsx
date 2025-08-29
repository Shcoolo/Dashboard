import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  Divider,
  CircularProgress,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Download } from "@mui/icons-material";
import { TitleBar } from "../../components";
import { useStudents } from "../../hooks/useStudents";
import { useSubjects } from "../../hooks/useSubjects";
import { useSections } from "../../hooks/useSections";
import { finalSchema, sectionSchema, studentSchema } from "./reportValidation";
import { useGetReports } from "../../hooks/useReport";
// import { Download } from "lucide-react";

const ReportsPage = () => {

    // api 
    const students = useStudents('');
    const subjects = useSubjects('');
    const sections = useSections({filter: ''});

    const [formValues, setFormValues] = useState({
        student: '',
        subject: '',
        section_grades: '',
        section_avarage: '',
    });
    const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

   const { mutate: downloadReport, isLoading } = useGetReports();

    const handleSubmit = async (type) => {
        try {
            setErrors({});
            if (type === 'student') {
            await studentSchema.validate(formValues, { abortEarly: false });
            downloadReport({ filter: { student: formValues.student } });
            }
            if (type === 'section') {
            await sectionSchema.validate(formValues, { abortEarly: false });
            downloadReport({
                filter: { subject: formValues.subject, section: formValues.section_grades },
            });
            }
            if (type === 'final') {
            await finalSchema.validate(formValues, { abortEarly: false });
            downloadReport({ filter: { section: formValues.section_avarage } });
            }
        } catch (validationError) {
            if (validationError.inner) {
            const formErrors = {};
            validationError.inner.forEach((err) => {
                formErrors[err.path] = [err.message];
            });
            setErrors(formErrors);
            }
        }
    };


    const renderSelect = (field, label, object) => (
      <Box 
        sx={{
          flex: "1 1 30%", 
          minWidth: "150px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
        <FormControl sx={{ width: "100%"}}>
          <Select
            labelId={`${field}-select-label`}
            id={`${field}-select`}
            value={formValues[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={`Select ${label}`}
            sx={{fontFamily: 'Tajawal'}}
            displayEmpty
            error={Boolean(errors?.[field])}
            helperText={errors?.[field]?.[0] || ""}
          >
            {/* placeholder  */}
            <MenuItem value="">
              <em>Select {label}</em>
            </MenuItem>
  
            {object?.isLoading && (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
              </MenuItem>
            )}
  
            {object?.isError && (
              <MenuItem disabled>
                <Typography color="error">{object.error.message}</Typography>
              </MenuItem>
            )}
  
            {object?.data?.length === 0 && (
              <MenuItem disabled>No {label} available</MenuItem>
            )}
  
            {object?.data?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item?.name || `${item?.first_name} ${item?.last_name}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      </Box>
    );

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <TitleBar title="Reports" />

        <ReportSection title="Student Grades" onClick={() => handleSubmit('student')}>
            {renderSelect("student", 'Student', students)}
        </ReportSection>

        
        <ReportSection title="Section Subject Grades" onClick={() => handleSubmit('section')}>
            {renderSelect("subject", 'Subject', subjects)}
            {renderSelect("section_grades", 'Section', sections)}
        </ReportSection>


       <ReportSection title="Section Final Averages" onClick={() => handleSubmit('final')} >
            {renderSelect("section_avarage", 'Section', sections)}
        </ReportSection>

      </Stack>
    </Box>
  );
};

export default ReportsPage;

const ReportSection = ({ title, onClick,  children }) => {

//   const validationSchema = Yup.object(
//     fields.reduce((acc, f) => {
//       acc[f.name] = Yup.string().required(`${f.label} is required`);
//       return acc;
//     }, {})
//   );

//   const formik = useFormik({
//     initialValues: fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Requesting report with values:", values);
//       // call API for Excel export
//     },
//   });

 

  return (
    <Card elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
        }
      />
      <Divider />
      
      <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            
            {children}
            
 
            <Box sx={{flex: 2}} />

            <Button
              type="submit"
              variant="outlined"
              color="success"
              startIcon={<Download />}
              onClick={onClick}
            >
              Export Excel
            </Button>

          </Stack>
      </CardContent>
    </Card>
  );
};
