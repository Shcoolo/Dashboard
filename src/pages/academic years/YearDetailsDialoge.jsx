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

const YearDetailsDialoge = ({
  open,
  onClose,
  onConfirm,
  title = "Year Details",
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

  const handleSubmit = () => {
    onConfirm(formValues);
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
              Year Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter academic year name"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
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
              label="Set as Current Academic Year"
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

YearDetailsDialoge.propTypes = {
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

export default YearDetailsDialoge;
