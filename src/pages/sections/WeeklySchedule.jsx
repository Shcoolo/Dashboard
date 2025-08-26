import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  useTheme,
  IconButton,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useTimeSlots } from "../../hooks/useTimeSlots";
import { useDays } from "../../hooks/useDaysOfWeek";
import { useAddSchedule, useDeleteSchedule, useSchedules, useUpdateSchedule } from "../../hooks/useSchedules";
import { Delete, Edit } from "@mui/icons-material";
import ScheduleDetailsDialoge from "./ScheduleDetailsDialoge";
import { ConfirmationDialoge } from "../../components";


export default function WeeklySchedule({sectionId}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // time slots
  const { data: timeSlots, isLoading, isError, error } = useTimeSlots();
  // week days
  const { data: daysOfWeek } = useDays(); 
  // schedules
  const { data: schedules } = useSchedules({filter: sectionId});

  
  const addScheduleMutation = useAddSchedule();
  const deleteScheduleMutation = useDeleteSchedule();
  const editScheduleMutation = useUpdateSchedule();
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
    title: "Schedule",
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


  const handleDelete = (scheduleInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteScheduleMutation.mutate({id: scheduleInfo.id },{ onSuccess: closeDialoge })},
      title: "Delete Schedule's Class?",
      description: `Are you sure of delete Schedule's Class ${scheduleInfo.time_slot_display} on day ${scheduleInfo.day_of_week_display}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteScheduleMutation.isPending,
    }));
  }

  const handleEdit = (schedule, day, slot) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Schedule's Class",
      data: schedule ,
      onConfirm: (data) => { editScheduleMutation.mutate({id: schedule.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editScheduleMutation.isPending,
      day: day,
      slot: slot,
    }))
  };

  const handleAdd = (day, slot) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Schedules",
      onConfirm: (data) => { addScheduleMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addScheduleMutation.isPending,
      day: day,
      slot: slot,
    }))
  };


  const getClassForCell = (dayId, slotId) =>
    schedules?.find((c) => c.day_of_week === dayId && c.time_slot === slotId);

  return (
  <>
    <Accordion defaultExpanded sx={{borderRadius: '5px'}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">
          Weekly Schedule
        </Typography>
      </AccordionSummary>

      <AccordionDetails>

        <TableContainer component={Paper} sx={{ borderRadius: "16px", overflow: "hidden" }}>
          <Table
            sx={{
              boxShadow: '1px 1px 1px 1px black',
              "& th": {
                backgroundColor: colors.primary[400],
                // color: colors.grey[900],
                fontWeight: "bold",
                textAlign: "center",
              },
              "& td": {
                textAlign: "center",
                border: `1px solid ${colors.grey[900]}`,
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ height: 60 }}>
                <TableCell>Time Slot</TableCell>
                {daysOfWeek?.map((day) => (
                  <TableCell key={day.id}>{day.name_ar}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {timeSlots?.map((slot) => (
                <TableRow key={slot.id} sx={{ height: 70 }}>
                  {/* Time slot Rows */}
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: colors.primary[400],
                      width: "160px",
                    }}
                  >
                    {slot.name}
                  </TableCell>

                  {/* Days columns */}
                  {daysOfWeek?.map((day) => {
                    const classData = getClassForCell(day.id, slot.id);
                    return (
                      <TableCell key={day.id}>
                        {classData ? (
                          <Box
                             sx={{
                              p: 2,
                              borderRadius: "12px",
                              border: `1px solid ${colors.primary[500]}`,
                              backgroundColor: alpha(colors.primary[500], 0.15),
                              color: colors.grey[100],
                              boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                              transition: "transform 0.25s, box-shadow 0.25s",
                              "&:hover": {
                                transform: "scale(1.04)",
                                boxShadow: "0 6px 12px rgba(0,0,0,0.35)",
                                backgroundColor: alpha(colors.primary[500], 0.5),
                              },
                              textAlign: "center",
                            }}
                          >
                         <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {classData.subject_name}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {classData.teacher_name}
                          </Typography>
                            {/* action  */}
                            <Box display="flex" justifyContent="center" gap={1}>
                              <IconButton size="small" color="error"
                                onClick={() => handleDelete(classData)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                              <IconButton size="small" sx={{color: 'blue'}}
                                onClick={() => handleEdit(classData, day, slot)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Box>
                        
                          </Box>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleAdd(day, slot)}
                            sx={{
                              borderRadius: "12px",
                              borderColor: colors.blueAccent[500],
                              color: colors.blueAccent[500],
                              transition: "0.3s",
                              "&:hover": {
                                backgroundColor: colors.blueAccent[100],
                                borderColor: colors.blueAccent[500],
                              },
                            }}
                          >
                            + Add
                          </Button>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
      
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

      <ScheduleDetailsDialoge
        open={detailsDialogeConfig.open}
        onClose={detailsDialogeConfig.onClose}
        onConfirm={detailsDialogeConfig.onConfirm}
        data={detailsDialogeConfig.data}
        title={detailsDialogeConfig.title}
        confirmText={detailsDialogeConfig.confirmText}
        cancelText={detailsDialogeConfig.cancelText}
        confirmColor={detailsDialogeConfig.confirmColor}
        loading={detailsDialogeConfig.loading}
        sectionId={sectionId}
        day={detailsDialogeConfig.day}
        slot={detailsDialogeConfig.slot}
      />
    </>
  );
}
