"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { getMedicineById, deleteMedicine } from "@/app/actions";
import { getClassificationImage } from "@/utils/medImages";

const DetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [medicine, setMedicine] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicineData = await getMedicineById(id);
        if (!medicineData) {
          throw new Error("Failed to fetch medicine details.");
        }
        setMedicine(medicineData);
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

  if (isLoading) return <CircularProgress />;
  if (error) return <p className="text-red-500">{error}</p>;

  const selectedImage = getClassificationImage(medicine.classification);

  return (
    <Paper
      elevation={3}
      className="p-6 bg-white shadow-md rounded-xl w-full mt-6"
    >
      <div className="flex items-center mb-4">
        <IconButton onClick={() => router.push("/")} className="mr-2">
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Detail Obat
        </Typography>
      </div>

      {medicine && (
        <div className="p-6 rounded-md bg-gray-50 flex gap-6">
          {/* Image di sebelah kiri */}
          <div>
            <Image
              src={medicine.image_url}
              alt="Medicine Image"
              width={400}
              height={25}
            />
          </div>

          {/* Konten di sebelah kanan */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={selectedImage}
                alt="Classification"
                width={25}
                height={25}
                className="rounded-full mt-1"
              />
              <div>
                <Typography variant="h6" fontWeight="bold">
                  {medicine.name}
                </Typography>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Chip
                label={medicine.category}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={medicine.classification}
                color="secondary"
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <Typography className="text-gray-500">
                <strong className="text-black">Harga:</strong>{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "IDR",
                }).format(medicine.price)}
              </Typography>
              <Typography className="text-gray-500">
                <strong className="text-black">Dosis:</strong>{" "}
                {medicine.description}
              </Typography>
              <Typography className="text-gray-500">
                <strong className="text-black">Stok:</strong> {medicine.stock}
              </Typography>
            </div>

            <Divider className="my-4" />

            <div>
              <Typography variant="subtitle1" fontWeight="bold">
                Deskripsi:
              </Typography>
              <Typography>{medicine.description}</Typography>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push(`/edit/${id}`)}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Hapus
        </Button>
      </div>

      {error && (
        <Typography color="error" className="mt-4">
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default DetailPage;
