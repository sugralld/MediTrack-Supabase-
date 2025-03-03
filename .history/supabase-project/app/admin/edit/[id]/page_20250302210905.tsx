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
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getMedicineById, editMedicine, deleteMedicine } from "@/app/actions";

const EditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    classification: "",
    category: "",
    image_url: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicineData = await getMedicineById(id);
        if (!medicineData) {
          throw new Error("Failed to fetch medicine details.");
        }
        setFormData(medicineData);
      } catch (error) {
        setError("Failed to load medicine details.");
      } finally {
        setIsLoading(false);
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
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Data sebelum dikirim:", formData);

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.classification ||
      formData.stock < 0
    ) {
      setError("Please fill in all the fields correctly!");
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      await editMedicine(id, formData);
      console.log("Update berhasil, redirect ke home...");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error saat update:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <CircularProgress />
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );
    if (!confirmDelete) return;

    try {
      await deleteMedicine(id);
      router.push("/");
    } catch (error) {
      setError("Failed to delete medicine. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4 mt-6">
        <IconButton
          onClick={() => router.push("/admin/dashboard")}
          className="mr-2"
        >
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Update Detail Obat
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <TextField
          label="Nama"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
        />

        <FormControl>
          <InputLabel id="classification-label">Golongan</InputLabel>
          <Select
            labelId="classification-label"
            name="classification"
            value={formData.classification}
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
          <InputLabel id="category-label">Sediaan</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formData.category}
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
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full text-center"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Harga"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full text-center"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Deskripsi"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          variant="outlined"
          className="w-full"
        />

        <TextField
          label="Image URL"
          name="image_url"
          value={formData.image_url}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
        />

        <div className="flex justify-between">
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Hapus
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isUpdating}
            className="w-[120px] px-4 py-2"
          >
            {isUpdating ? "Processing..." : "Update"}
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default EditPage;
