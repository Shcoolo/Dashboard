import { useEffect, useState } from 'react';
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
  useTheme
} from '@mui/material';
import { Edit, Save, Close, CheckCircle } from '@mui/icons-material';
import { TitleBar } from '../../components';
import { tokens } from '../../theme';

const SchoolInfromation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isEditing, setIsEditing] = useState(false);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState('');

  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Schoolo High School',
    principal: 'John Doe',
    phone: '+963 999 999 999',
    email: 'info@schoolo.edu',
    website: 'https://schoolo.edu',
    address: 'Main St, City, Country',
    description: 'A modern learning environment focused on excellence.',
    registration_active: false,
    logo_file: null,
  });

  const [originalSchoolInfo, setOriginalSchoolInfo] = useState(schoolInfo);

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const handleChange = (field, value) => {
    setSchoolInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    const url = URL.createObjectURL(file);
    setLogoPreviewUrl(url);
    handleChange('logo_file', file);
  };

  const toggleEdit = () => {
    if (isEditing) return; // avoid losing edits mid-flight
    setOriginalSchoolInfo(schoolInfo);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSchoolInfo(originalSchoolInfo);
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: Integrate with API to persist changes
    setOriginalSchoolInfo(schoolInfo);
    setIsEditing(false);
  };

  const handleToggleRegistration = () => {
    // TODO: Integrate with API to toggle student registration acceptance for mobile app
    setSchoolInfo(prev => ({
      ...prev,
      registration_active: !prev.registration_active,
    }));
  };

  return (
    <Box p={3}>
      <TitleBar
        title="School Information"
        buttonIcon={<Edit />}
        button={isEditing ? 'Editing…' : 'Edit Info'}
        buttonColor='info'
        onClick={!isEditing ? toggleEdit : undefined}
      />

      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Avatar
                  src={logoPreviewUrl || ''}
                  sx={{ width: 120, height: 120, bgcolor: colors.primary[700], fontSize: 28 }}
                >
                  {schoolInfo.name?.slice(0, 2).toUpperCase()}
                </Avatar>
                <Button component="label" variant="outlined" disabled={!isEditing}>
                  Upload Logo
                  <input hidden accept="image/*" type="file" onChange={handleLogoChange} />
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="School Name"
                    value={schoolInfo.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Principal Name"
                    value={schoolInfo.principal}
                    onChange={(e) => handleChange('principal', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={schoolInfo.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={schoolInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    type="url"
                    value={schoolInfo.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={schoolInfo.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={schoolInfo.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    disabled={!isEditing}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircle color={schoolInfo.registration_active ? 'success' : 'disabled'} />
              <Typography fontWeight="bold">
                Student Registration (Mobile App)
              </Typography>
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  color="success"
                  checked={Boolean(schoolInfo.registration_active)}
                  onChange={handleToggleRegistration}
                  disabled={!isEditing}
                />
              }
              label={schoolInfo.registration_active ? 'Active' : 'Inactive'}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {isEditing ? (
              <>
                <Button startIcon={<Close />} onClick={handleCancel} disabled={false}>
                  Cancel
                </Button>
                <Button startIcon={<Save />} variant="contained" color="info" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default SchoolInfromation