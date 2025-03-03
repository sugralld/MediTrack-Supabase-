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
import { getLabelImage } from "@/utils/medLabelImages";
import Image from "next/image";

const DetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [medData, setMedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [medicine, setMedicine] = useState({
    medName: "",
    medDesc: "",
    medNetContent: "",
    medLabel: "",
    medFormulation: "",
    medStock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch medicine details.");
        }

        const data = await response.json();
        setMedData(data.interpretation);
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
      const response = await fetch(`/api/interpretations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete medicine.");
      }

      router.push("/");
    } catch (error) {
      setError("Failed to delete medicine. Please try again.");
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <p className="text-red-500">{error}</p>;

  const selectedImage = getLabelImage(medData.medLabel);

  return (
    <Paper elevation={3} className="p-6 bg-white shadow-md rounded-xl w-full mt-6">
      {/* Header dengan tombol kembali */}
      <div className="flex items-center mb-4">
        <IconButton onClick={() => router.push("/")} className="mr-2">
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Detail Obat
        </Typography>
      </div>

      {medData && (
        <div className="p-6 rounded-md bg-gray-50">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={selectedImage}
              alt="Logo"
              width={25}
              height={25}
              className="rounded-full mt-1"
            />
            <div>
              <Typography variant="h6" fontWeight="bold">
                {medData.medName}
              </Typography>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Chip
              label={medData.medFormulation}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={medData.medLabel}
              color="secondary"
              variant="outlined"
            />
          </div>

          {/* Informasi */}
          <div className="space-y-2">
            <Typography className="text-gray-500">
              <strong className="text-black">Dosis:</strong>{" "}
              {medData.medNetContent}
            </Typography>
            <Typography className="text-gray-500">
              <strong className="text-black">Stok:</strong> {medData.medStock}
            </Typography>
          </div>

          {/* Garis Pembatas */}
          <Divider className="my-4" />

          {/* Deskripsi beda baris */}
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              Deskripsi:
            </Typography>
            <Typography>{medData.medDesc}</Typography>
          </div>
        </div>
      )}

      {/* Button Actions */}
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
