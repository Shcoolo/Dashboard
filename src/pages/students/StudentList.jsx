import { Box, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { TableComponent, TitleBar } from "../../components";
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";

export default function StudentList() {
  const handleDelete = (id) => {
    console.error(`Delete item with ID ${id}?`);
  };

  const handleEdit = (id) => {
    console.log(`Edit item with ID ${id}`)
  };

  const rows = [
    { id: 1, name: 'Ali', age: 23 },
    { id: 2, name: 'Ali', age: 23 },
    { id: 3, name: 'Ali', age: 23 },
    { id: 4, name: 'Ali', age: 23 },
    { id: 5, name: 'Ali', age: 23 },
    { id: 6, name: 'Ali', age: 23 },
    { id: 7, name: 'Ali', age: 23 },
    { id: 8, name: 'Ali', age: 23 },
  ];

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: 'Name', width: 200, flex: 1 , headerAlign: 'center', align: 'center'},
    { field: 'age', headerName: 'Age', type: 'number', width: 150, headerAlign: 'center', align: 'center'},
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      flex: 2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit sx={{color: 'blue', border: '1px solid blue', borderRadius: '50%', fontSize: 30, p: 0.5 }}/>}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete sx={{ color: 'error.main', border:'1px solid', borderColor: 'error.main', borderRadius: '50%', fontSize: '30px', p:0.5 }} />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
];


 
  return (
    <Box p={3}>
      <Stack spacing={3}>
        <TitleBar 
          title="Students Management"
          buttonIcon={<Add />}
          button={"Add Student" } 
          buttonColor='info'
        />


        <TableComponent 
          rows={rows}
          columns={columns}
        />
      </Stack>
    </Box>
);
}
