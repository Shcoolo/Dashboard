   import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Grid,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Paper,
  TableContainer,
  Dialog,
  DialogContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../../hooks/useStudents";
import { TitleBar } from "../../components";
import { useAttendances, useAttendanceSummary } from "../../hooks/useAttendance";
import AttendanceTap from "./AttendanceTap";
import GradesTap from "./GradesTap";

// const student = {
//   id: 5,
//   phone_number: "33664",
//   first_name: "محمد",
//   last_name: "علي",
//   father_name: "أحمد",
//   gender: "Male",
//   address: "شارع النصر، دمشق",
//   parent_phone: "0998765432",
//   student_class: 5,
//   class_name: "الصف الأول",
//   section: 8,
//   section_name: "الشعبة الأولى",
//   date_of_birth: "2010-05-15",
//   image: null,
//   student_status: "New",
//   register_status: "Accepted",
// };

const StudentDetailsPage = () => {

    // router 
    const {id} = useParams();
    const navigate = useNavigate();
    
    // api 
    const { data: student, isPending, isError, error } = useStudent(id);

    const [tab, setTab] = useState(0);
 

     if (isPending) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="primary" />
        </Box>
      );
    
    if (isError) {
        console.error(error);
        return (
            <Box>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    
      

  return (
    <Box p={3} >
        <Stack spacing={3} >

            {/* Header */}
            <TitleBar title="Student Profile" 
                button={'Back'}
                buttonColor="white"
                buttonType="outlined"
                onClick={() => navigate('/students')}
            />

            {/* Basic Info Card */}
            <Card sx={{ mb: 3, p: 2, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar
                                src={student?.image || ""}
                                sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
                            >
                                {student?.first_name ? student?.first_name[0] : "S"}
                            </Avatar>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h5" fontWeight="bold">
                                  {student?.first_name} {student?.last_name}
                            </Typography>
                            <Typography color="text.secondary">
                                Class: {student?.class_name} — Section: {student?.section_name}
                            </Typography>

                            <Box sx={{ mt: 1 }}>
                                <Chip
                                label={student.register_status}
                                color="success"
                                variant="outlined"
                                sx={{ mr: 1 }}
                                />
                                <Chip label={student.student_status} variant="outlined" />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
                <Tab label="Student Information" />
                <Tab label="Attendance" />
                <Tab label="Grades & Reports" />
            </Tabs>

            {/* Student Info Details Tab */}
            {tab === 0 && (
                <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 3 }}>
                    <CardContent>
                        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableBody>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold", width: "40%" }}>
                                Student ID
                                </TableCell>
                                <TableCell >{student.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Date of Birth
                                </TableCell>
                                <TableCell >{student.date_of_birth}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Gender
                                </TableCell>
                                <TableCell >{student.gender}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Father's Name
                                </TableCell>
                                <TableCell >{student.father_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Phone
                                </TableCell>
                                <TableCell >{student.phone_number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Parent Phone
                                </TableCell>
                                <TableCell >{student.parent_phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Address
                                </TableCell>
                                <TableCell >{student.address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: "bold" }}>
                                Registration Status
                                </TableCell>
                                <TableCell >{student.register_status}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}

            {/* Attendance Tab */}
            {tab === 1 && (
              <AttendanceTap studentId={student?.id} />
            )}

            {/* Grades & Avarage & Reports Tab */}
            {tab === 2 && (
              <GradesTap studentId={student?.id} />
            )}

        <Box sx={{minHeight: '20vh'}} ></Box>

      </Stack>
    </Box>
  )
}

export default StudentDetailsPage