import { useState } from 'react'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { PhoneAndroid, LockOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { loginSchema } from './LoginValdation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  }

   const { control, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(loginSchema),
      defaultValue: initalValue
    })

    const formSubmit = (data) => {
        console.log(data); 
    }

  return (
    <form onSubmit={handleSubmit(formSubmit)}>

      <Controller 
        name='phone'
        control={control}
        render={ ({field }) => (
          <TextField
            {...field}
            id="phone"
            placeholder='Phone Number'
            sx={{ mt:1, width: '100%'}}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroid />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            control={control}
          />
        )}
      />

      <Controller 
        name='password'
        control={control}
        render={ ({field}) => (
          <TextField
            {...field}
            id="password"
            placeholder='Password'
            type={showPassword? 'text' : 'password'}
            sx={{ mt:1, width: '100%'}}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutline  />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      { showPassword ? <VisibilityOff /> : <Visibility /> } 
                    </IconButton>
                  </InputAdornment>
                )
              },
            }}
            variant="outlined"
            control={control}
          />
        )}
      />

      <p>forget password!</p>

      <Button variant='contained' type="submit" sx={{width: "100%"}} >Login</Button>
    </form>
  )
}

const initalValue = {
  'phone': '',
  'password': ''
}

export default LoginForm