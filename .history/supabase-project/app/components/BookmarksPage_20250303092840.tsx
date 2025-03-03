"use client";

import Link from "next/link";
import Image from "next/image";
import type { Bookmark } from "@/types";

export default function BookmarksPage({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
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
            <Card
              className="rounded-2xl shadow-md p-2 transition-all duration-300 cursor-pointer 
        hover:outline hover:outline-blue-300 active:outline-blue-200"
            >
              <Link href={`/detail/${bookmark.medicines.id}`} passHref>
                <CardContent className="flex flex-col gap-2">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">{bookmark.medicines.name}</h2>
                      <Image
                        src={bookmark.medicines.selectedImage}
                        alt={name}
                        width={25}
                        height={25}
                        className="rounded-lg mt-1"
                      />
                    </div>
                    <div className="items-center">
                      <Image
                        src={image_url}
                        alt={name}
                        width={200}
                        height={25}
                        className="mt-1 mx-auto"
                      />
                    </div>
                  </div>

                  <div className="justify-between flex flex-wrap gap-2 mb-1">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <Chip
                        label={category}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={classification}
                        color="secondary"
                        variant="outlined"
                      />
                    </div>
                    {/* Bookmark Button */}
                    <div>
                      <Tooltip
                        title={
                          isBookmarked
                            ? "Sudah ditambahkan"
                            : "Tambah ke Bookmark"
                        }
                      >
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault(); // Supaya gak masuk ke detail
                            handleBookmark();
                          }}
                          disabled={isPending || isBookmarked}
                          size="small"
                        >
                          <Bookmark
                            size={20}
                            color={isBookmarked ? "#FACC15" : "#9CA3AF"} // Kuning kalau sukses
                            className={isPending ? "animate-spin" : ""}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>

                  <hr className="border-gray-300 my-1" />
                  <div className="flex justify-center">
                    <p className="text-black-600 font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "IDR",
                      }).format(price)}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
