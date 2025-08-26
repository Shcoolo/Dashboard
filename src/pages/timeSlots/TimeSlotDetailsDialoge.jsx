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
  LinearProgress,
  Box,
  FormControlLabel,
  Switch,
  MenuItem
} from '@mui/material';
import PropTypes from 'prop-types';

const TimeSlotDetailsDialoge = ({
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
  
  // varibles 
  const [formValues, setFormValues] = useState({
    name: '',
    slot_number: '',
    start_time: '',
    end_time: '',
    is_break: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name || '',
        slot_number: data.slot_number || '',
        start_time: data.start_time || '',
        end_time: data.end_time || '',
        is_break: data.is_break,
      });
    } else {
      setFormValues({
        name: '',
        slot_number: '',
        start_time: '',
        end_time: '',
        is_break: false,
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
          {renderField("name", "Name")}
          {renderField("slot_number", "Slot Order", "number")}
          {renderField("start_time", "Start Time", "time")}
          {renderField("end_time", "End Time", "time")}
          
          <Box my={1}>
            <FormControlLabel
              control={
                <Switch
                  color="info"
                  checked={Boolean(formValues.is_break)}
                  onChange={(e) => handleChange('is_break', e.target.checked)}
                />
              }
              label="Is Break"
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

TimeSlotDetailsDialoge.propTypes = {
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

export default TimeSlotDetailsDialoge;
