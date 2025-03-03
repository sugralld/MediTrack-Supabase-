"use client";

import Link from "next/link";
import Image from "next/image";
import type 

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}

interface Bookmark {
  id: string;
  medicine_id: string;
  medicines: Medicine;
}

export default function BookmarksPage({ bookmarks }: { bookmarks: Bookmark[] }) {
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
