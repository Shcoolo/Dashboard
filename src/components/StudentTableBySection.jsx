import { Card, CardContent, Chip } from '@mui/material'
import React from 'react'
import TableComponent from './TableComponent'
import { useStudents } from '../hooks/useStudents'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { Cancel, CheckCircle } from '@mui/icons-material'
import { blue, pink } from '@mui/material/colors'

const StudentTableBySection = (sectionId) => {

    const {data: students, isPending } = useStudents({section: sectionId});

    const rows = students;
    const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'first_name', headerName: 'First Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'last_name', headerName: 'Last Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'gender', headerName: 'Gender', flex: 1, headerAlign: 'center', align: 'center',
        renderCell: (params) => {
        const isMale = params.value === "Male";
        return (
        <Chip 
            label={params.value} 
            color={isMale ? blue[500]:pink[500]} 
            variant="outlined"
            sx={{ fontWeight: "bold", px: 1.5 }}
        />
        );
    }
    },
    { field: 'student_class', headerName: 'Class', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'section', headerName: 'Section', flex: 1, headerAlign: 'center', align: 'center'},
    {
        field: "register_status",
        headerName: "Register Status",
        headerAlign: 'center',
        align: 'center',
        felx: 1,
        renderCell: (params) => {
        const status = params?.value === 'Accepted';
        return (
            <Chip
            icon={status?<CheckCircle />:<Cancel />}
            label={params.value}
            color={status?"success":"error"}
            variant="outlined"
            sx={{ mt: 1 }}
        />
        );
        },
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   type: "actions",
    //   width: 100,
    //   flex: 2,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<RemoveRedEyeOutlined sx={{color: 'white', border: '1px solid white', borderRadius: '50%', fontSize: 30, p: 0.5 }} />}
    //       label="Show Detials"
    //       onClick={() => navigate(`/student/${params.row.id}`)}
    //     />,
    //     <GridActionsCellItem
    //       icon={<Edit sx={{color: 'blue', border: '1px solid blue', borderRadius: '50%', fontSize: 30, p: 0.5 }}/>}
    //       label="Edit"
    //       onClick={() => handleEdit(params)}
    //     />,
    //     <GridActionsCellItem
    //       icon={<Delete sx={{ color: 'error.main', border:'1px solid', borderColor: 'error.main', borderRadius: '50%', fontSize: '30px', p:0.5 }} />}
    //       label="Delete"
    //       onClick={() => handleDelete(params)}
    //     />,
    //   ],
    // },
    ];

  return (
    <Card>
        <CardContent>

            <TableComponent 
                rows={rows}
                columns={columns}
                loading={isPending}
                showSearch={false}
            />
        </CardContent>
    </Card>
  )
}

export default StudentTableBySection