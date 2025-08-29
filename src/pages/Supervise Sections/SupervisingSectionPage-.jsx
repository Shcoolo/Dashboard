import React, { useMemo, useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {attendanceSchema} from './FilterValidation'
import { useSections } from "../../hooks/useSections";
import { useTerms } from '../../hooks/useTerms';
import { useSubjects } from "../../hooks/useSubjects";
import { useStudents } from '../../hooks/useStudents';

const api = axios.create({ baseURL: "/api" });
/**
 * Fake endpoints (replace with your real backend):
 * - GET  /sections
 * - GET  /terms
 * - GET  /subjects?sectionId=8
 * - GET  /sections/:id/students
 * - POST /attendance/bulk  [{ student_id, date, section_id, term_id, status }]
 * - POST /grades/bulk      [{ student_id, section_id, term_id, subject_id, grade }]
 


/**
 * Mutations
 */
const useBulkAttendance = () =>
  useMutation({
    mutationFn: async (payload) => (await api.post("/attendance/bulk", payload)).data,
  });
const useBulkGrades = () =>
  useMutation({
    mutationFn: async (payload) => (await api.post("/grades/bulk", payload)).data,
  });

/**
 * Pretty helpers
 */
const SectionCard = ({ children }) => (
  <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
    <CardContent sx={{ p: 2.5 }}>{children}</CardContent>
  </Card>
);

export default function SuperviseSectionsPage() {
  const qc = useQueryClient();

  // UI mode: attendance | grades
  const [mode, setMode] = useState("attendance");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(attendanceSchema),
    defaultValues: {
      mode: "attendance",
      sectionId: "",
      termId: "",
      date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
      subjectId: "",
    },
  });

  // watch fields for dependent queries
  const sectionId = watch("sectionId");
  const termId = watch("termId");
  const date = watch("date");

  // queries
  const sections = useSections();
  const terms = useTerms();
  const subjects = useSubjects();
  const students = useStudents(); //sectionId

  const attendanceMut = useBulkAttendance();
  const gradesMut = useBulkGrades();

  // table selection state
  const [selected, setSelected] = useState([]); // student ids
  const [gradeInputs, setGradeInputs] = useState({}); // {studentId: value}
  const [attendanceSwitch, setAttendanceSwitch] = useState({}); // {studentId: true/false}

  const toggleSelect = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const allSelected = useMemo(() => {
    return students.data?.length && selected.length === students.data.length;
  }, [selected, students.data]);

  const toggleSelectAll = () => {
    if (!students.data) return;
    setSelected((prev) => (prev.length === students.data.length ? [] : students.data.map((s) => s.id)));
  };

  const onSubmit = (values) => {
    if (!students.data || selected.length === 0) return;

    if (mode === "attendance") {
      const payload = selected.map((sid) => ({
        student_id: sid,
        section_id: values.sectionId,
        term_id: values.termId,
        date: values.date,
        status: attendanceSwitch[sid] ? "present" : "absent",
      }));
      attendanceMut.mutate(payload, {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["students", values.sectionId] });
        },
      });
    } else {
      const payload = selected.map((sid) => ({
        student_id: sid,
        section_id: values.sectionId,
        term_id: values.termId,
        subject_id: values.subjectId,
        grade: Number(gradeInputs[sid] ?? 0),
      }));
      gradesMut.mutate(payload, {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["students", values.sectionId] });
        },
      });
    }
  };

  const isLoadingAnything = sections.isLoading || terms.isLoading || students.isLoading || (mode === "grades" && subjects.isLoading);
  const isErrorAnything = sections.isError || terms.isError || students.isError || (mode === "grades" && subjects.isError);

  return (
    <Box sx={{ minHeight: "100vh"}}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: "blur(6px)", borderBottom: (t) => `1px solid ${t.palette.divider}` }}>
        <Toolbar>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Supervising of Section</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Box maxWidth={1200} mx="auto" p={2.5}>
        {/* Filter Section */}
        <SectionCard>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
            <FormControl>
              <RadioGroup
                row
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                aria-label="mode"
              >
                <FormControlLabel value="attendance" control={<Radio />} label="Attendence" />
                <FormControlLabel value="grades" control={<Radio />} label="Grades" />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {/* Section */}
            <Controller
              name="sectionId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.sectionId}>
                  <InputLabel id="section-label">Section</InputLabel>
                  <Select labelId="section-label" label="section" {...field}>
                    {sections?.data?.map((s) => (
                      <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.sectionId?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Term */}
            <Controller
              name="termId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.termId}>
                  <InputLabel id="term-label">Term</InputLabel>
                  <Select labelId="term-label" label="term" {...field}>
                    {terms.data?.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.termId?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Date (attendance mode) */}
            {mode === "attendance" && (
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} error={!!errors.date} helperText={errors.date?.message} {...field} />
                )}
              />
            )}

            {/* Subject (grades mode) */}
            {mode === "grades" && (
              <Controller
                name="subjectId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.subjectId}>
                    <InputLabel id="subject-label">Subject</InputLabel>
                    <Select labelId="subject-label" label="Subject" {...field} disabled={!sectionId || subjects.isLoading}>
                      {subjects?.data?.map((subj) => (
                        <MenuItem key={subj.id} value={subj.id}>{subj.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.subjectId?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            )}
          </Stack>

          {isLoadingAnything && (
            <Stack mt={2} direction="row" spacing={1} alignItems="center">
              <CircularProgress size={22} />
              <Typography variant="body2">جاري تحميل البيانات…</Typography>
            </Stack>
          )}

          {isErrorAnything && (
            <Alert sx={{ mt: 2 }} severity="error">تعذر تحميل بيانات الفلاتر. حاول مجددًا.</Alert>
          )}
        </SectionCard>

        {/* Table Section */}
        <Box mt={2.5}>
          <SectionCard>
            <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" mb={2} gap={1}>
              <Typography variant="h6" fontWeight={700}>الطلاب ضمن الشعبة</Typography>
              <Stack direction="row" spacing={1}>
                <FormControlLabel control={<Checkbox checked={!!allSelected} onChange={toggleSelectAll} />} label="تحديد الكل" />
                <Chip variant="outlined" color={mode === "attendance" ? "success" : "info"} label={mode === "attendance" ? "إدخال الحضور" : "إدخال الدرجات"} />
              </Stack>
            </Stack>

            {students.isLoading && (
              <Box py={6} textAlign="center"><CircularProgress /></Box>
            )}

            {students.isError && (
              <Alert severity="error">تعذر تحميل الطلاب.</Alert>
            )}

            {students.data && (
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: "hidden", border: (t) => `1px solid ${t.palette.divider}` }}>
                <Table size="small" sx={{
                  "& th": { bgcolor: (t) => (t.palette.mode === "dark" ? "#101624" : "#F5F8FA"), fontWeight: 700 },
                  "& td, & th": { borderBottom: (t) => `1px solid ${t.palette.divider}` },
                }}>
                  <TableHead>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell align="center"><Checkbox checked={!!allSelected} onChange={toggleSelectAll} /></TableCell>
                      <TableCell>الاسم</TableCell>
                      <TableCell>الرقم</TableCell>
                      <TableCell>الشعبة</TableCell>
                      {mode === "attendance" ? (
                        <TableCell align="center">الحضور</TableCell>
                      ) : (
                        <TableCell align="center">الدرجة</TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.data.map((st) => {
                      const checked = selected.includes(st.id);
                      return (
                        <TableRow key={st.id} hover sx={{ height: 64 }}>
                          <TableCell align="center">
                            <Checkbox checked={checked} onChange={() => toggleSelect(st.id)} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>{st.name}</TableCell>
                          <TableCell>{st.code || st.number || st.id}</TableCell>
                          <TableCell>{st.section_name || "-"}</TableCell>

                          {mode === "attendance" ? (
                            <TableCell align="center">
                              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <Typography variant="body2">غائب</Typography>
                                <Switch
                                  checked={!!attendanceSwitch[st.id]}
                                  onChange={(e) => setAttendanceSwitch((p) => ({ ...p, [st.id]: e.target.checked }))}
                                  disabled={!checked}
                                />
                                <Typography variant="body2">حاضر</Typography>
                              </Stack>
                            </TableCell>
                          ) : (
                            <TableCell align="center">
                              <TextField
                                size="small"
                                type="number"
                                inputProps={{ min: 0, max: 100, step: 0.5, style: { textAlign: "center", width: 100 } }}
                                value={gradeInputs[st.id] ?? ""}
                                onChange={(e) => setGradeInputs((p) => ({ ...p, [st.id]: e.target.value }))}
                                disabled={!checked}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" mt={2} gap={1}>
              <Typography variant="body2" color="text.secondary">
                الطلاب المحددون: {selected.length}
              </Typography>

              <Stack direction="row" spacing={1}>
                {(attendanceMut.isError || gradesMut.isError) && (
                  <Alert severity="error">حدث خطأ أثناء الحفظ.</Alert>
                )}
                {(attendanceMut.isSuccess || gradesMut.isSuccess) && (
                  <Alert severity="success">تم الحفظ بنجاح.</Alert>
                )}

                <Button
                  variant="contained"
                  color={mode === "attendance" ? "success" : "info"}
                  disabled={selected.length === 0 || attendanceMut.isPending || gradesMut.isPending}
                  onClick={handleSubmit(onSubmit)}
                >
                  {attendanceMut.isPending || gradesMut.isPending ? (
                    <Stack direction="row" spacing={1} alignItems="center"><CircularProgress size={18} /> <span>جاري الحفظ…</span></Stack>
                  ) : mode === "attendance" ? "حفظ الحضور" : "حفظ الدرجات"}
                </Button>
              </Stack>
            </Stack>
          </SectionCard>
        </Box>
      </Box>
    </Box>
  );
}
