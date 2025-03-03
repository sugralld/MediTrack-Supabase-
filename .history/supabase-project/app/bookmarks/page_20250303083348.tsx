"use client";

import { useEffect, useState } from "react";
import { getUserBookmarks } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";

interface Bookmark {
  id: string;
  medicine_id: string;
  medicines: Medicine;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getUserBookmarks();
        setBookmarks(data);
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) return <p>Loading bookmarks...</p>;

  if (bookmarks.length === 0) return <p>Kamu belum menambahkan bookmark.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmark Saya</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Link href={`/detail/${bookmark.medicine_id}`}>
              <Image
                src={bookmark.medicines.image_url}
                alt={bookmark.medicines.name}
                width={300}
                height={200}
                className="rounded-md mb-2"
              />
              <h2 className="text-xl font-semibold">
                {bookmark.medicines.name}
              </h2>
              <p className="text-gray-600">{bookmark.medicines.description}</p>
              <p className="text-black font-bold mt-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(bookmark.medicines.price)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
