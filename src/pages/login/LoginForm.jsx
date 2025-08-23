import { useState, useEffect } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Alert, Box } from '@mui/material';
import { PhoneAndroid, LockOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { loginSchema } from './LoginValdation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LinkTrans } from '../../components';

const initialValues = {
  phone_number: '',
  password: ''
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isPending, mutate, isSuccess, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues
  });

  const formSubmit = (data) => {
    setErrorMessage(''); 
    mutate(data);
  };

  const { user } = useSelector(state => state.auth);

  // Handle error
  useEffect(() => {
    if (isError && error) {
      const errorMsg = error?.response?.data?.detail || 
        error?.message || 
        'Login failed. Please check your credentials and try again.';

      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  }, [isError, error]);

  return (
    <Box>
      {/* Error Alert */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit(formSubmit)}>
        <Controller
          name='phone_number'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="tel"
              placeholder='Phone Number'
              sx={{ mt: 1, width: '100%' }}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroid />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              sx={{ mt: 1, width: '100%' }}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutline />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          )}
        />

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <LinkTrans to='/auth/forget-password' text="Forget Password" textAlign="right" />
        <LinkTrans to="/auth/confirm-account" text="Confirm the Account" textAlign="left" />  
      </div>

        <Button variant='contained' type="submit" sx={{ width: "100%" }}>
          {isPending ? <CircularProgress color='white' size={'25px'}/> : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
