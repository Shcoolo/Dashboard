import React from 'react'
import { TitleBar } from '../../components'
import { Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const SectionDetailsPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const section_id = location.pathname.split('/').pop();
    console.log(section_id);
  return (
    <Box p={3}>
        <TitleBar title={"Section Detail"}
            button={'Back'}
            buttonType='outlined'
            buttonColor='white'
            onClick={() => navigate('/sections')}
        />
    </Box>
  )
}

export default SectionDetailsPage