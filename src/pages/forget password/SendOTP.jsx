import { PhoneAndroid } from '@mui/icons-material'
import { Alert, Button, CircularProgress, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useSendOTP } from '../../hooks/useAuth';


const initialValues = {
  phone_number: '',
};

const SendOTP = ({setPhone, setOrder}) => {

     const { isPending, mutate, isSuccess, isError, error } = useSendOTP();
    
    
      const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(object({
            phone_number: string().required("Phone number is required")
                .matches(/^[0-9]{10}$/, "Enter a valid phone number, start with 09")
            })),
        defaultValues: initialValues
      });
    
      const formSubmit = (data) => {
        setPhone(data['phone_number']);
        mutate(data);
      };

      if(isSuccess){
        setOrder(2)
      }

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {isError && <Alert severity="error">{error}</Alert>}
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
            {isPending ? <CircularProgress color='white' size={'25px'}/> : "Send OTP Code"}
        </Button>
    </form>
  )
}

export default SendOTP