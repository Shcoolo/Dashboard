import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  LinearProgress,
  Box,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { useClasses } from "../../hooks/useClasses";
import { useSections } from "../../hooks/useSections";
import { studentValidation } from "./StudnetValdation";

const StudentDetailsDialoge = ({
  open,
  onClose,
  onConfirm,
  title,
  data = null,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmColor = "info",
  loading = false,
  backendErrors = {},
}) => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    phone_number: "",
    parent_phone: "",
    password: "",
    gender: "",
    address: "",
    student_class: "",
    section: "",
    date_of_birth: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const classes  = useClasses();
  const sections = useSections({ classId: formValues.student_class });
  

  useEffect(() => {
    if (data) {
      setFormValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        father_name: data.father_name || "",
        phone_number: data.phone_number || "",
        parent_phone: data.parent_phone || "",
        password: data.password || "",
        gender: data.gender || "",
        address: data.address || "",
        student_class: data.student_class || "",
        section: data.section || "",
        date_of_birth: data.date_of_birth || "",
        image: data.image || null,
      });
    }
  }, [data, open]);

  // useEffect(() => {
  //   setErrors(backendErrors);
  //   console.log(backendErrors);
  // }, [backendErrors]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: null, 
    }));
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      const validatedData = await studentValidation.validate(formValues, { abortEarly: false });
      onConfirm(validatedData);

    } catch (validationError) {
      if (validationError.inner) {
        const formErrors = {};
        validationError.inner.forEach((err) => {
          formErrors[err.path] = [err.message]; // using array to match your helperText logic
        });
        setErrors(formErrors);
      }
    }
  };


  const renderField = (field, label, type = "text", select = false, options = []) => (
    <Box
      sx={{
        flex: "1 1 45%", 
        minWidth: "250px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <TextField
        type={type}
        select={select}
        fullWidth
        value={formValues[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        error={Boolean(errors?.[field])}
        helperText={errors?.[field]?.[0] || ""}
      >
        {select &&
          options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );


  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      maxWidth="md"
      fullWidth
    >
      {loading && <LinearProgress color="info" />}
      <DialogTitle>{title}</DialogTitle>

    <DialogContent dividers>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2, 
        }}
      >
        {renderField("first_name", "First Name*")}
        {renderField("last_name", "Last Name*")}
        {renderField("father_name", "Father Name")}
        {renderField("phone_number", "Phone Number*")}
        {renderField("parent_phone", "Parent Phone")}
        {renderField("password", "Password*", "password")}
        {renderField("gender", "Gender*", "text", true, [
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ])}
        {renderField("address", "Address")}
        
        {/* class  and sections*/}
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {/* class  */}
            <Box my={1} mr={1} sx={{width: '50%'}}>
              <Typography variant="subtitle1" gutterBottom>
                Class*
              </Typography>
              <FormControl sx={{ width: "100%"}}>
                <Select
                  labelId="class-select-label"
                  id="class-select"
                  value={formValues.student_class}
                  onChange={(e) => handleChange('student_class', e.target.value)}
                  placeholder="Select Class"
                  sx={{fontFamily: 'Tajawal'}}
                  displayEmpty
                >
                  {/* placeholder  */}
                  <MenuItem value="">
                    <em>Select Class</em>
                  </MenuItem>

                  {classes.isLoading && (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                    </MenuItem>
                  )}

                  {classes.isError && (
                    <MenuItem disabled>
                      <Typography color="error">{classes.error.message}</Typography>
                    </MenuItem>
                  )}

                  {classes?.data?.length === 0 && (
                    <MenuItem disabled>No classes available</MenuItem>
                  )}

                  {classes?.data?.map((classItem) => (
                    <MenuItem key={classItem.id} value={classItem.id} sx={{fontFamily: 'Tajawal'}}>
                      {classItem.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            </Box>

            {/* section  */}
            <Box my={1} ml={1} sx={{width: '50%'}}>
              <Typography variant="subtitle1" gutterBottom>
                Section*
              </Typography>
              <FormControl sx={{ width: "100%"}}>
                <Select
                  labelId="section-select-label"
                  id="section-select"
                  value={formValues.section}
                  onChange={(e) => handleChange('section', e.target.value)}
                  placeholder="Select Section"
                  sx={{fontFamily: 'Tajawal'}}
                  displayEmpty
                >
                  {/* placeholder  */}
                  <MenuItem value="">
                    <em>Select Section</em>
                  </MenuItem>

                  {sections.isLoading && (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                    </MenuItem>
                  )}

                  {sections.isError && (
                    <MenuItem disabled>
                      <Typography color="error">{sections.error.message}</Typography>
                    </MenuItem>
                  )}

                  {sections?.data?.length === 0 && (
                    <MenuItem disabled>No Sections available</MenuItem>
                  )}
      
                  {sections?.data?.map((section) => (
                    <MenuItem key={section.id} value={section.id} sx={{fontFamily: 'Tajawal'}}>
                      {section.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            </Box>
        </Box>

        {renderField("date_of_birth", "Date of Birth", "date")}
      </Box>
    </DialogContent>


      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          autoFocus
          onClick={handleSubmit}
          color={confirmColor}
          variant="contained"
          disabled={loading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

StudentDetailsDialoge.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  data: PropTypes.object,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf([
    "primary",
    "error",
    "secondary",
    "success",
    "warning",
    "info",
  ]),
  loading: PropTypes.bool,
  backendErrors: PropTypes.object,
};

export default StudentDetailsDialoge;
