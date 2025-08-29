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
  Box
} from "@mui/material";
import PropTypes from "prop-types";
import { adminSchema } from './adminValidation';

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
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone_number: data.phone_number || "",
        department: data.department || "",
      });
    } else {
      setFormValues({
        first_name: "",
        last_name: "",
        phone_number: "",
        department: "",
      });
    }
  }, [data, open]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      await adminSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      onConfirm(formValues);
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

          {/* Department */}
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="subtitle2" gutterBottom>
              Department
            </Typography>
            <TextField
              value={formValues.department}
              onChange={(e) => handleChange("department", e.target.value)}
              error={!!errors.department}
              helperText={errors.department}
              fullWidth
            />
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
