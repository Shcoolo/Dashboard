import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function SuperviseSectionsPage() {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      filterType: "attendance", // default filter
      sectionId: "",
      termId: "",
      subjectId: "",
      date: "",
    },
  });

  // Fake data
  const sections = [
    { id: 1, name: "الشعبة الأولى" },
    { id: 2, name: "الشعبة الثانية" },
  ];

  const terms = [
    { id: 1, name: "الفصل الأول" },
    { id: 2, name: "الفصل الثاني" },
  ];

  const subjects = [
    { id: 1, name: "رياضيات" },
    { id: 2, name: "علوم" },
    { id: 3, name: "لغة عربية" },
  ];

  const students = [
    { id: 1, name: "أحمد محمد", number: "2023001" },
    { id: 2, name: "سارة علي", number: "2023002" },
    { id: 3, name: "محمد خالد", number: "2023003" },
  ];

  const filterType = watch("filterType");

  const onSubmit = (data) => {
    console.log("Form data:", data);
    alert("تم الحفظ بنجاح ✅");
  };

  return (
    <Box sx={{ p: 3, fontFamily: "Tajawal" }}>
      <Typography variant="h4" gutterBottom>
        الإشراف على الشعب
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          خيارات الفلترة
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 2,
          }}
        >
          {/* Filter type */}
          <Controller
            name="filterType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>نوع الفلترة</InputLabel>
                <Select {...field} label="نوع الفلترة">
                  <MenuItem value="attendance">الحضور</MenuItem>
                  <MenuItem value="grades">الدرجات</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          {/* Common fields */}
          <Controller
            name="sectionId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>الشعبة</InputLabel>
                <Select {...field} label="الشعبة">
                  {sections.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="termId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>الفصل</InputLabel>
                <Select {...field} label="الفصل">
                  {terms.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          {/* Conditional fields */}
          {filterType === "attendance" ? (
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="date" label="التاريخ" InputLabelProps={{ shrink: true }} />
              )}
            />
          ) : (
            <Controller
              name="subjectId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>المادة</InputLabel>
                  <Select {...field} label="المادة">
                    {subjects.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          )}
        </Box>
      </Paper>

      {/* Students Table */}
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          قائمة الطلاب
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>الرقم</TableCell>
                <TableCell>الاسم</TableCell>
                {filterType === "attendance" ? (
                  <TableCell>الحضور</TableCell>
                ) : (
                  <TableCell>الدرجة</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.number}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {filterType === "attendance" ? (
                      <Switch color="primary" />
                    ) : (
                      <TextField type="number" size="small" sx={{ width: 80 }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              حفظ التغييرات
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
