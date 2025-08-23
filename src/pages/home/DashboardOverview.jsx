import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

const DashboardOverview = () => {
  // Dummy data
  const attendanceTrend = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 88 },
    { month: 'Mar', attendance: 95 },
    { month: 'Apr', attendance: 90 },
  ];

  const avgGrades = [
    { subject: 'Math', grade: 85 },
    { subject: 'Science', grade: 78 },
    { subject: 'English', grade: 92 },
    { subject: 'History', grade: 80 },
  ];

  const feeStatus = [
    { name: 'Completed', value: 750 },
    { name: 'Pending', value: 250 },
  ];
  const COLORS = ['#4CAF50', '#F44336'];

  const kpis = [
    { label: 'Total Students', value: 12 },
    { label: 'Teachers', value: 8 },
    { label: 'Classes', value: 4 },
    { label: 'Attendance %', value: '91%' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={4}>
      {/* KPI Cards */}
      <Grid container spacing={3}>
        {kpis.map((kpi, idx) => (
          <Box flex={1} >
            <Card sx={{ bgcolor: 'background.paper', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {kpi.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Attendance Line Chart */}
        <Box flex={1}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Attendance Trend
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Box>

        {/* Average Grades Bar Chart */}
        <Box flex={1}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Average Grades per Subject
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={avgGrades}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="grade" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Box>

        {/* Fee Collection Donut */}
        <Box flex={1}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
            Completing the midterm study
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feeStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  {feeStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Box>
      </Grid>
      </Stack>
    </Box>
  );
};

export default DashboardOverview;
