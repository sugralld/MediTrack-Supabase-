import { Card, CardContent, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getClassificationImage } from "@/utils/medImages";

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
  const selectedImage = getClassificationImage(classification);
  return (
    <Link href={`/detail/${id}`} passHref>
      <Card className="rounded-2xl shadow-md p-4 transition-all duration-300 cursor-pointer 
        hover:outline hover:outline-blue-300 active:outline-blue-200">
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

          <div className="flex flex-wrap gap-2 mb-4">
            <Chip label={category} color="primary" variant="outlined" />
            <Chip label={classification} color="secondary" variant="outlined" />
          </div>

          <hr className="border-gray-300 my-2" />

          <div className="justitems-center">
            <div>
              <p className="text-black-600 font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "IDR",
                }).format(price)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
