"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const members = [
  { id: 1, name: "admin", role: "Admin", joined: "Wed Nov 15 2023", status: "Active" },
  { id: 2, name: "Sokheng", role: "Admin", joined: "Wed Nov 15 2023", status: "Active" },
];

export default function AdminDashboard() {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="flex justify-between mb-4">
        <TextField
          label="Search by role, name"
          variant="outlined"
          size="small"
          className="bg-gray-800 rounded-lg"
          InputProps={{ className: "text-white" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary">
          Create+
        </Button>
      </div>

      <TableContainer component={Paper} className="bg-gray-900">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-black">Name</TableCell>
              <TableCell className="text-white">Role</TableCell>
              <TableCell className="text-white">Joined</TableCell>
              <TableCell className="text-white">Status</TableCell>
              <TableCell className="text-white text-right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="text-white">{member.name}</TableCell>
                <TableCell>
                  <Chip label={member.role} color="success" variant="outlined" />
                </TableCell>
                <TableCell className="text-white">{member.joined}</TableCell>
                <TableCell>
                  <Chip label={member.status} color="success" variant="outlined" />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outlined" color="error" size="small" startIcon={<Delete />}>
                    Delete
                  </Button>
                  <Button variant="outlined" color="primary" size="small" startIcon={<Edit />} className="ml-2">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
