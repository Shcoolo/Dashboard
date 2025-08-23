import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Stack,
  Tooltip,
  Alert
} from "@mui/material";
import { Add, Delete, Edit, InfoOutline, RemoveRedEyeOutlined, ToggleOff, ToggleOn } from "@mui/icons-material";
import { ConfirmationDialoge, TitleBar, TermsDialog, TermDetailsDialog } from "../../components";
import { useState } from "react";
import { useAddYear, useDeleteYear, useUpdateYear, useYears } from "../../hooks/useYears";
import { toast } from "react-toastify";
import YearDetailsDialoge from "./YearDetailsDialoge";
import { useNavigate } from "react-router-dom";

const AcademicYears = () => {

  const { data: years, isLoading, isError, error } = useYears();
  const addYearMutation = useAddYear();
  const deleteYearMutation = useDeleteYear();
  const editYearMutation = useUpdateYear();
  
  const navigate = useNavigate();

  const closeDialoge = () => {
    setDialogeConfig( prev => ({
      ...prev,
      open: false
    }))
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: false
    }))
    setTermsDialogConfig( prev => ({
      ...prev,
      open: false
    }))
  }
  const [dialogeConfig, setDialogeConfig] = useState({
      open: false,
      onClose: closeDialoge,
      onConfirm: () => {},
      title: "Confirm Message",
      description: "",
      confirmText: "Confirm",
      cancelText: "Cancel",
      confirmColor: "primary",
      loading: false,
  });

  const [detailsDialogeConfig, setDetailsDialogeConfig] = useState({
    open: false,
    onClose: closeDialoge,
    onConfirm: () => {},
    title: "Year Academic",
    data: {},
    confirmText: "Submit",
    cancelText: "Cancel",
    confirmColor: "primary",
    loading: false,
  });

  const [termsDialogConfig, setTermsDialogConfig] = useState({
    open: false,
    onClose: closeDialoge,
    yearId: null,
    yearName: "",
  });


  // active operations 
  const handleActive = (year) => {
    editYearMutation.mutate(
    { 
      id: year.id, 
      data: { ...year, "is_current": !year.is_current }
    }, 
    {
      onSuccess: () => {
        toast.success("Updated successfully!");
        closeDialoge();
      }
    })
  }
  const handleDialogeActive = (year) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => handleActive(year),
      title: year.is_current?"Confirm Activation":"Confirm Deactivation",
      description: `Are you sure you want to ${year.is_current?"deactivation":"activation and make it currently"} the ${year.name} academic year ${year.is_current?'':'and make it the current academic year'}?`,
      loading: editYearMutation.isPending
    }))
  }

  // add operations
  const handleAdd = (data) => {
     addYearMutation.mutate(
      {
        data: data
      },
      {
        onSuccess: () => {
          toast.success("Create academic year successfully!");
          closeDialoge();
        }
      }
    )  
  };
  const handleDialogeAdd = () => {
     setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      onConfirm: (data) => handleAdd(data),
      confirmText: "Save",
      confirmColor: 'info',
      loading: addYearMutation.isPending,
    }))
  }
  

  // edit operations
  const handleEdit = (id, data) => { 
    editYearMutation.mutate(
      {
        id: id, 
        data: data
      },
      {
        onSuccess: () => {
          toast.success("Updated successfully!");
          closeDialoge();
        }
      }
  )   
  }
  const handleDialogeEdit = (year) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      data: year,
      onConfirm: (data) => handleEdit(year.id, data),
      confirmText: "Update",
      confirmColor: 'info',
      loading: editYearMutation.isPending,
    }))
  }

  // delete operations
  const handleDelete = (year) => {
    deleteYearMutation.mutate(
      {
        id: year.id
      },
      {
        onSuccess: () => {
          toast.success("Delete successfully!");
          closeDialoge();
        }
      }
    )
  }
  const handleDialogeDelete= (year) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => handleDelete(year),
      title: "Delete Year?",
      description: `Are you sure of delete year ${year.name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteYearMutation.isPending,
    }))
  }

  // terms dialog operations
  const handleDialogTerms = (year) => {
    setTermsDialogConfig(prev => ({
      ...prev,
      open: true,
      yearId: year.id,
      yearName: year.name,
      yearStatus: year.is_current
    }));
  };


  if (isLoading) return (
    <div style={{ minHeight: "75vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
      <CircularProgress color="error" />
    </div>
  );

  if (isError) {
    return(
      <Box p={3}>
        <Alert severity="error">{error?.message}</Alert>
      </Box>
    );
  }

  return (
    <>
    <Box p={3}>
      <Stack spacing={3}>
      <TitleBar 
        title="Year Academic" 
        button="Add Year" 
        buttonIcon={<Add />} 
        buttonColor="info"
        onClick={handleDialogeAdd}  
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Year Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {years?.map((year) => (
              <TableRow key={year.id}>
                <TableCell>
                  <h2>{year.name}</h2>
                  {/* <p>n terms</p> */}
                </TableCell>
                <TableCell>{year.start_date}</TableCell>
                <TableCell>{year.end_date}</TableCell>
                <TableCell>
                  {year.is_current ? (
                    <Chip label="Current" sx={{color: '#00ff00', borderColor: '#00ff00'}} color="success" variant="outlined"/>
                  ) : (
                    <Chip label="Inactive" sx={{color: '#ff0000', borderColor: '#ff0000'}} variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="active year" arrow>
                    <IconButton 
                      style={{ color: year.is_current?'green':'gray', margin: '0 5px'}} 
                      onClick={() => handleDialogeActive(year)}
                    >{ year.is_current?<ToggleOn fontSize="large" />:<ToggleOff  fontSize="large" />}</IconButton>
                  </Tooltip>
                  <Tooltip title="terms of a year" arrow>
                    <IconButton 
                      onClick={() => handleDialogTerms(year)} 
                    ><InfoOutline fontSize="large"/></IconButton>
                  </Tooltip>
                  <Tooltip title="year details" arrow>
                    <IconButton 
                      style={{ color: '#ffd505', border: '2px solid #ffd505', margin: '0 5px', padding: '5px'}} 
                      onClick={() => navigate(`/calendar`)}
                    ><RemoveRedEyeOutlined fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Edit year" arrow>
                    <IconButton 
                      style={{ color: 'blue', border: '2px solid blue', margin: '0 5px', padding: '5px' }} 
                      onClick={() => handleDialogeEdit(year)}
                    ><Edit fontSize="small"/></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete year" arrow>
                    <IconButton 
                      style={{ color: 'red', border: '2px solid red' , margin: '0 5px', padding: '5px'}} 
                      onClick={() => handleDialogeDelete(year)}
                    ><Delete fontSize="small" /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Stack>
    </Box>
    
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

    <YearDetailsDialoge
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

    <TermsDialog
      open={termsDialogConfig.open}
      onClose={termsDialogConfig.onClose}
      yearId={termsDialogConfig.yearId}
      yearName={termsDialogConfig.yearName}
      yearStatus={termsDialogConfig?.yearStatus}
    />

    </>
  );
};

export default AcademicYears;