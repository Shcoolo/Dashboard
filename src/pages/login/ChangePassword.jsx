import { LockOutline, PhoneAndroid, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSendOTP } from '../../api/sendOTP';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';


const initialValues = {
  phone_number: '',
  password: ''
};

const ChangePassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, mutate } = useSendOTP();
      
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
   
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(object({
        phone_number: string().required("Phone number is required")
            .matches(/^[0-9]{10}$/, "Enter a valid phone number, start with 09")
        })),
    defaultValues: initialValues
  });
      
  const formSubmit = (data) => {
    mutate(data);
    console.log(data);
  };
      
  

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Enter A New Password'
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

      <Controller
          name='confirm password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              sx={{ mb: 2, mt:1, width: '100%' }}
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

      <Button variant='contained' type="submit" sx={{ width: "100%", mb:3 }}>
        {isLoading ? <CircularProgress color='white' size={'25px'}/> : "Set A New Password"}
      </Button>
    </form>
  )
}

export default ChangePassword