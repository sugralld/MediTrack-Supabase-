import { Card, CardContent, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getClassificationImage } from "@/utils/medImages";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

interface ProductCardProps {
  id: number;
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

  const handleBookmark = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("Kamu harus login dulu!");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("bookmarks").insert({
      user_id: session.user.id,
      medicine_id: id,
    });

    if (error) {
      console.error("Gagal menambahkan bookmark:", error.message);
      alert("Gagal menambahkan bookmark.");
    } else {
      alert("Berhasil menambahkan ke bookmark!");
    }

    setLoading(false);
  };

  const selectedImage = getClassificationImage(classification);
  return (
    <Card
        className="rounded-2xl shadow-md p-2 transition-all duration-300 cursor-pointer 
        hover:outline hover:outline-blue-300 active:outline-blue-200"
      ><Link href={`/detail/${id}`} passHref>
      
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
            <Chip label={category} color="primary" variant="outlined" />
            <Chip label={classification} color="secondary" variant="outlined" />
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
