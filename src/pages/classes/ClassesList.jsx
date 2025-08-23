import { Box, Stack } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Delete, Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddClass, useClasses, useDeleteClass, useUpdateClass } from "../../hooks/useClasses";
import { useState } from "react";
import ClassDetailsDialoge from "./ClassDetailsDialoge";

export default function ClassesList() {

  
  const { data: classes, isLoading, isError, error } = useClasses();
  const addClassMutation = useAddClass();
  const deleteClassMutation = useDeleteClass();
  const editClassMutation = useUpdateClass();
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
    title: "Class Academic",
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


  const handleDelete = (classInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteClassMutation.mutate({id: classInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Class?",
      description: `Are you sure of delete class ${classInfo.row.name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteClassMutation.isPending,
    }));
  }

  const handleEdit = (classInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Class",
      data: classInfo?.row ,
      onConfirm: (data) => { editClassMutation.mutate({id: classInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editClassMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Class",
      onConfirm: (data) => { addClassMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addClassMutation.isPending,
    }))
  };

  const rows = classes;

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'description', headerName: 'Description', flex: 2, headerAlign: 'center', align: 'center'},
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
          title="Classes Management"
          buttonIcon={<Add />}
          button={"Add Class" } 
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

  <ClassDetailsDialoge
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
