import { useEffect, useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSubjects } from '../../hooks/useSubjects';
import { useTerms } from '../../hooks/useTerms';
import { useYears } from '../../hooks/useYears';
import { useClasses } from '../../hooks/useClasses'
import { taskValidation } from './TaskValdation';

const TaskDetailsDialoge = ({
  open,
  onClose,
  onConfirm,
  title,
  data = null,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmColor = "info",
  loading = false
}) => {
  
    const [formValues, setFormValues] = useState({
      subject: '',
      academic_year: '',
      academic_term: '',
      exam_type: '',
      exam_date: '',
      total_marks: 0,
      target_class: ''
  });

  useEffect(() => {
    if (data) {
      setFormValues({
       subject: data.subject || '',
        academic_year: data.academic_year || '',
        academic_term: data.academic_term || '',
        exam_type: data.exam_type || '',
        exam_date: data.exam_date || '',
        total_marks: data.total_marks || 0,
        target_class: data.target_class || ''
      });
    } else {
      setFormValues({
        subject: '',
        academic_year: '',
        academic_term: '',
        exam_type: '',
        exam_date: '',
        total_marks: '',
        target_class: ''
      });
    }
  }, [data, open]);

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
     try {
      setErrors({});
      const validatedData = await taskValidation.validate(formValues, { abortEarly: false });
      console.log(validatedData.exam_date);
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


  const subjects = useSubjects();
  const years = useYears();
  const terms = useTerms(formValues.academic_year);
  const classes = useClasses();

  const task_type = [
    { label: 'quiz', value: 'quiz' },
    { label: 'midterm', value: 'midterm'},
    { label: 'final', value: 'final'},
    { label: 'quiz', value: 'quiz' },
    { label: 'assignment', value: 'assignment'},
  ]
  
 
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

  const renderSelect = (field, label, object) => (
    <Box 
      sx={{
        flex: "1 1 45%", 
        minWidth: "250px",
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

          {object.isLoading && (
            <MenuItem disabled>
              <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
            </MenuItem>
          )}

          {object.isError && (
            <MenuItem disabled>
              <Typography color="error">{object.error.message}</Typography>
            </MenuItem>
          )}

          {object?.data?.length === 0 && (
            <MenuItem disabled>No {label} available</MenuItem>
          )}

          {object?.data?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
    </Box>
  );

  
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2, 
          }}
        >
          {/* subjects  */}
          {renderSelect('subject', 'Subject', subjects)}
          {/* exam_type */}
          {renderField('exam_type', 'Task Type', 'text', true, task_type)}
          {/* academic_year */}
          {renderSelect('academic_year', 'Year', years)}
          {/* academic_term */}
          {renderSelect('academic_term', 'Term', terms)}
          {/* total_marks */}
          {renderField('total_marks', 'Total Mark', 'number')}
          {/* target_class */}
           {renderSelect('target_class', 'Class', classes)}
          {/* exam_date */}
          {renderField('exam_date', 'Task Date', 'date')}

        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          autoFocus
          type="submit"
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

TaskDetailsDialoge.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  data: PropTypes.object,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf(["primary", "error", "secondary", "success", "warning", "info"]),
  loading: PropTypes.bool
};

export default TaskDetailsDialoge;
