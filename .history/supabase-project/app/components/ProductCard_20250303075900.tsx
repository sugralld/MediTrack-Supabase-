import { Card, CardContent, Chip, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getClassificationImage } from "@/utils/medImages";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { addBookmark } from "../actions";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  stock,
  classification,
  category,
  image_url,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    startTransition(async () => {
      try {
        await addBookmark(id);
        setIsBookmarked(true);
      } catch (error) {
        console.error("Error adding bookmark:", error);
      }
    });
  };

  const selectedImage = getClassificationImage(classification);

  return (
    <Card
      className="rounded-2xl shadow-md p-2 transition-all duration-300 cursor-pointer 
        hover:outline hover:outline-blue-300 active:outline-blue-200"
    >
      <Link href={`/detail/${id}`} passHref>
        <CardContent className="flex flex-col gap-2">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{name}</h2>
              <Image
                src={selectedImage}
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

          <div className="flex flex-wrap gap-2 mb-1">
            <div></div>
            <Chip label={category} color="primary" variant="outlined" />
            <Chip label={classification} color="secondary" variant="outlined" />
            {/* Bookmark Button */}
            <div className="">
              <Tooltip
                title={
                  isBookmarked ? "Sudah ditambahkan" : "Tambah ke Bookmark"
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
  );
};

export default ProductCard;
