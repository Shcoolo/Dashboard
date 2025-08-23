import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Paper,
  Chip,
  Divider,
  Skeleton,
  Alert,
  IconButton,
  Button
} from '@mui/material';
import {
  Person,
  Phone,
  CalendarToday,
  AdminPanelSettings,
  VerifiedUser,
  Edit,
  ArrowBack,
  Error
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../../hooks/useUserProfile';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userProfile, loading, error, refetch } = useUserProfile();

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDisplayName = () => {
    if (!userProfile) return 'User';
    const fullName = userProfile.get_full_name || `${userProfile.first_name} ${userProfile.last_name}`.trim();
    return fullName || 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="circular" width={80} height={80} />
          <Box sx={{ ml: 2 }}>
            <Skeleton width={200} height={32} />
            <Skeleton width={150} height={24} />
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
      </Box>

      {userProfile && (
        <>
          {/* Profile Header Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mr: 3
                  }}
                >
                  {getInitials()}
                </Avatar>
                
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                    {getDisplayName()}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    User ID: {userProfile.id}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {userProfile.is_active && (
                      <Chip 
                        label="Active Account" 
                        color="success" 
                        icon={<VerifiedUser />}
                      />
                    )}
                    {userProfile.is_staff && (
                      <Chip 
                        label="Staff Member" 
                        color="primary" 
                        icon={<AdminPanelSettings />}
                      />
                    )}
                    {userProfile.is_superuser && (
                      <Chip 
                        label="Super User" 
                        color="warning" 
                        icon={<AdminPanelSettings />}
                      />
                    )}
                    {userProfile.is_phone_verified && (
                      <Chip 
                        label="Phone Verified" 
                        color="info" 
                        icon={<VerifiedUser />}
                      />
                    )}
                  </Box>
                </Box>
                
                <IconButton sx={{ ml: 'auto' }}>
                  <Edit />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Box sx={{ flexGrow: 1}}>
              <Paper sx={{ p: 3, height: '100%'}}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  Personal Information
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ space: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      First Name
                    </Typography>
                    <Typography variant="body1">
                      {userProfile.first_name || 'Not provided'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Name
                    </Typography>
                    <Typography variant="body1">
                      {userProfile.last_name || 'Not provided'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1">
                      {userProfile.get_full_name || 'Not provided'}
                    </Typography>
                  </Box>
                  
                  {userProfile.role_info && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Role
                      </Typography>
                      <Typography variant="body1">
                        {userProfile.role_info}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>

            {/* Contact & Account Information */}
            <Box sx={{flexGrow: 1}}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1 }} />
                  Contact & Account
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ space: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1">
                      {userProfile.phone_number || 'Not provided'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Login
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(userProfile.last_login)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Account Status
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                      <Chip 
                        label={userProfile.is_active ? 'Active' : 'Inactive'} 
                        color={userProfile.is_active ? 'success' : 'error'} 
                        size="small"
                      />
                      <Chip 
                        label={userProfile.is_phone_verified ? 'Phone Verified' : 'Phone Not Verified'} 
                        color={userProfile.is_phone_verified ? 'success' : 'warning'} 
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Permissions
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                      {userProfile.is_staff && (
                        <Chip label="Staff" color="primary" size="small" />
                      )}
                      {userProfile.is_superuser && (
                        <Chip label="Super User" color="warning" size="small" />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
