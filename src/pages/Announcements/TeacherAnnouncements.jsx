import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

const messagesMock = [
  {
    id: 1,
    sender: "Ahmed",
    subject: "Meeting Reminder",
    content: "Don't forget our meeting tomorrow at 10 AM."
  },
  {
    id: 2,
    sender: "Sara",
    subject: "Project Update",
    content: "The project is almost complete, just need final review."
  },
  {
    id: 3,
    sender: "John",
    subject: "Invoice",
    content: "Please find the attached invoice for last month."
  }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(messagesMock);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({
    sender: "",
    subject: "",
    content: ""
  });

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
  };

  const handleNewMessageOpen = () => {
    setOpenNewDialog(true);
  };

  const handleNewMessageClose = () => {
    setOpenNewDialog(false);
    setNewMessage({ sender: "", subject: "", content: "" });
  };

  const handleSendMessage = () => {
    if (newMessage.subject && newMessage.content) {
      setMessages([
        { ...newMessage, id: messages.length + 1 },
        ...messages
      ]);
      handleNewMessageClose();
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* زر إنشاء رسالة جديدة */}
      <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
        <Button variant="contained" color="primary" onClick={handleNewMessageOpen}>
          Create New Announcements
        </Button>
      </Box>

      {/* محتوى الصفحة */}
      <Grid container sx={{ flex: 1 }}>
        {/* العمود الأيسر - الرسائل */}
        <Grid item xs={4} sx={{ borderRight: "1px solid #ddd", overflowY: "auto" }}>
          {messages.map((msg) => (
            <Card
              key={msg.id}
              sx={{
                m: 1,
                cursor: "pointer",
                bgcolor: selectedMessage?.id === msg.id ? "grey.200" : "white"
              }}
              onClick={() => handleSelectMessage(msg)}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {msg.sender}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {msg.subject}
                </Typography>
                <Typography variant="body2" noWrap>
                  {msg.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* العمود الأيمن - تفاصيل الرسالة */}
        <Grid item xs={8} sx={{ p: 2 }}>
          {selectedMessage ? (
            <>
              <Typography variant="h6" fontWeight="bold">
                {selectedMessage.subject}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                From: {selectedMessage.sender}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>{selectedMessage.content}</Typography>
            </>
          ) : (
            <Typography variant="h6" color="text.secondary">
              اختر رسالة لعرض تفاصيلها
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Dialog - رسالة جديدة */}
      <Dialog open={openNewDialog} onClose={handleNewMessageClose} fullWidth maxWidth="sm">
        <DialogTitle>إنشاء رسالة جديدة</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="المرسل"
            value={newMessage.sender}
            onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
            fullWidth
          />
          <TextField
            label="الموضوع"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
            fullWidth
          />
          <TextField
            label="المحتوى"
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewMessageClose}>إلغاء</Button>
          <Button variant="contained" onClick={handleSendMessage}>
            إرسال
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
