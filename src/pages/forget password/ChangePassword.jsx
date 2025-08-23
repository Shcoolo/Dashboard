import { LockOutline, Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';
import { useSetPassword } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const initialValues = {
  new_password: '',
  confirm_password: ''
};

const ChangePassword = ({setOrder, phone_number}) => {

  const [showPassword, setShowPassword] = useState(false);
  const { isPending, mutate, isSuccess, isError, error } = useSetPassword();
  const navigate = useNavigate();
      
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
   
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(object({
      new_password: string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: string()
        .required("Password Confirmation is required")
        .oneOf([ref("new_password")], "The Confirm Password does not match the password")  
    })),
    defaultValues: initialValues
  });
      
  const formSubmit = (data) => {
    data = {...data, phone_number: phone_number}
    mutate(data);
  };

  if(isSuccess){
    setOrder(1);
    navigate('/');
  }
      
  

  return (
    <form onSubmit={handleSubmit(formSubmit)}>

      { isError && <Alert severity='error'>{error}</Alert> }

        <Controller
          name='new_password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Enter A New Password'
              type={showPassword ? 'text' : 'password'}
              sx={{ mt: 1, width: '100%' }}
              error={!!errors.new_password}
              helperText={errors.new_password?.message}
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

      <Controller
          name='confirm_password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              sx={{ mb: 2, mt:1, width: '100%' }}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
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

      <Button variant='contained' type="submit" sx={{ width: "100%", mb:3 }}>
        {isPending ? <CircularProgress color='white' size={'25px'}/> : "Set A New Password"}
      </Button>
    </form>
  )
}

export default ChangePassword