import { Box, Button, IconButton, Paper, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../theme';
import { DataGrid } from '@mui/x-data-grid';
import { CloudCircleSharp, Search } from '@mui/icons-material';
import SearchTable from './SearchTable';

const TableComponent = ({rows, columns, loading, showSearch = true, pagination = false}) => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      
      { showSearch && <SearchTable /> }

      <Paper elevation={2}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          // disableColumnResize
          disableColumnReorder
          hideFooterPagination={pagination}
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
