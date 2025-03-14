"use client";

import Link from "next/link";
import Image from "next/image";
import type { Bookmark } from "@/types";
import { Card, CardContent, Chip, Button } from "@mui/material";
import { getClassificationImage } from "@/utils/medImages";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { addBookmark } from "../actions";

export default function BookmarksPage({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  if (bookmarks.length === 0) return <p>Kamu belum menambahkan bookmark.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmark Saya</h1>

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
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
  );
}
