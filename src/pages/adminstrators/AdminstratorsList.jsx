import { Box, Stack } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Delete, Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddAdminstrator, useAdminstrators, useDeleteAdminstrator, useUpdateAdminstrator } from "../../hooks/useAdminstrators";
import { useState } from "react";
import AdminstratorDetailsDialoge from "./AdminstratorDetailsDialoge";

export default function AdminstratorsList() {

  
  const { data: adminstrators, isLoading, isError, error } = useAdminstrators();
  const addAdminstratorMutation = useAddAdminstrator();
  const deleteAdminstratorMutation = useDeleteAdminstrator();
  const editAdminstratorMutation = useUpdateAdminstrator();
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
    title: "Adminstrator Academic",
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


  const handleDelete = (adminstratorInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteAdminstratorMutation.mutate({id: adminstratorInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Adminstrator?",
      description: `Are you sure of delete adminstrator ${adminstratorInfo.row.first_name} ${adminstratorInfo?.row?.last_name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteAdminstratorMutation.isPending,
    }));
  }

  const handleEdit = (adminstratorInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Adminstrator",
      data: adminstratorInfo?.row ,
      onConfirm: (data) => { editAdminstratorMutation.mutate({id: adminstratorInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editAdminstratorMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Adminstrator",
      onConfirm: (data) => { addAdminstratorMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addAdminstratorMutation.isPending,
    }))
  };

  const apiRows = adminstrators;
  const rows = apiRows?.map( (row) => (
    {
      ...row,
      id: row.user_id
    }
  ))

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'first_name', headerName: 'First Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'last_name', headerName: 'Last Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'department', headerName: 'Department', flex: 1, headerAlign: 'center', align: 'center'},
    
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
          title="Adminstrators Management"
          buttonIcon={<Add />}
          button={"Add Adminstrator" } 
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

  <AdminstratorDetailsDialoge
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
