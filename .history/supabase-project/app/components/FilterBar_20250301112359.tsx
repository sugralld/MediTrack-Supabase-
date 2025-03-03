"use client";

import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Search, XCircle } from "lucide-react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  onSort: (order: "A-Z" | "Z-A") => void;
}

const categories = [
  "Semua",
  "Obat Bebas",
  "Obat Bebas Terbatas",
  "Obat Keras",
  "Psikotropika",
];

const sortOptions = [
  { label: "A-Z", value: "A-Z" },
  { label: "Z-A", value: "Z-A" },
];

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onFilter,
  onSort,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [sort, setSort] = useState("A-Z");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleFilter = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  const handleSort = (e: SelectChangeEvent<string>) => {
    const value = e.target.value as "A-Z" | "Z-A";
    setSort(value);
    onSort(value);
  };

  return (
    <Paper elevation={3} className="p-4 bg-white shadow-md rounded-xl w-full">
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Search Bar */}
        <Grid item xs={4} md={5} lg={8}>
          <Paper
            elevation={1}
            className="flex items-center border rounded-lg overflow-hidden shadow-sm p-1 w-full"
          >
            <Search className="w-5 h-5 mx-2 text-gray-500" />
            <TextField
              variant="standard"
              placeholder="Cari obat..."
              value={search}
              onChange={handleSearch}
              fullWidth
              InputProps={{ disableUnderline: true }}
            />
            {search && (
              <IconButton
                size="small"
                className="text-gray-400"
                onClick={() => {
                  setSearch("");
                  onSearch("");
                }}
              >
                <XCircle className="w-5 h-5" />
              </IconButton>
            )}
          </Paper>
        </Grid>

        {/* Filter Select */}
        <Grid item xs={6} md={3} lg={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={handleFilter}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sort Select */}
        <Grid item xs={6} md={3} lg={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Urutkan</InputLabel>
            <Select value={sort} onChange={handleSort}>
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;
