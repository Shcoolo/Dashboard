import { Search } from '@mui/icons-material'
import { Box, IconButton, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../theme';

const SearchTable = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{
        display: 'felx',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColro: 'transparent',
        border: '1px solid',
        borderColor: colors.primary[100],
        borderRadius: '30px',
        padding: '2px 2px 1px 10px',
        width: {xs: '50%', md: '30%'},
        marginBottom: '10px',
      }}>
        <IconButton>
          <Search  sx={{color: colors.primary[100] }} />   
        </IconButton>
        <input type="text" style={{
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          width: '80%',
          fontSize: '15px', 
          color: colors.primary[100],
          flexShrink: '1',
          flexGrow:'1'

        }}/>
      </Box>
  )
}

export default SearchTable