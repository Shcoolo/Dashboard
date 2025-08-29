import { Box, Stack } from '@mui/material'
import React from 'react'
import { TitleBar } from '../../components'
import { useNavigate } from 'react-router-dom'

const TeacherDetailsPage = () => {

    const navigate = useNavigate();

  return (
        <Box p={3} >
            <Stack spacing={3} >
    
                {/* Header */}
                <TitleBar title="Teacher Profile" 
                    button={'Back'}
                    buttonColor="white"
                    buttonType="outlined"
                    onClick={() => navigate('/teachers')}
                />

                
            </Stack>
        </Box>
  )
}

export default TeacherDetailsPage