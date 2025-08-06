import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { studentsData } from "../../data/students";

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: "", age: "", grade: "" });

  useEffect(() => {
    if (isEdit) {
      const student = studentsData.find((s) => s.id === parseInt(id));
      if (student) setForm(student);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.grade) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    if (isEdit) {
      alert("تم تعديل بيانات الطالب بنجاح (مؤقت)");
    } else {
      alert("تمت إضافة الطالب بنجاح (مؤقت)");
    }

    navigate("/");
  };

  return (
    <Box p={4} maxWidth="600px" margin="auto">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" mb={2}>
          {isEdit ? "تعديل بيانات الطالب" : "إضافة طالب جديد"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="الاسم"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="العمر"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="الصف"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            margin="normal"
          />
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              {isEdit ? "حفظ التعديلات" : "إضافة"}
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              رجوع
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
