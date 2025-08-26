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
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTeachersBySubject } from '../../hooks/useTeachers';
import { useSubjects } from '../../hooks/useSubjects';

const ScheduleDetailsDialoge = ({
  open,
  onClose,
  onConfirm,
  title,
  data = null,
  confirmText = "Save",
  cancelText = "Cancel",
  confirmColor = "info",
  loading = false,
  sectionId,
  day,
  slot
}) => {

  const [formValues, setFormValues] = useState({
    subject: '',
    section: sectionId || '',
    teacher: '',
    day_of_week: day?.id || '',
    time_slot: slot?.id || '',
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        subject: data.subject || '',
        section: sectionId,
        teacher: data.teacher || '',
        day_of_week: day?.id || '',
        time_slot: slot?.id || '',
      });
    } else {
      setFormValues({
        subject: '',
        section: sectionId || '',
        teacher: '',
        day_of_week: day?.id || '',
        time_slot: slot?.id || '',
      });
    }
  }, [data, day, sectionId, slot]);

  
  const subjects = useSubjects();
  const teachers = useTeachersBySubject({ subject: formValues.subject });


  const handleChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formValues)
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2, 
        }}
      > 
        {/* day  */}
        <Box sx={{width: '48%'}}>
          <Typography variant="subtitle1" gutterBottom>
            Day
          </Typography>
          <TextField
            fullWidth
            disabled
            variant="outlined"
            value={day?.name_ar||''}
            
          />
        </Box>

         {/* time slot  */}
        <Box sx={{width: '48%'}}>
          <Typography variant="subtitle1" gutterBottom>
            Time Slot
          </Typography>
          <TextField
            sx={{ fontFamily: 'Tajawal' }}
            fullWidth
            disabled
            variant="outlined"
            value={slot?.name||''}
          />
        </Box>

        {/* subjects  */}
        <Box sx={{width: '48%'}}>
            <Typography variant="subtitle1" gutterBottom>
            Subject
          </Typography>
          <FormControl  sx={{ width: "100%"}}>
            <Select
              labelId="subject-select-label"
              id="subject-select"
              value={formValues.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Select Subject"
              sx={{fontFamily: 'Tajawal'}}
              displayEmpty
            >
              {/* placeholder  */}
              <MenuItem value="">
                <em>Select Class</em>
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

              {subjects?.subjects?.length === 0 && (
                <MenuItem disabled>No subjects available</MenuItem>
              )}

              {subjects?.data?.map((subject) => (
                <MenuItem key={subject.id} value={subject.id} sx={{fontFamily: 'Tajawal'}}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

         {/* teachers  */}
        <Box sx={{width: '48%'}}>
          <Typography variant="subtitle1" gutterBottom>
          Teacher
        </Typography>
        <FormControl sx={{ width: "100%"}}>
          <Select
            labelId="teacher-select-label"
            id="teacher-select"
            value={formValues.teacher}
            onChange={(e) => handleChange('teacher', e.target.value)}
            placeholder="Teacher Class"
            sx={{fontFamily: 'Tajawal'}}
            displayEmpty
          >
            {/* placeholder  */}
            <MenuItem value="">
              <em>Select Teacher</em>
            </MenuItem>

            {teachers.isLoading && (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
              </MenuItem>
            )}

            {teachers.isError && (
              <MenuItem disabled>
                <Typography color="error">{teachers.error.message}</Typography>
              </MenuItem>
            )}

            {teachers?.teachers?.length === 0 && (
              <MenuItem disabled>No teachers available ... selete subject first</MenuItem>
            )}

            {teachers?.data?.map((item) => {
              const teacher = item?.teacher;
              return (
              <MenuItem key={teacher.user_id} value={teacher.user_id} sx={{fontFamily: 'Tajawal'}}>
                {teacher.full_name}
              </MenuItem>
            )})}
            </Select>
          </FormControl>
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

ScheduleDetailsDialoge.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  data: PropTypes.object,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf(["primary", "error", "secondary", "success", "warning", "info"]),
  loading: PropTypes.bool,
  sectionId: PropTypes.number,
  day: PropTypes.object,
  slot: PropTypes.object,
};

export default ScheduleDetailsDialoge;
