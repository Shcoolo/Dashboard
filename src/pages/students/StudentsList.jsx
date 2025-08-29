import { Box, Chip, Stack } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Cancel, CheckCircle, Delete, Edit, RemoveRedEyeOutlined, Search } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddStudent, useStudents, useDeleteStudent, useUpdateStudent } from "../../hooks/useStudents";
import { useState } from "react";
import StudentDetailsDialoge from "./StudentDetailsDialoge";
import StudentsAnalytics from "./StudentAlalysis";
import { useNavigate } from "react-router-dom";
import { blue, pink } from "@mui/material/colors";

export default function StudentsList() {

  
  const { data: students, isLoading, isError, error } = useStudents('');
  const addStudentMutation = useAddStudent();
  const deleteStudentMutation = useDeleteStudent();
  const editStudentMutation = useUpdateStudent();
  const inisialDialogConfig = {
    open: false,
    onConfirm: () => {},
    title: "Confirm Message",
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmColor: "primary",
    loading: false,
  };
  const insialDialogDetails = {
    open: false,
    onConfirm: () => {},
    title: "Student Academic",
    data: {},
    confirmText: "Submit",
    cancelText: "Cancel",
    confirmColor: "primary",
    loading: false,
    error: null,
  }

  const closeDialoge = () => {
    setDialogeConfig({inisialDialogConfig, onClose: closeDialoge });
    setDetailsDialogeConfig({insialDialogDetails, onClose: closeDialoge });
  };

  const [dialogeConfig, setDialogeConfig] = useState({ ...inisialDialogConfig, onClose: closeDialoge});
  const [detailsDialogeConfig, setDetailsDialogeConfig] = useState({ ...insialDialogDetails, onClose: closeDialoge});

  const handleDelete = (studentInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteStudentMutation.mutate({id: studentInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Student?",
      description: `Are you sure of delete student ${studentInfo.row.first_name} ${studentInfo?.row?.last_name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteStudentMutation.isPending,
    }));
  }

  const handleEdit = (studentInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Student",
      data: studentInfo?.row ,
      onConfirm: (data) => { editStudentMutation.mutate({id: studentInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editStudentMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Student",
      onConfirm: (data) => { addStudentMutation.mutate({data}, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addStudentMutation.isPending,
    }))
  };

  const navigate = useNavigate();

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
          sx={{ color:isMale?blue[500]:pink[500], borderColor: isMale?blue[500]:pink[500], fontWeight: "bold", px: 1.5  }} 
          variant="outlined"
        />
      );
    }
    },
    { field: 'class_name', headerName: 'Class', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'section_name', headerName: 'Section', flex: 1, headerAlign: 'center', align: 'center'},
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
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      flex: 2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RemoveRedEyeOutlined sx={{color: 'white', border: '1px solid white', borderRadius: '50%', fontSize: 30, p: 0.5 }} />}
          label="Show Detials"
          onClick={() => navigate(`/student/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<Edit sx={{color: 'blue', border: '1px solid blue', borderRadius: '50%', fontSize: 30, p: 0.5 }}/>}
          label="Edit"
          onClick={() => handleEdit(params)}
        />,
        <GridActionsCellItem
          icon={<Delete sx={{ color: 'error.main', border:'1px solid', borderColor: 'error.main', borderRadius: '50%', fontSize: '30px', p:0.5 }} />}
          label="Delete"
          onClick={() => handleDelete(params)}
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
          onClick={handleAdd}
        />


        <TableComponent 
          rows={rows}
          columns={columns}
          loading={isLoading}
        />
      </Stack>

      <ConfirmationDialoge 
        open={dialogeConfig.open} 
        onClose={dialogeConfig.onClose}
        onConfirm={dialogeConfig.onConfirm}
        title={dialogeConfig.title}
        description={dialogeConfig.description}
        confirmText={dialogeConfig.confirmText}
        cancelText={dialogeConfig.cancelText}
        confirmColor={dialogeConfig.confirmColor}
        loading={dialogeConfig.loading}
      />

    <StudentDetailsDialoge
      open={detailsDialogeConfig.open}
      onClose={detailsDialogeConfig.onClose}
      onConfirm={detailsDialogeConfig.onConfirm}
      data={detailsDialogeConfig.data}
      title={detailsDialogeConfig.title}
      confirmText={detailsDialogeConfig.confirmText}
      cancelText={detailsDialogeConfig.cancelText}
      confirmColor={detailsDialogeConfig.confirmColor}
      loading={detailsDialogeConfig.loading}
      // backendErrors={dialogeConfig.error}
    />

    </Box>
);
}
