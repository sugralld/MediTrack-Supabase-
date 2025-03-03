"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Bookmark } from "@/types";
import { Card, CardContent, Chip, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { removeBookmark } from "../actions"; // Pastikan kamu ada action buat hapus

export default function BookmarksPage({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  if (bookmarks.length === 0) return <p>Kamu belum menambahkan bookmark.</p>;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState<string | null>(
    null
  );

  const handleDelete = async () => {
    if (!selectedBookmarkId) return;
    await removeBookmark(selectedBookmarkId);
    setOpenDialog(false);
    // Optional: refresh halaman setelah hapus
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmark Saya</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <Card
              className="rounded-2xl shadow-md p-2 transition-all duration-300 cursor-pointer 
        hover:outline hover:outline-blue-300 active:outline-blue-200"
            >
              <Link href={`/detail/${bookmark.medicines.id}`} passHref>
                <CardContent className="flex flex-col gap-2">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">
                        {bookmark.medicines.name}
                      </h2>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.preventDefault(); // Supaya gak masuk detail
                          setSelectedBookmarkId(bookmark.id);
                          setOpenDialog(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" className="text-red-500" />
                      </IconButton>
                    </div>
                    <div className="items-center">
                      <Image
                        src={bookmark.medicines.image_url}
                        alt={bookmark.medicines.name}
                        width={200}
                        height={25}
                        className="mt-1 mx-auto"
                      />
                    </div>
                  </div>

                  <div className="justify-between flex flex-wrap gap-2 mb-1">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <Chip
                        label={bookmark.medicines.category}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={bookmark.medicines.classification}
                        color="secondary"
                        variant="outlined"
                      />
                    </div>
                  </div>

                  <hr className="border-gray-300 my-1" />
                  <div className="flex justify-center">
                    <p className="text-black-600 font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "IDR",
                      }).format(bookmark.medicines.price)}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        ))}
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Hapus Bookmark</DialogTitle>
        <DialogContent>
          <p>Apakah kamu yakin ingin menghapus bookmark ini?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button onClick={handleDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
