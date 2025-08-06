import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Toolbar,
  Stack,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { number, object, string } from "yup";

// Schema validation
const itemSchema = object({
  id: number(),
  name: string().min(1),
  description: string().optional(),
});

// API Calls
const fetchItems = async () => {
  const res = await axios.get("/api/items");
  return res.data;
};

const deleteItem = async (id) => {
  await axios.delete(`/api/items/${id}`);
};

// Component
export default function TablePage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (id) => {
    console.log("Edit item", id);
    // Redirect or open dialog here
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", flex: 1 },
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
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Item Management</Typography>
        <Button variant="contained" startIcon={<Add />}>Add New Item</Button>
      </Toolbar>

      <Stack direction="row" spacing={2} my={2}>
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
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
