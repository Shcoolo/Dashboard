import { Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import { useTotalAvarage } from '../../hooks/useGrades'

const GradesTap = ({ studentId }) => {

    const totalAvarage = useTotalAvarage({student: studentId});

  return (
        <Card sx={{ p: 2, boxShadow: 2, borderRadius: 3 }}>

            {/* headers  */}
            <Typography variant="h5" gutterBottom>
                Avarages & Reports
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <CardContent p={1}>
                <Card sx={{width: '30%' , padding: 1, textAlign: 'center'}}>
                    <Typography variant="h3" gutterBottom>
                        Total Avarge
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                       { `${totalAvarage?.data?.overall_average?? 75}%` }
                    </Typography>
                </Card>
            </CardContent>

        
        </Card>
  )
}

export default GradesTap