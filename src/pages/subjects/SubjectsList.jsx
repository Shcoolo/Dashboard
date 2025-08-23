import { Box, Chip, Stack, useTheme } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Cancel, CheckCircle, Delete, Edit, RemoveRedEyeOutlined, Search } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddSubject, useSubjects, useDeleteSubject, useUpdateSubject } from "../../hooks/useSubjects";
import { useState } from "react";
import SubjectDetailsDialoge from "./SubjectDetailsDialoge";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

export default function SubjectsList() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { data: subjects, isLoading, isError, error } = useSubjects();
  const addSubjectMutation = useAddSubject();
  const deleteSubjectMutation = useDeleteSubject();
  const editSubjectMutation = useUpdateSubject();
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
    title: "Subject Academic",
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


  const handleDelete = (subjectInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteSubjectMutation.mutate({id: subjectInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Subject?",
      description: `Are you sure of delete Subject ${subjectInfo.row.name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteSubjectMutation.isPending,
    }));
  }

  const handleEdit = (subjectInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Subject",
      data: subjectInfo?.row ,
      onConfirm: (data) => { editSubjectMutation.mutate({id: subjectInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editSubjectMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Subject",
      onConfirm: (data) => { addSubjectMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addSubjectMutation.isPending,
    }))
  };

  const rows = subjects;

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'stream_type', headerName: 'Stream Type', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'pdf_file', headerName: 'Has File', flex: 1, headerAlign: 'center', align: 'center',
      renderCell: (params) => {
        if(params && params.value?.length > 0)
            return "True";
        else 
          return "False";
      }
    },
    {
      field: "is_active",
      headerName: "Status",
      headerAlign: 'center',
      align: 'center',
      felx: 1,
      renderCell: (params) => {
        const isActive = params?.value === true;
        return (
          <Chip
              icon={isActive?<CheckCircle />:<Cancel />}
              label={isActive?"Active":"Inactive"}
              color={isActive?"success":"error"}
              variant="outlined"
              sx={{ mt: 1 }}
          />
        );
      },
    },
    { field: 'class_obj_name', headerName: 'Class', flex: 1, headerAlign: 'center', align: 'center', 
      valueFormatter: (params) => {
        if(!params)
          return "-";
        return params.value;
      }
    },
    { field: 'section', headerName: 'Section', flex: 1, headerAlign: 'center', align: 'center',
      valueFormatter: (params) => {
        if(!params)
          return "-";
        return params.value;
      }
    },
    { field: 'default_weekly_lessons', headerName: 'Weekly Lessons', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'description', headerName: 'Description', flex: 2, headerAlign: 'center', align: 'center'},
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
          onClick={() => navigate(`/subject/${params.row.id}`)}
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
          title="Subjects Management"
          buttonIcon={<Add />}
          button={"Add Subject" } 
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

  <SubjectDetailsDialoge
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
