import React, { useState } from 'react'
import { TableComponent, TitleBar } from '../../components'
import { Box, Button, Chip, MenuItem, Select, Stack, Typography } from '@mui/material'
import FilterSction from './FilterSction'
import { useStudents } from '../../hooks/useStudents'
import { commitValueAfterInput } from '@testing-library/user-event/dist/cjs/document/trackValue.js'
import { DataGrid } from '@mui/x-data-grid'
import { useStoreAttendances } from '../../hooks/useAttendance'

const  AttendancePage = () => {

  const [filter , setFilter] = useState({
    section: '',
    date: ''
  });
  const [attendance, setAttendance] = useState({});

  // api 
  const students = useStudents({section: filter.section});
  const addAttendancesMutation = useStoreAttendances();


  const handleChangeAttendance = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = async () => {

    const payload = Object.entries(attendance)
      .filter(([_, status]) => status) 
      .map(([student_id, status]) => ({
        student_id: Number(student_id),
        status,
    }));

    addAttendancesMutation.mutate({
      section: filter.section, 
      date: filter.date, 
      payload 
    });
    if(addAttendancesMutation.isSuccess) {
      setAttendance({});
    }
  }


  const rows = filter.section?students.data:{};
  const columns = [
  { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
  { field: 'first_name', headerName: 'First Name', flex: 1, headerAlign: 'center', align: 'center'},
  { field: 'last_name', headerName: 'Last Name', flex: 1, headerAlign: 'center', align: 'center'},
  { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center'},
   {
    field: 'attendance',
    headerName: 'Attendance',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Select
          value={attendance[params.row.id] || ""}
          onChange={(e) => handleChangeAttendance(params.row.id, e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="present">Present</MenuItem>
          <MenuItem value="absent">Absent</MenuItem>
          <MenuItem value="late">Late</MenuItem>
          <MenuItem value="excused">Excused</MenuItem>
        </Select>
      );
    }
  }  
  ];
  
  return (
    <Box p={3}>
      <Stack spacing={3} >
        <TitleBar title="Attendence of Section" />

        {/* filter section  */}
          <FilterSction setFilter={setFilter}/>

        
        {/* table section  */}
        <TableComponent 
          rows={rows}
          columns={columns}
          showSearch={false}
        />


        {/* Submit button */}
        {filter.section && (
          <Box sx={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={Object.keys(attendance).length === 0}
              sx={{width: '30%'}}
            >
              Submit Attendance
            </Button>
          </Box>
        )}

        <Box sx={{height: '100px'}} />


      </Stack>
    </Box>
  )
}

export default AttendancePage