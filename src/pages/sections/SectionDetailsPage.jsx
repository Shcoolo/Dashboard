import React, { useState } from 'react'
import { TitleBar } from '../../components'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSection, useUpdateSection } from '../../hooks/useSections'
import { Cancel, CheckCircle, Edit, ExpandMore } from '@mui/icons-material'
import { useClasses } from '../../hooks/useClasses'
import SectionsDetailsDialoge from "./SectionDetailsDialoge";
import WeeklySchedule from './WeeklySchedule'


const SectionDetailsPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const sectionId = location.pathname.split('/').pop();
    // api 
    const {data: section, isPending, isError} = useSection(sectionId);
    const editSectionMutation = useUpdateSection();
    const classes = useClasses();

    // edit deialoge 
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
      setDetailsDialogeConfig({insialDialogDetails, onClose: closeDialoge });
    };
    const [detailsDialogeConfig, setDetailsDialogeConfig] = useState({insialDialogDetails, onClose: closeDialoge});
    const handleEdit = (sectionInfo) => {
      setDetailsDialogeConfig( prev => ({
        ...prev,
        open: true,
        title: "Edit Sections",
        data: sectionInfo ,
        onConfirm: (data) => { editSectionMutation.mutate({id: sectionInfo.row.id , data: data }, {onSuccess: closeDialoge}) },
        confirmText: "Update",
        confirmColor: 'info',
        loading: editSectionMutation.isPending,
      }))
    };
    

  return (
    <Box p={3}>
      <Stack spacing={3} >
        <TitleBar title={section?.name || "Section Detail"}
            button={'Back'}
            buttonType='outlined'
            buttonColor='white'
            onClick={() => navigate('/sections')}
        />

        {/* section detail  */}
        <>
        {
        // loading  
        isPending ?
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        :
        // error 
        isError ?
           <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <Alert severity="error">Failed to load section details.</Alert>
          </Box>
        :
        // success
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" width="100%">
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: "5px",
                width: "100%",
                position: "relative",
              }}
            >

              {/* Edit Button */}
              <IconButton
                color="primary"
                sx={{ position: "absolute", top: 16, right: 16 }}
                onClick={() => handleEdit(section)}
              >
                <Edit />
              </IconButton>

              {/* Info Table */}
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell>{section.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Stream Type</TableCell>
                      <TableCell>{section.stream_type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Capacity</TableCell>
                      <TableCell>{section.capacity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Students Count</TableCell>
                      <TableCell>{section.students_count}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Remaining Capacity</TableCell>
                      <TableCell>{section.remaining_capacity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell>
                        <Chip
                          icon={section.is_active?<CheckCircle />:<Cancel />}
                          label={section.is_active?"Active":"Inactive"}
                          color={section.is_active?"success":"error"}
                          variant="outlined"
                          sx={{ mt: 1 }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Activation Date</TableCell>
                      <TableCell>
                        {new Date(section.activation_dalte).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    {section.deactivation_date && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Deactivation Date</TableCell>
                        <TableCell>
                          {new Date(section.deactivation_date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Academic Year</TableCell>
                      <TableCell>{section.academic_year_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Class Name</TableCell>
                      <TableCell>{section.class_name}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        }
        </>

        {/* Weekly Schudauls  */}
        <WeeklySchedule sectionId={sectionId} />
        
      </Stack>

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
    
  )
}

export default SectionDetailsPage