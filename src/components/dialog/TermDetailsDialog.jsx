import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  LinearProgress
} from '@mui/material';
import PropTypes from 'prop-types';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  start_date: yup.string().required('Start date is required'),
  end_date: yup
    .string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function (value) {
      const { start_date } = this.parent;
      return !start_date || !value || value > start_date;
    }),
});

const TermDetailsDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Term Details",
  data = null,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmColor = "info",
  loading = false
}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    start_date: '',
    end_date: '',
    is_current: false
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name || '',
        start_date: data.start_date || '',
        end_date: data.end_date || '',
        is_current: data.is_current || false
      });
    } else {
      setFormValues({
        name: '',
        start_date: '',
        end_date: '',
        is_current: false
      });
    }
  }, [data, open]);

  const handleChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});
      onConfirm(formValues);
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach(e => {
          errors[e.path] = e.message;
        });
        setFormErrors(errors);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Term Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter term name"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Start Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              value={formValues.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
              error={!!formErrors.start_date}
              helperText={formErrors.start_date}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              End Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              value={formValues.end_date}
              onChange={(e) => handleChange('end_date', e.target.value)}
              error={!!formErrors.end_date}
              helperText={formErrors.end_date}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.is_current}
                  onChange={(e) => handleChange('is_current', e.target.checked)}
                  color="success"
                />
              }
              label="Set as Current Term"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
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

TermDetailsDialog.propTypes = {
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

export default TermDetailsDialog; 