import React, { useRef, useState } from 'react';
import { Box, TextField, Typography, Stack } from '@mui/material';

const OTPInput = () => {

  const otpLength = 5;
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return; // validate just number

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otpLength - 1) {
            inputsRef.current[index + 1].focus();
        }

        if (newOtp.every((digit) => digit !== '')) {
            handleSubmit(newOtp.join(''));
        }
    };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (code) => {
    console.log('OTP Code Submitted:', code);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      
      <Stack direction="row" spacing={2}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: 24 },
            }}
            type="text"
            variant="outlined"
            sx={{ width: 56 }}
          />
        ))}
      </Stack>

      <Typography variant="h6" gutterBottom sx={{color: 'blue', my:3}}>
        Enter the 5-digit verification code
      </Typography>
    </Box>
  );
}

export default OTPInput;