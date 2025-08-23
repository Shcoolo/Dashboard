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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';

const SectionDetailsDialoge = ({
  open,
  onClose,
  onConfirm,
  title,
  data = null,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmColor = "info",
  loading = false,
  classes
}) => {
  
    const [formValues, setFormValues] = useState({
    name: '',
    stream_type: '',
    capacity: '',
    class_id: null,
    is_active: true,
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name || '',
        stream_type: data.stream_type || '',
        capacity: data.capacity ?? '',
        is_active: data.is_active ?? true,
        class_id: data.class_id || '',
      });
    } else {
      setFormValues({
        name: '',
        stream_type: '',
        capacity: '',
        is_active: true,
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
          <Box sx={{width: '100%'}}>
            <Typography variant="subtitle1" gutterBottom>
              Section Name
            </Typography>
            <TextField
              sx={{ fontFamily: 'Tajawal' }}
              fullWidth
              variant="outlined"
              placeholder="Enter Section name"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Box>

          <Box my={1}>
            <Typography variant="subtitle1" gutterBottom>
              Stream Type
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="stream-type-label"
                // label="Stream Type"
                placeholder="Stream Type"
                value={formValues.stream_type}
                onChange={(e) => handleChange('stream_type', e.target.value)}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Scientific">Scientific</MenuItem>
                <MenuItem value="Literary">Literary</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'space-between', width: '500px' }}>
          {/* capacity */}
          <Box my={1} sx={{width: '47%'}}>
            <Typography variant="subtitle1" gutterBottom>
              Capacity
            </Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              placeholder="Enter Capacity"
              value={formValues.capacity}
              onChange={(e) => handleChange('capacity', e.target.value === '' ? '' : Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Box>
          {/* class  */}
          <Box my={1} sx={{width: '47%'}}>
             <Typography variant="subtitle1" gutterBottom>
              Class
            </Typography>
            <FormControl sx={{ width: "300px"}}>
              <Select
                labelId="class-select-label"
                id="class-select"
                value={formValues.class_id}
                onChange={(e) => handleChange('class_id', e.target.value)}
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
  
                {classes?.classes?.length === 0 && (
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

          </Box>

          <Box my={1}>
            <FormControlLabel
              control={
                <Switch
                  color="info"
                  checked={Boolean(formValues.is_active)}
                  onChange={(e) => handleChange('is_active', e.target.checked)}
                />
              }
              label="Is Active"
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
          type='submit'
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

SectionDetailsDialoge.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  data: PropTypes.object,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf(["primary", "error", "secondary", "success", "warning", "info"]),
  loading: PropTypes.bool,
  classes: PropTypes.object,
};

export default SectionDetailsDialoge;
