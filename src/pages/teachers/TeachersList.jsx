import { Box, Chip, Stack } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Cancel, CheckCircle, Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddTeacher, useTeachers, useDeleteTeacher, useUpdateTeacher } from "../../hooks/useTeachers";
import { useState } from "react";
import TeacherDetailsDialoge from "./TeacherDetailsDialoge";
import { useNavigate } from "react-router-dom";

export default function TeachersList() {

  // defines 
  const navigate = useNavigate();
  const { data: teachers, isLoading, isError, error } = useTeachers();
  const addTeacherMutation = useAddTeacher();
  const deleteTeacherMutation = useDeleteTeacher();
  const editTeacherMutation = useUpdateTeacher();
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
    title: "Teacher Academic",
    data: {},
    confirmText: "Submit",
    cancelText: "Cancel",
    confirmColor: "primary",
    loading: false,
  }

  const closeDialoge = () => {
    setDialogeConfig({inisialDialogConfig, onClose: closeDialoge });
    setDetailsDialogeConfig({insialDialogDetails, onClose: closeDialoge });
  };

  const [dialogeConfig, setDialogeConfig] = useState({inisialDialogConfig, onClose: closeDialoge});
  const [detailsDialogeConfig, setDetailsDialogeConfig] = useState({insialDialogDetails, onClose: closeDialoge});


  const handleDelete = (teacherInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteTeacherMutation.mutate({id: teacherInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Teacher?",
      description: `Are you sure of delete teacher ${teacherInfo.row.first_name} ${teacherInfo?.row?.last_name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteTeacherMutation.isPending,
    }));
  }

  const handleEdit = (teacherInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Teacher",
      data: teacherInfo?.row ,
      onConfirm: (data) => { editTeacherMutation.mutate({id: teacherInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editTeacherMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Teacher",
      onConfirm: (data) => { addTeacherMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addTeacherMutation.isPending,
    }))
  };

  const rows = teachers;

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'first_name', headerName: 'First Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'last_name', headerName: 'Last Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'is_active', headerName: 'Status', flex: 1, headerAlign: 'center', align: 'center',
      renderCell: (params) => {
        const isActive = params?.value;
        return (
          <Chip
            icon={isActive?<CheckCircle />:<Cancel />}
            label={isActive?"Active":"Inactive"}
            color={isActive?"success":"error"}
            variant="outlined"
            sx={{ mt: 1 }}
        />
        );
      }
    },
    { field: 'address', headerName: 'Address', flex: 1, headerAlign: 'center', align: 'center',
      valueFormatter: (params) => {
        if(params){
          return params.value;
        }
        return '-';
      }
    },
    { field: 'specialization', headerName: 'Specialization', flex: 2, headerAlign: 'center', align: 'center'},
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
            onClick={() => navigate(`/teacher/${params.row.id}`)}
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
          title="Teachers Management"
          buttonIcon={<Add />}
          button={"Add Teacher" } 
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

  <TeacherDetailsDialoge
      open={detailsDialogeConfig.open}
      onClose={detailsDialogeConfig.onClose}
      onConfirm={detailsDialogeConfig.onConfirm}
      data={detailsDialogeConfig.data}
      title={detailsDialogeConfig.title}
      confirmText={detailsDialogeConfig.confirmText}
      cancelText={detailsDialogeConfig.cancelText}
      confirmColor={detailsDialogeConfig.confirmColor}
      loading={detailsDialogeConfig.loading}
    />

    </Box>
);
}
