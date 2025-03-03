import { Card, CardContent } from "@mui/material";
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
    <Card className="rounded-2xl shadow-md p-4">
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">
              {name} {price}
            </h2>
            <Image
              src={image_url}
              alt={name}
              width={25}
              height={25}
              className="rounded-lg mt-1"
            />
          </div>

          <Image
            src={selectedImage}
            alt={name}
            width={25}
            height={25}
            className="rounded-lg mt-1"
          />
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            {classification}
          </span>
        </div>

        <hr className="border-gray-300 my-2" />

        <div className="flex justify-between items-end">
          <div>
            <p className="text-green-600 font-semibold">
              Stok tersisa: {stock}
            </p>
          </div>
          <div className="text-right">
            <Link
              href={`/detail/${id}`}
              className="text-base px-3 py-1 bg-gray-400 text-white rounded-full"
            >
              DETAIL
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
