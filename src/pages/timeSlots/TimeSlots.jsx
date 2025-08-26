import { Box, Chip, Stack } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, CheckCircle, Delete, Edit, FreeBreakfast, School } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddTimeSlot, useTimeSlots, useDeleteTimeSlot, useUpdateTimeSlot } from "../../hooks/useTimeSlots";
import { useState } from "react";
import TimeSlotDetailsDialoge from "./TimeSlotDetailsDialoge";

export default function TimeSlots() {

  
  const { data: timeSlots, isLoading, isError, error } = useTimeSlots();
  const addTimeSlotMutation = useAddTimeSlot();
  const deleteTimeSlotMutation = useDeleteTimeSlot();
  const editTimeSlotMutation = useUpdateTimeSlot();
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
    title: "TimeSlot Academic",
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


  const handleDelete = (timeSlotInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteTimeSlotMutation.mutate({id: timeSlotInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete TimeSlot?",
      description: `Are you sure of delete timeSlot ${timeSlotInfo.row.name}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteTimeSlotMutation.isPending,
    }));
  }

  const handleEdit = (timeSlotInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit TimeSlot",
      data: timeSlotInfo?.row ,
      onConfirm: (data) => { editTimeSlotMutation.mutate({id: timeSlotInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editTimeSlotMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add TimeSlot",
      onConfirm: (data) => { addTimeSlotMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addTimeSlotMutation.isPending,
    }))
  };

  const rows = timeSlots;

  //  {
  //       "id": 1,
  //       "slot_number": 1,
  //       "name": "الحصة الأولى",
  //       "start_time": "08:45:00",
  //       "end_time": "09:30:00",
  //       "is_break": false,
  //       "created_at": "2025-08-20T15:59:42.750621Z"
  //   }
  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'slot_number', headerName: 'Order', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'start_time', headerName: 'Start Time', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'end_time', headerName: 'End Time', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'is_break', headerName: 'Status', flex: 1, headerAlign: 'center', align: 'center',
      renderCell: (params) => {
        const isBreak = params?.value;
        return (
          <Chip
            icon={isBreak?<FreeBreakfast />:<School />}
            label={isBreak?"Break":"Class"}
            color={isBreak?"info":"primary"}
            variant="outlined"
            sx={{ mt: 1 }}
          />
        )}
    },  
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
          title="TimeSlots Management"
          buttonIcon={<Add />}
          button={"Add TimeSlot" } 
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

  <TimeSlotDetailsDialoge
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
