import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  Skeleton,
  Alert
} from '@mui/material';
import {
  AccountCircle,
  Logout,
  Person,
  Phone,
  Email,
  CalendarToday,
  AdminPanelSettings,
  VerifiedUser,
  Error
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../../hooks/useUserProfile';
import { useLogout } from '../../hooks/useAuth';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, loading, error } = useUserProfile();
  const logoutFetch = useLogout();

   const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleClose();
    logoutFetch.mutate();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircle sx={{ fontSize: 32 }} />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 320,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Header */}
        <Box sx={{ p: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {getInitials()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              {loading ? (
                <Skeleton width="60%" height={24} />
              ) : (
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {getDisplayName()}
                </Typography>
              )}
              {loading ? (
                <Skeleton width="40%" height={20} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {userProfile?.phone_number || 'No phone number'}
                </Typography>
              )}
            </Box>
          </Box>
          
          {/* Status Chips */}
          {!loading && userProfile && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {userProfile.is_active && (
                <Chip 
                  label="Active" 
                  size="small" 
                  color="success" 
                  variant="outlined"
                  icon={<VerifiedUser />}
                />
              )}
              {userProfile.is_staff && (
                <Chip 
                  label="Staff" 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  icon={<AdminPanelSettings />}
                />
              )}
              {userProfile.is_superuser && (
                <Chip 
                  label="Super User" 
                  size="small" 
                  color="warning" 
                  variant="outlined"
                  icon={<AdminPanelSettings />}
                />
              )}
            </Box>
          )}
        </Box>

        <Divider />

        {/* Error Display */}
        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error" icon={<Error />} sx={{ fontSize: '0.875rem' }}>
              {error}
            </Alert>
          </Box>
        )}

        {/* User Details */}
        {!loading && userProfile && (
          <Box sx={{ p: 2, pt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Account Details
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {userProfile.phone_number || 'No phone number'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                Last login: {formatDate(userProfile.last_login)}
              </Typography>
            </Box>
            
            {userProfile.role_info && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Role: {userProfile.role_info}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        <Divider />

        {/* Menu Actions */}
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AccountMenu;
