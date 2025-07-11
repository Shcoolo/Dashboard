import { PhoneAndroid } from '@mui/icons-material'
import { Button, CircularProgress, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSendOTP } from '../../api/sendOTP';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';


const initialValues = {
  phone_number: '',
};

const SendOTP = () => {

     const { isLoading, mutate, isSuccess } = useSendOTP();
      const navigate = useNavigate();
    
    
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
    
    
      if(isSuccess){
        navigate('/')
      }

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
                    sx={{ my: 2, width: '100%' }}
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

        <Button variant='contained' type="submit" sx={{ width: "100%", mb:1 }}>
            {isLoading ? <CircularProgress color='white' size={'25px'}/> : "Send OTP Code"}
        </Button>
    </form>
  )
}

export default SendOTP