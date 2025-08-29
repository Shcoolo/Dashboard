import { Alert, Box, Card, CardContent, CircularProgress, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useAttendances, useAttendanceSummary } from '../../hooks/useAttendance';
import { TableComponent } from '../../components';
import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../theme';


const AttendanceTap = (studentId) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const id = studentId.studentId
    // api 
    const attendance = useAttendances({ student: id });
    const attendanceSummary = useAttendanceSummary({ student: id });

    if (attendance.isPending || attendanceSummary.isPending) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="primary" />
        </Box>
    );
    if(attendance.isError || attendanceSummary.isError){
        console.error(attendance.error);
        console.error(attendanceSummary.error);   
     return (
        <Box>
            <Alert severity='error'>No Data Avaliable</Alert>
        </Box>
    )};

    // chart 
    const chartData = [
    {
      id: "Present",
      label: "Present",
      value: attendanceSummary?.data?.counts?.present ?? 0,
      color: "#4caf50",
    },
    {
      id: "Absent",
      label: "Absent",
      value: attendanceSummary?.data?.counts?.absent ?? 0,
      color: "#f44336",
    },
    {
      id: "Late",
      label: "Late",
      value: attendanceSummary?.data?.counts?.late ?? 0,
      color: "#ff9800",
    },
    {
      id: "Excused",
      label: "Excused",
      value: attendanceSummary?.data?.counts?.excused ?? 0,
      color: "#2196f3",
    },
    ];
    const total = attendanceSummary?.data?.counts?.total ?? 0;


    const rows = attendance?.data;
    const columns = [
        { field: "date", headerName: "Date", flex: 1 , headerAlign: 'center', align: 'center'},
        { field: "status_display", headerName: "Status", flex: 1, headerAlign: 'center', align: 'center'},
        { field: "student_name", headerName: "Student", flex: 1 , headerAlign: 'center', align: 'center'},
        { field: "recorded_by_name", headerName: "Recorded By", flex: 1 , headerAlign: 'center', align: 'center',
            valueFormatter: (params) => {
                if(params){
                    return params.value;
                }
                return '--'
            }
        },
    ];

    console.log(chartData)
    
  return (
       <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mt: 3 }}>
            <CardContent>

                {/* Table  */}
                <Typography variant="h5" gutterBottom>
                    Attendance Records
                </Typography>

                <Divider sx={{ mb: 2 }} />  

                {/* table   */}
                <TableComponent 
                    rows={rows}
                    columns={columns}
                    loading={attendance?.isPending}
                    showSearch={false}
                    pagination={true}
                />


                <Box my={5} />
                {/* summary  */}
              

                <Typography variant="h5" gutterBottom>
                    Attendance Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    {/* Left side - narrative */}
                    <Box item sx={{ width: '50%', flex: 1, margin: 3 }}>
                        <Stack spacing={1.5}>
                        <Typography variant="body1" >
                            <strong>Total Records:</strong> {total}
                        </Typography>
                        <Box my={3}/>
                        <Typography color="success.main" variant="body1">
                            <strong>Present:</strong> {attendanceSummary?.data?.counts?.present ?? 0} (
                            {attendanceSummary?.data?.percentages?.present ?? 0}%)
                        </Typography>
                        <Typography color="error.main" variant="body1">
                            <strong>Absent:</strong> {attendanceSummary?.data?.counts?.absent ?? 0} (
                            {attendanceSummary?.data?.percentages?.absent ?? 0}%)
                        </Typography>
                        <Typography color="warning.main" variant="body1">
                            <strong>Late:</strong> {attendanceSummary?.data?.counts?.late ?? 0} (
                            {attendanceSummary?.data?.percentages?.late ?? 0}%)
                        </Typography>
                        <Typography color="info.main" variant="body1">
                            <strong>Excused:</strong> {attendanceSummary?.data?.counts?.excused ?? 0} (
                            {attendanceSummary?.data?.percentages?.excused ?? 0}%)
                        </Typography>
                        </Stack>
                    </Box>

                    {/* Right side - Pie Chart */}
                    <Box item sx={{ width: '50%', flex: 1}}>
                        <Box s sx={{
                            height: 300, 
                            minHeight: 300,
                            width: "100%",
                            }}
                        >
                        {total === 0 ? (
                            <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            >
                            <Typography color="text.secondary">
                                No attendance data to show
                            </Typography>
                            </Box>
                        ) : (
                            <>
                            <ResponsivePie
                                data={chartData}
                                margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
                                innerRadius={0.5}
                                padAngle={1.5}
                                cornerRadius={3}
                                colors={{ datum: "data.color" }}
                                borderWidth={1}
                                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                                enableArcLinkLabels={false}
                                arcLabelsTextColor={{
                                    from: "color",
                                    modifiers: [["darker", 2]],
                                }}
                                legends={[
                                    {
                                    anchor: "bottom",
                                    direction: "row",
                                    justify: false,
                                    translateX: 0,
                                    translateY: 30,
                                    itemsSpacing: 10,
                                    itemWidth: 80,
                                    itemHeight: 18,
                                    itemTextColor: "#555",
                                    symbolSize: 14,
                                    symbolShape: "circle",
                                    },
                                ]}
                            />
                            </>
                        )}
                        </Box>
                    </Box>
                </Grid>
            </CardContent>
        </Card>
  )
}

export default AttendanceTap