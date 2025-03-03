"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    medName: "",
    medDesc: "",
    medNetContent: "",
    medLabel: "",
    medFormulation: "",
    medStock: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value, // name sesuai dengan key di state
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.medName ||
      !formData.medDesc ||
      !formData.medFormulation ||
      !formData.medLabel ||
      !formData.medNetContent ||
      formData.medStock === undefined
    ) {
      setError("Please fill in all the fields!");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpretations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          medStock: Number(formData.medStock), // pastikan dikonversi ke integer
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create interpretation.");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8 mt-6">Tambahkan Obat Baru</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <TextField
          label="Nama"
          name="medName"
          value={formData.medName}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
        />

        <TextField
          label="Dosis"
          name="medNetContent"
          value={formData.medNetContent}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
        />

        <FormControl>
          <InputLabel id="medLabel-label">Golongan</InputLabel>
          <Select
            labelId="medLabel-label"
            name="medLabel"
            value={formData.medLabel}
            onChange={handleSelectChange}
            label="Golongan"
            className="w-full border rounded-md"
          >
            <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
            <MenuItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</MenuItem>
            <MenuItem value="Obat Keras">Obat Keras</MenuItem>
            <MenuItem value="Psikotropika">Obat Psikotropika</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="medFormulation-formulation">Sediaan</InputLabel>
          <Select
            labelId="medFormulation-formulation"
            name="medFormulation"
            value={formData.medFormulation}
            onChange={handleSelectChange}
            label="Sediaan"
            className="w-full border rounded-md"
          >
            <MenuItem value="Tablet">Tablet</MenuItem>
            <MenuItem value="Kapsul">Kapsul</MenuItem>
            <MenuItem value="Sirup">Sirup</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Stok"
          name="medStock"
          type="number"
          value={formData.medStock}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full text-center"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Deskripsi"
          name="medDesc"
          value={formData.medDesc}
          onChange={handleInputChange}
          multiline
          rows={4}
          variant="outlined"
          className="w-full"
        />

        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            className="w-[120px] px-4 py-2"
          >
            {isLoading ? "Processing..." : "Tambah"}
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreatePage;
