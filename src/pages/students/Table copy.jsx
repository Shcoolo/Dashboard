import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Toolbar,
  Stack,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


// Dummy Data
const dummyData = [
  { id: 1, name: "Item One", description: "Description One" },
  { id: 2, name: "Item Two", description: "Description Two" },
  { id: 3, name: "Item Three", description: "Description Three" },
];

// Component
export default function ItemTablePage() {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  // Mock fetching data (replace with useQuery if needed)
  const data = dummyData;
  const isLoading = false;

  const handleDelete = (id) => {
    setDialogContent(`Delete item with ID ${id}?`);
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    setDialogContent(`Edit item with ID ${id}`);
    setDialogOpen(true);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90, sortable: false, resizable: false },
    { field: "name", headerName: "Name", width: 200, sortable: false, resizable: false },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      sortable: false,
      resizable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box p={3}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
          borderRadius: 1,
          mb: 2,
        }}
      >
        <Typography variant="h5">Item Management</Typography>
        <Button variant="contained" startIcon={<Add />}>Add New Item</Button>
      </Toolbar>

      {/* Filter Section */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          type="date"
          label="From"
          InputLabelProps={{ shrink: true }}
          value={dateFilter.from}
          onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
        />
        <TextField
          type="date"
          label="To"
          InputLabelProps={{ shrink: true }}
          value={dateFilter.to}
          onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
        />
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            const csv = filteredData.map(({ id, name, description }) =>
              `${id},${name},${description ?? ""}`
            );
            const csvContent = ["ID,Name,Description", ...csv].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "items.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export CSV
        </Button>
      </Stack>

      <Box height={500}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnReorder
        />
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Action</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
