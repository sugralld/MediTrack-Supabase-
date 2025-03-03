"use client";

import { useRouter, useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditPage = () => {
  const params = useParams();
  const id = params.id as string;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation.");
        }

        const data = await response.json();
        console.log(data);

        setFormData({
          medName: data.interpretation.medName,
          medDesc: data.interpretation.medDesc,
          medNetContent: data.interpretation.medNetContent,
          medLabel: data.interpretation.medLabel,
          medFormulation: data.interpretation.medFormulation,
          medStock: data.interpretation.medStock,
        });
      } catch (error) {
        setError("Failed to load interpretation.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "medStock" ? Number(value) : value,
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
      !formData.medStock
    ) {
      setError("Please fill in all the fields!");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/interpretations/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update interpretation.");
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
      <div className="flex items-center mb-4 mt-6">
        <IconButton onClick={() => router.push("/")} className="mr-2">
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Update Detail Obat
        </Typography>
      </div>

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
            {isLoading ? "Processing..." : "Update"}
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default EditPage;
