import { Box, Stack } from '@mui/material'
import React from 'react'
import { TitleBar } from '../../components'
import { Add } from '@mui/icons-material'

const TermsPage = () => {
  return (
    <Box p={3}>
        <Stack spaceing={3}>

        <TitleBar title="Academic Terms" button="Add Terms" buttonIcon={<Add />} buttonColor='info' />

        <Box>
            {/* terms as blocks              */}
        </Box>

        </Stack>
    </Box>
  )
}

export default TermsPage