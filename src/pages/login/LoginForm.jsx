import { useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { PhoneAndroid, LockOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { loginSchema } from './LoginValdation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '../../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const initialValues = {
  phone_number: '',
  password: ''
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, mutate, isSuccess } = useLogin();
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues
  });

  const formSubmit = (data) => {
    mutate(data);
    console.log(data);
  };


  // if(isSuccess){
  //   navigate('/')
  // }

  return (
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

      <Link to='/forget-password'
        style={{ textDecoration: 'none'}}>
        <p>Forget password?</p>
      </Link>

      <Button variant='contained' type="submit" sx={{ width: "100%" }}>
        {isLoading ? <CircularProgress color='white' size={'25px'}/> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
