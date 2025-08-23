import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useSubject, useUpdateSubject } from "../../hooks/useSubjects";
import { Badge, Box, Button, Card, CardContent, CardHeader, Chip, Grid, IconButton, Typography } from "@mui/material";
import { TitleBar } from "../../components";
import { Book, Cancel, CheckCircle, FileOpen, ModeEdit } from "@mui/icons-material";
import SubjectDetailsDialoge from "./SubjectDetailsDialoge";

const SubjectDetailPage = () => {
  
    const location = useLocation();
    const naviagte = useNavigate();

    const subject_id = location.pathname.split('/').pop();
    const {data: subject, isSuccess, isError, isPending} = useSubject(subject_id);

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
      setDetailsDialogeConfig({insialDialogDetails, onClose: closeDialoge });
    };
    const [detailsDialogeConfig, setDetailsDialogeConfig] = useState({insialDialogDetails, onClose: closeDialoge});
    const editSubjectMutation = useUpdateSubject();
    const handleEdit = () => {
      setDetailsDialogeConfig( prev => ({
        ...prev,
        open: true,
        title: "Edit Subject",
        data: subject,
        onConfirm: (data) => { editSubjectMutation.mutate({id: subject?.id , data: data }, {onSuccess: closeDialoge}) },
        confirmText: "Update",
        confirmColor: 'info',
        loading: editSubjectMutation.isPending,
      }))
    };

    if (!subject) {
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        align="center"
        sx={{ mt: 4 }}
      >
        No subject data available
      </Typography>
    );
    }

    return (
    <Box p={3} sx={{fontFamily: 'Cairo'}}>

        <TitleBar 
            title={subject?.name || "Subject Detail"}
            button="Back"
            buttonColor="white"
            buttonType="outlined"
            onClick={() => { naviagte('/subjects')}}  
        />

        <Card sx={{ mx: "auto", mt: 4, boxShadow: 3, p: 2 }}>
            <CardHeader
                avatar={<Book color="primary" />}
                title={
                    <>
                    <Box m={0} p={0} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h5" fontWeight="bold">
                            {subject.name}
                        </Typography>
                        <IconButton onClick={handleEdit}><ModeEdit /> </IconButton>
                     </Box>
                    </>
                }
                subheader={subject.description}
            />

            <CardContent>
                <Grid container spacing={3}>
                    <InfoItem label="Class" value={subject.class_obj_name} />
                    <InfoItem label="Section" value={subject.section ?? "-"} />
                    <InfoItem label="Stream Type" value={subject.stream_type_display} />
                    <InfoItem
                        label="Default Weekly Lessons"
                        value={subject.default_weekly_lessons}
                    />

                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                        Status
                        </Typography>
                        {subject.is_active ? (
                        <Chip
                            icon={<CheckCircle />}
                            label="Active"
                            color="success"
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                        ) : (
                        <Chip
                            icon={<Cancel />}
                            label="Inactive"
                            color="error"
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                        )}
                    </Grid>

                    <InfoItem
                        label="Created At"
                        value={new Date(subject.created_at).toLocaleDateString("en-US")}
                    />
                    <InfoItem
                        label="Updated At"
                        value={new Date(subject.updated_at).toLocaleDateString("en-US")}
                    />
                </Grid>

                {subject.pdf_file && (
                <Button
                    sx={{ mt: 4 }}
                    variant="outlined"
                    startIcon={<FileOpen />}
                    href={subject.pdf_file}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View PDF File
                </Button>
                )}
            </CardContent>
        </Card>

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
  )
}

export default SubjectDetailPage


function InfoItem({ label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="medium" sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Grid>
  );
}