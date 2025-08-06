import { Box, Button, IconButton, Paper, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../theme';
import { DataGrid } from '@mui/x-data-grid';
import { CloudCircleSharp, Search } from '@mui/icons-material';

const TableComponent = ({rows, columns}) => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
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

      <Paper elevation={2}>
        <DataGrid
          rows={rows}
          columns={columns}
          // loading
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnReorder
          sx={{
              backgroundColor: 'background.paper',
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: theme.palette.mode === 'dark'? colors.grey[800] : '#eee',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
              }
            }}
        />
      </Paper>
  </Box>
  )
}

export default TableComponent
