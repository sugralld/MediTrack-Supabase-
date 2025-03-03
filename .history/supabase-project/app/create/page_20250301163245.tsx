"use client";

import { useFormState } from "react";
import { addMedicine } from "@/actions/medicineActions";
import { useRouter } from "next/navigation";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getMedicines } from "@/actions/medicineActions";

export default function CreatePage() {
  const [state, formAction] = useFormState(addMedicine, null);
  const [medicines, setMedicines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getMedicines();
      setMedicines(data);
    }
    fetchData();
  }, [state]); // UI akan update setelah submit form

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold my-8 mt-6">Tambah Obat Baru</h2>

      <form action={formAction} className="flex gap-3 flex-col">
        <TextField label="Nama" name="name" variant="outlined" className="w-full" required />
        <TextField label="Harga" name="price" type="number" variant="outlined" className="w-full" required />
        <TextField label="Stok" name="stock" type="number" variant="outlined" className="w-full" required />
        <TextField label="Deskripsi" name="description" multiline rows={4} variant="outlined" className="w-full" required />

        <FormControl required>
          <InputLabel id="classification-label">Klasifikasi</InputLabel>
          <Select labelId="classification-label" name="classification" label="Klasifikasi" className="w-full border rounded-md">
            <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
            <MenuItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</MenuItem>
            <MenuItem value="Obat Keras">Obat Keras</MenuItem>
            <MenuItem value="Psikotropika">Psikotropika</MenuItem>
          </Select>
        </FormControl>

        <FormControl required>
          <InputLabel id="category-label">Kategori</InputLabel>
          <Select labelId="category-label" name="category" label="Kategori" className="w-full border rounded-md">
            <MenuItem value="Tablet">Tablet</MenuItem>
            <MenuItem value="Kapsul">Kapsul</MenuItem>
            <MenuItem value="Sirup">Sirup</MenuItem>
          </Select>
        </FormControl>

        <TextField label="URL Gambar" name="image_url" variant="outlined" className="w-full" required />

        <div className="flex justify-center">
          <Button variant="contained" color="primary" type="submit" className="w-[120px] px-4 py-2" startIcon={<Add />}>
            Tambah
          </Button>
        </div>
      </form>

      {/* List Obat */}
      <h2 className="text-xl font-bold mt-8">Daftar Obat</h2>
      <ul className="space-y-2 mt-4">
        {medicines.length > 0 ? (
          medicines.map((med) => (
            <li key={med.id} className="border p-4 rounded-md shadow-md">
              <img src={med.image_url} alt={med.name} className="w-20 h-20 object-cover rounded-md mb-2" />
              <p className="text-lg font-semibold">{med.name}</p>
              <p className="text-sm">{med.description}</p>
              <p className="text-sm text-gray-600">Harga: Rp{med.price}</p>
              <p className="text-sm text-gray-600">Stok: {med.stock}</p>
              <p className="text-sm text-gray-600">Klasifikasi: {med.classification}</p>
              <p className="text-sm text-gray-600">Kategori: {med.category}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada data obat.</p>
        )}
      </ul>
    </main>
  );
}
