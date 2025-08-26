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
  IconButton,
  MenuItem,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import PropTypes from "prop-types";
import { teacherSchema } from './teacherValidation';
import { useSubjects } from "../../hooks/useSubjects";

const TeacherDetailsDialoge = ({
  open,
  onClose,
  onConfirm,
  title,
  data = null,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmColor = "info",
  loading = false,
}) => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    specialization: "",
    subjects_to_teach: [],
  });
  const [errors, setErrors] = useState({});

  const subjects = useSubjects();


  useEffect(() => {
    if (data) {
      setFormValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone_number: data.phone_number || "",
        specialization: data.specialization || "",
        subjects_to_teach: data.subjects_to_teach || [],
      });
    } else {
      setFormValues({
        first_name: "",
        last_name: "",
        phone_number: "",
        specialization: "",
        subjects_to_teach: [],
      });
    }
  }, [data, open]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formValues.subjects_to_teach];
    newSubjects[index][field] = value;
    setFormValues((prev) => ({
      ...prev,
      subjects_to_teach: newSubjects,
    }));
  };

  const addSubject = () => {
    setFormValues((prev) => ({
      ...prev,
      subjects_to_teach: [...prev.subjects_to_teach, { subject_id: "", weekly_hours: "" }],
    }));
  };

  const removeSubject = (index) => {
    const newSubjects = [...formValues.subjects_to_teach];
    newSubjects.splice(index, 1);
    setFormValues((prev) => ({
      ...prev,
      subjects_to_teach: newSubjects,
    }));
  };

  const handleSubmit = async () => {
    try {
      await teacherSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      onConfirm(formValues);
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((err) => {
        if (err.path.includes("subjects_to_teach")) {
          const match = err.path.match(/\[(\d+)\]\.(.*)/);
          if (match) {
            const index = match[1];
            const field = match[2];
            newErrors[`subjects_to_teach_${index}_${field}`] = err.message;
          }
        } else {
          newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      {loading && <LinearProgress color="info" />}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* name  */}
          <Box sx={{display: 'flex' , gap: '10px'}}>
            {/* First Name */}
            <Box
              sx={{
                flex: "1 1 45%", 
                minWidth: "250px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                First Name
              </Typography>
            <TextField
              value={formValues.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              error={!!errors.first_name}
              helperText={errors.first_name}
              fullWidth
            />
            </Box>

            {/* Last Name */}
            <Box sx={{
                flex: "1 1 45%", 
                minWidth: "250px",
                display: "flex",
                flexDirection: "column",
              }}>
              <Typography variant="subtitle2" gutterBottom>
                Last Name
              </Typography>
              <TextField
                value={formValues.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                error={!!errors.last_name}
                helperText={errors.last_name}
                fullWidth
              />
            </Box>
          </Box>

          {/* Phone Number */}
          <Box sx={{dislpaly: 'flex'}}>
            <Typography variant="subtitle2" gutterBottom>
              Phone Number
            </Typography>
            <TextField
              value={formValues.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              error={!!errors.phone_number}
              helperText={errors.phone_number}
              fullWidth
            />
          </Box>
          {/* Specialization */}
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="subtitle2" gutterBottom>
              Specialization
            </Typography>
            <TextField
              value={formValues.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
              error={!!errors.specialization}
              helperText={errors.specialization}
              fullWidth
            />
          </Box>

          {/* Subjects */}
          <Box>
            <Typography variant="subtitle1">Subjects to Teach</Typography>
            {formValues.subjects_to_teach.map((subject, index) => (
              <Box key={index} display="flex" gap={1} alignItems="center" my={1}>

                <FormControl key={index} sx={{ width: "50%"}}>
                  {/* <InputLabel id="subject-select-label">Subject</InputLabel> */}
                  <Select
                    labelId="subject-select-label"
                    // label="Subject"
                    id="subject-select"
                    value={subject.subject_id}
                    onChange={(e) => handleSubjectChange(index, 'subject_id', e.target.value)}
                    helperText={errors[`subjects_to_teach_${index}_subject_id`]}
                    placeholder="Select Class"
                    sx={{fontFamily: 'Tajawal'}}
                    displayEmpty
                  >
                    {/* placeholder  */}
                    <MenuItem value="">
                      <em>Select Subject</em>
                    </MenuItem>
  
                    {subjects.isLoading && (
                      <MenuItem disabled>
                        <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                      </MenuItem>
                    )}
  
                    {subjects.isError && (
                      <MenuItem disabled>
                        <Typography color="error">{subjects.error.message}</Typography>
                      </MenuItem>
                    )}
  
                    {subjects?.data?.length === 0 && (
                      <MenuItem disabled>No subjects available</MenuItem>
                    )}
  
                    {subjects?.data?.map((item) => (
                      <MenuItem key={item.id} value={item.id} sx={{fontFamily: 'Tajawal'}}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

                <TextField
                  label="Weekly Hours"
                  type="number"
                  value={subject.weekly_hours}
                  onChange={(e) =>
                    handleSubjectChange(index, "weekly_hours", e.target.value)
                  }
                  error={!!errors[`subjects_to_teach_${index}_weekly_hours`]}
                  helperText={errors[`subjects_to_teach_${index}_weekly_hours`]}
                  fullWidth
                />
                <IconButton onClick={() => removeSubject(index)} color="error">
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<Add />}
              onClick={addSubject}
              variant="text"
              sx={{ mt: 1 }}
            >
              Add Subject
            </Button>
          </Box>
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

TeacherDetailsDialoge.propTypes = {
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
};

export default TeacherDetailsDialoge;
