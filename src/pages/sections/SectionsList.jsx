import { Alert, Box, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography, useTheme } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Cancel, CheckCircle, Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddSection, useSections, useDeleteSection, useUpdateSection } from "../../hooks/useSections";
import { useState } from "react";
import SectionsDetailsDialoge from "./SectionDetailsDialoge";
import { format } from "date-fns";
import { tokens } from "../../theme";
import SearchTable from "../../components/SearchTable";
import { useClasses } from "../../hooks/useClasses";
import { useNavigate } from "react-router-dom";

export default function SectionsList() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [classI, setClassI] = useState('');
  const { data: sections, isLoading } = useSections({ classId: classI });

  const classes = useClasses();


  const addSectionMutation = useAddSection();
  const deleteSectionMutation = useDeleteSection();
  const editSectionMutation = useUpdateSection();
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
    title: "Section Academic",
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


  const handleDelete = (sectionInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteSectionMutation.mutate({id: sectionInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Sections?",
      description: `Are you sure of delete section ${sectionInfo.row.name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteSectionMutation.isPending,
    }));
  }

  const handleEdit = (sectionInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Sections",
      data: sectionInfo?.row ,
      onConfirm: (data) => { editSectionMutation.mutate({id: sectionInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editSectionMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Sections",
      onConfirm: (data) => { addSectionMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addSectionMutation.isPending,
    }))
  };

  const rows = sections;

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'stream_type', headerName: 'Stream Type', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'capacity', headerName: 'Capacity', widht: 30, headerAlign: 'center', align: 'center'},
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
    {
      field: "activation_date",
      headerName: "Activation Date",
      width: 200,
      valueFormatter: (params) => {
        if (!params) return "-";
        const date = new Date(params);
        return format(date, "dd MMM yyyy, HH:mm");
      },
      headerAlign: 'center',
      align: 'center',
      felx: 1,
    },
    {
      field: "deactivation_date",
      headerName: "Deactivation Date",
      widht: 200,
      valueFormatter: (params) => {
        if(!params) return "-";
        const date = new Date(params);
        return format(date, "dd MMM yyyy, HH:mm");
      },
      headerAlign: 'center',
      align: 'center',
      felx: 1,
    },
    { field: 'class_name', headerName: 'Class Name', flex: 1, headerAlign: 'center', align: 'center'},
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
          onClick={() => navigate(`/section/${params.row.id}`)}
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

  const selectClass = (e) => {
    const value = e.target.value || null;
    setClassI(value);
    
  }

 
  return (
    <Box p={3}>
      <Stack spacing={3}>
        <TitleBar 
          title="Sections Management"
          buttonIcon={<Add />}
          button={"Add Sections" } 
          buttonColor='info'
          onClick={handleAdd}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <SearchTable />
          {/* Select Class  */}
          <FormControl sx={{ width: "300px"}}>
            <Select
              labelId="class-select-label"
              id="class-select"
              value={classI || ""}
              onChange={(e) => selectClass(e)}
              placeholder="Select Class"
              sx={{fontFamily: 'Tajawal'}}
              displayEmpty
            >
              {/* placeholder  */}
              <MenuItem value="">
                <em>Select Class</em>
              </MenuItem>

              {classes.isLoading && (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                </MenuItem>
              )}

              {classes.isError && (
                <MenuItem disabled>
                  <Typography color="error">{classes.error.message}</Typography>
                </MenuItem>
              )}

              {classes?.classes?.length === 0 && (
                <MenuItem disabled>No classes available</MenuItem>
              )}

              {classes?.data?.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.id} sx={{fontFamily: 'Tajawal'}}>
                  {classItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableComponent 
          rows={rows}
          columns={columns}
          loading={isLoading}
          showSearch={false}
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

  <SectionsDetailsDialoge
      open={detailsDialogeConfig.open}
      onClose={detailsDialogeConfig.onClose}
      onConfirm={detailsDialogeConfig.onConfirm}
      data={detailsDialogeConfig.data}
      title={detailsDialogeConfig.title}
      confirmText={detailsDialogeConfig.confirmText}
      cancelText={detailsDialogeConfig.cancelText}
      confirmColor={detailsDialogeConfig.confirmColor}
      loading={detailsDialogeConfig.loading}
      classes={classes}
    />

    </Box>
);
}
