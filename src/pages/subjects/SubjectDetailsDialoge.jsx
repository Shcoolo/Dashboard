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
import { useClasses } from '../../hooks/useClasses';
import { useSections } from '../../hooks/useSections';

const SubjectDetailsDialoge = ({
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
    description: '',
    stream_type: '',
    is_active: true,
    section: '',
    pdf_files: [],
    default_weekly_lessons: '',
    class_obj: '',
  });


  const classes  = useClasses();
  const sections = useSections({ filter: formValues.stream_type });

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name || '',
        description: data.description || '',
        stream_type: data.stream_type || '',
        is_active: data.is_active ?? true,
        section: data.section ?? '',
        class_obj: data.class_obj ?? '',
        pdf_files: Array.isArray(data.pdf_files)
          ? data.pdf_files
          : data.pdf_file
          ? [data.pdf_file]
          : [],
        default_weekly_lessons: data.default_weekly_lessons ?? ''
      });
    } else {
      setFormValues({
        name: '',
        description: '',
        stream_type: '',
        is_active: true,
        section: '',
        pdf_files: [],
        default_weekly_lessons: ''
      });
    }
  }, [data, open]);

  const handleChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    handleChange('pdf_files', files);
  };

  const handleSubmit = () => {
    onConfirm(formValues);
  };

  /*
    name required
    desctiption nullable
    stream_type ( general , scientific), nullable
    is_active default false
    pdf_file nullable
    default_weekly_lessons nullable
    section required if no class
    class_obj required if no section
  
  */ 

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
          {/* subject name */}
          <Box sx={{width: '100%'}}>
            <Typography variant="subtitle1" gutterBottom>
              Subject Name*
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Subject name"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Box>

          {/* description  */}
          <Box my={1}>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Description"
              value={formValues.description}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={3}
            />
          </Box>

          {/* stream type */}
          <Box my={1}>
            <Typography variant="subtitle1" gutterBottom>
              Stream Type
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="stream-type-label"
                name="stream_type"
                value={formValues.stream_type}
                onChange={(e) => handleChange('stream_type', e.target.value)}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Scientific">Scientific</MenuItem>
                <MenuItem value="Literary">Literary</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
             {/* class  and sections*/}
          <Box sx={{display: 'flex', justifyContent: 'space-between', width: '550px' }}>
            {/* class  */}
            <Box m={1} sx={{width: '50%'}}>
              <Typography variant="subtitle1" gutterBottom>
                Class
              </Typography>
              <FormControl sx={{ width: "100%"}}>
                <Select
                  labelId="class-select-label"
                  id="class-select"
                  value={formValues.class_obj}
                  onChange={(e) => handleChange('class_obj', e.target.value)}
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
            <Box m={1} sx={{width: '50%'}}>
              <Typography variant="subtitle1" gutterBottom>
                Section
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

          <Box my={1}>
            <Typography variant="subtitle1" gutterBottom>
              Default Weekly Lessons
            </Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              placeholder="Enter default weekly lessons"
              value={formValues.default_weekly_lessons}
              onChange={(e) => handleChange('default_weekly_lessons', e.target.value === '' ? '' : Number(e.target.value))}
              inputProps={{ min: 1 }}
            />
          </Box>

          <Box my={1}>
            <Typography variant="subtitle1" gutterBottom>
              PDF Files
            </Typography>
            <TextField
              fullWidth
              type="file"
              onChange={handleFileChange}
              inputProps={{ 'aria-label': 'PDF files', accept: '.pdf', multiple: true }}
            />
            {Array.isArray(formValues.pdf_files) && formValues.pdf_files?.length > 0 && (
              <Box mt={0.5}>
                {formValues.pdf_files.map((file, idx) => (
                  <Typography key={idx} variant="caption" color="textSecondary" display="block">
                    Selected: {file.name || String(file)}
                  </Typography>
                ))}
              </Box>
            )}
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

SubjectDetailsDialoge.propTypes = {
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

export default SubjectDetailsDialoge;
