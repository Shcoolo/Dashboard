import { Box, Chip, CircularProgress, FormControl, MenuItem, Select, Stack, Tooltip, Typography } from "@mui/material";
import { ConfirmationDialoge, TableComponent, TitleBar } from "../../components";
import { Add, Cancel, CheckCircle, CheckCircleOutline, Delete, Edit, PublishedWithChanges, ToggleOff, ToggleOn } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAddTask, useTasks, useDeleteTask, useUpdateTask, useTaskDone } from "../../hooks/useTasks";
import { useState } from "react";
import TaskDetailsDialoge from "./TaskDetailsDialoge";
import SearchTable from "../../components/SearchTable";
import { useSubject, useSubjects } from "../../hooks/useSubjects";

export default function TasksList() {

  // select subjet 
  const subjects = useSubjects();
  const [subjectSelected, setSubjectSelected] = useState('');
  const selectSubject = (e) => {
    const value = e.target.value || null;
    setSubjectSelected(value);
  }
  
  const { data: tasks, isLoading, isError, error } = useTasks({subject: subjectSelected});
  const addTaskMutation = useAddTask();
  const deleteTaskMutation = useDeleteTask();
  const editTaskMutation = useUpdateTask();
  const makeTaskdoneMutation = useTaskDone();
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
    title: "Tasks",
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


  const handleDelete = (TaskInfo) => {
    setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { deleteTaskMutation.mutate({id: TaskInfo.row.id },{ onSuccess: closeDialoge })},
      title: "Delete Task?",
      description: `Are you sure of delete Task ${TaskInfo.row.exam_type}`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteTaskMutation.isPending,
    }));
  }

  const handleEdit = (taskInfo) => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Edit Task",
      data: taskInfo?.row ,
      onConfirm: (data) => { editTaskMutation.mutate({id: taskInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Update",
      confirmColor: 'info',
      loading: editTaskMutation.isPending,
    }))
  };

  const handleAdd = () => {
    setDetailsDialogeConfig( prev => ({
      ...prev,
      open: true,
      title: "Add Task",
      onConfirm: (data) => { addTaskMutation.mutate({data: data }, {onSuccess: closeDialoge}) },
      confirmText: "Save",
      confirmColor: 'info',
      loading: addTaskMutation.isPending,
    }))
  };

  const handleMakeDone = (task) => {
    if(task?.row?.is_conducted)
        return ;
     setDialogeConfig( prev => ({
      ...prev, 
      open: true,
      onConfirm: () => { makeTaskdoneMutation.mutate({id: task.row.id, data: {'is_conducted': true} },{ onSuccess: closeDialoge })},
      title: "Change Task to done",
      description: `Are you sure of Change this Task ${task.row.exam_type} is Done `,
      confirmText: "Confirm",
      cancelText: "Cancel",
      confirmColor: "success",
      loading: makeTaskdoneMutation.isPending,
    }));
  }

  const rows = tasks;

  const columns = [
    { field: 'id', headerName:'ID', width: 70 , align: 'center', headerAlign: 'center'},
    { field: 'exam_type', headerName: 'Task Type', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'subject_name', headerName: 'Subject Name', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'target_class_name', headerName: 'Class', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'target_section_name', headerName: 'Section', flex: 1, headerAlign: 'center', align: 'center',
      valueFormatter: (params) => {
        if(!params)
          return "-";
        return params.value;
      }
    },
    { field: 'exam_date', headerName: 'Exam Date', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'total_marks', headerName: 'Total Marks', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'is_conducted', headerName: 'is Conducted', flex: 1, headerAlign: 'center', align: 'center',
       renderCell: (params) => {
        const isActive = params?.value === true;
        return (
          <Chip
              icon={isActive?<CheckCircle />:<Cancel />}
              label={isActive?"Done":"Pending"}
              color={isActive?"success":"error"}
              variant="outlined"
              sx={{ mt: 1 }}
          />
        );
      },
    },
    { field: 'academic_term_name', headerName: 'Year & Term', flex: 2, headerAlign: 'center', align: 'center'},
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      flex: 2,
      getActions: (params) => [
         <GridActionsCellItem
          icon={<Tooltip title="Conver To Done" arrow>
            {params?.row?.is_conducted?<CheckCircleOutline color='success' sx={{fontSize: 30, p: 0.5 }}/>:<PublishedWithChanges color="warning" sx={{fontSize: 30, p: 0.5 }} />}
          </Tooltip>}
          label="Conducted"
          onClick={() => handleMakeDone(params)}
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
          title="Tasks Management"
          buttonIcon={<Add />}
          button={"Add Task" } 
          buttonColor='info'
          onClick={handleAdd}
        />
        
           <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <SearchTable />
          {/* Select Subject  */}
          <FormControl sx={{ width: "300px"}}>
            <Select
              labelId="subjects-select-label"
              id="subject-select"
              value={subjectSelected || ""}
              onChange={(e) => selectSubject(e)}
              placeholder="Select Subject"
              displayEmpty
            >
              {/* placeholder  */}
              <MenuItem value="">
                <em>Select Subject</em>
              </MenuItem>

              {subjects.isLoading && (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                </MenuItem>
              )}

              {subjects.isError && (
                <MenuItem disabled>
                  <Typography color="error">{subjects.error.message}</Typography>
                </MenuItem>
              )}

              {subjects?.subjects?.length === 0 && (
                <MenuItem disabled>No classes available</MenuItem>
              )}

              {subjects?.data?.map((item) => (
                <MenuItem key={item.id} value={item.id} >
                  {item.name}
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

  <TaskDetailsDialoge
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
