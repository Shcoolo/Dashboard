import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Stack,
  Grid,
  TextField,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  Divider,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { Edit, Save, Close, CheckCircle } from '@mui/icons-material';
import { TitleBar } from '../../components';
import { tokens } from '../../theme';
import { useGetSchoolInfo, useUpdateSection } from '../../hooks/useScoolProfile';

const TYPE_OPTIONS = ['Primary', 'Secondary', 'High School', 'College', 'Institute'];
const STATUS_OPTIONS = ['Public', 'Private', 'Charter', 'International'];

const SchoolInformation = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Queries & Mutations
  const { data: schoolInfo, isSuccess, isLoading, isError } = useGetSchoolInfo();
  const { mutate: updateSchool, isLoading: isSaving } = useUpdateSection();

  // Local state
  const [isEditing, setIsEditing] = useState(false);
  const [localSchoolInfo, setLocalSchoolInfo] = useState(null);
  const [originalSchoolInfo, setOriginalSchoolInfo] = useState(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState('');
  const [toast, setToast] = useState({ open: false, type: 'success', msg: '' });

  // Initialize local state from API
  useEffect(() => {
    if (isSuccess && schoolInfo) {
      setLocalSchoolInfo(schoolInfo);
      setOriginalSchoolInfo(schoolInfo);
      if (schoolInfo.school_logo) {
        setLogoPreviewUrl(schoolInfo.school_logo);
      } else {
        setLogoPreviewUrl('');
      }
    }
  }, [isSuccess, schoolInfo]);

  // Cleanup object URL if used
  useEffect(() => {
    return () => {
      if (logoPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const handleChange = (field, value) => {
    setLocalSchoolInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (logoPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(logoPreviewUrl);
    const url = URL.createObjectURL(file);
    setLogoPreviewUrl(url);
    handleChange('school_logo', file);
  };

  const toggleEdit = () => {
    if (isEditing) return;
    setOriginalSchoolInfo(localSchoolInfo);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setLocalSchoolInfo(originalSchoolInfo);
    setIsEditing(false);
    if (!originalSchoolInfo?.school_logo && logoPreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(logoPreviewUrl);
      setLogoPreviewUrl('');
    }
  };

  const payload = useMemo(() => {
    return localSchoolInfo ?? {};
  }, [localSchoolInfo]);

  const handleSave = () => {
    if (!localSchoolInfo) return;

    updateSchool(payload, {
      onSuccess: () => {
        setOriginalSchoolInfo(localSchoolInfo);
        setIsEditing(false);
        // setToast({ open: true, type: 'success', msg: 'Saved successfully.' });
      },
      onError: (err) => {
        console.error('Failed to update school info:', err);
        // setToast({
        //   open: true,
        //   type: 'error',
        //   msg: err?.response?.data?.message || 'Save failed. Please try again.',
        // });
      },
    });
  };

  const handleToggleRegistration = () => {
    if (!isEditing) return;
    setLocalSchoolInfo(prev => ({
      ...prev,
      is_registration_open: !prev.is_registration_open,
    }));
  };

  if (isLoading && !localSchoolInfo) {
    return (
      <Box p={3} display="flex" alignItems="center" gap={1}>
        <CircularProgress size={22} />
        <Typography>Loading school information…</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">Failed to load school information.</Alert>
      </Box>
    );
  }

  if (!localSchoolInfo) return null;

  return (
    <Box p={3}>
      <TitleBar
        title="School Information"
        buttonIcon={<Edit />}
        button={isEditing ? 'Editing…' : 'Edit Info'}
        buttonColor="info"
        onClick={!isEditing ? toggleEdit : undefined}
      />

      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            {/* Logo */}
            <Grid item xs={12} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Avatar
                  src={logoPreviewUrl || ''}
                  sx={{ width: 120, height: 120, bgcolor: colors.primary[700], fontSize: 28 }}
                >
                  {localSchoolInfo.school_name?.slice(0, 2)?.toUpperCase() || 'SC'}
                </Avatar>
                <Button component="label" variant="outlined" disabled={!isEditing}>
                  Upload Logo
                  <input hidden accept="image/*" type="file" onChange={handleLogoChange} />
                </Button>
              </Stack>
            </Grid>

            {/* Form fields */}
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="School Name"
                    value={localSchoolInfo.school_name || ''}
                    onChange={(e) => handleChange('school_name', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={localSchoolInfo.school_phone || ''}
                    onChange={(e) => handleChange('school_phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={localSchoolInfo.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={localSchoolInfo.address || ''}
                    onChange={(e) => handleChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* NEW: School Type */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel id="school-type-label">School Type</InputLabel>
                    <Select
                      labelId="school-type-label"
                      label="School Type"
                      value={localSchoolInfo.school_type || ''}
                      onChange={(e) => handleChange('school_type', e.target.value)}
                    >
                      {TYPE_OPTIONS.map(t => (
                        <MenuItem key={t} value={t}>{t}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* NEW: School Status */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel id="school-status-label">School Status</InputLabel>
                    <Select
                      labelId="school-status-label"
                      label="School Status"
                      value={localSchoolInfo.school_status || ''}
                      onChange={(e) => handleChange('school_status', e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          {/* Registration toggle */}
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircle color={localSchoolInfo.is_registration_open ? 'success' : 'disabled'} />
              <Typography fontWeight="bold">
                Student Registration (Mobile App)
              </Typography>
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  color="success"
                  checked={Boolean(localSchoolInfo.is_registration_open)}
                  onChange={handleToggleRegistration}
                  disabled={!isEditing}
                />
              }
              label={localSchoolInfo.is_registration_open ? 'Active' : 'Inactive'}
            />
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {isEditing ? (
              <>
                <Button startIcon={<Close />} onClick={handleCancel} disabled={isSaving}>
                  Cancel
                </Button>
                <Button
                  startIcon={<Save />}
                  variant="contained"
                  color="info"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : null}
          </Stack>
        </Stack>
      </Paper>

      {/* Toasts */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
          severity={toast.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SchoolInformation;
