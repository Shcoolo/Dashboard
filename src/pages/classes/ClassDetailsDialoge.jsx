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
  Box
} from '@mui/material';
import PropTypes from 'prop-types';

const ClassDetailsDialoge = ({
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
    name: '',
    description: ''
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name || '',
        description: data.description || ''
      });
    } else {
      setFormValues({
        name: '',
        description: '',
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
        <Box>
          <Box sx={{widht: '100%'}}>
            <Typography variant="subtitle1" gutterBottom>
              Class Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Class name"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Box>

          <Box my={1}>
            <Typography variant="subtitle1" gutterBottom>
            Description Class
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
               placeholder="Enter Description name"
              value={formValues.description}
              onChange={(e) => handleChange('description', e.target.value)}
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

ClassDetailsDialoge.propTypes = {
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

export default ClassDetailsDialoge;
