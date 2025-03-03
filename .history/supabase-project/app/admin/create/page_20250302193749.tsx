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
import { Add } from "@mui/icons-material";
import { addMedicine } from "../../actions";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    classification: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null); // State untuk file gambar
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "stock" ? Number(value) : value, // Pastikan angka dikonversi
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (
      !formData.name ||
      !formData.description ||
      formData.price <= 0 ||
      formData.stock < 0 ||
      !formData.classification ||
      !formData.category ||
      !imageFile
    ) {
      setError("Harap isi semua field dengan benar dan unggah gambar!");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("stock", formData.stock.toString());
      formDataToSend.append("classification", formData.classification);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("image", imageFile); // Kirim file gambar

      await addMedicine(formDataToSend); // Panggil server action
      router.push("/"); // Redirect setelah sukses
    } catch (error) {
      console.error(error);
      setError("Gagal menambahkan obat. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-3 mt-8">Tambah Obat Baru</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <TextField
          label="Nama"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
        />

        <TextField
          label="Harga"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Stok"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          variant="outlined"
          className="w-full"
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

        <FormControl>
          <InputLabel id="classification-label">Klasifikasi</InputLabel>
          <Select
            labelId="classification-label"
            name="classification"
            value={formData.classification}
            onChange={handleSelectChange}
            label="Klasifikasi"
            className="w-full border rounded-md"
          >
            <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
            <MenuItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</MenuItem>
            <MenuItem value="Obat Keras">Obat Keras</MenuItem>
            <MenuItem value="Psikotropika">Psikotropika</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="category-label">Kategori</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            label="Kategori"
            className="w-full border rounded-md"
          >
            <MenuItem value="Tablet">Tablet</MenuItem>
            <MenuItem value="Kapsul">Kapsul</MenuItem>
            <MenuItem value="Sirup">Sirup</MenuItem>
          </Select>
        </FormControl>

        {/* Input File untuk Upload Gambar */}
        inpu
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            className="w-[120px] px-4 py-2"
            startIcon={<Add />}
          >
            {isLoading ? "Memproses..." : "Tambah"}
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreatePage;
