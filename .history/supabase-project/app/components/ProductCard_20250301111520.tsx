import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getLabelImage } from "@/utils/medLabelImages";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  stock,
  classification,
  category,
  image_url,
}) => {
  const selectedImage = getLabelImage(classification);
  return (
    <Card className="rounded-2xl shadow-md p-4">
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-500">{description}</p>
          </div>

          <Image
            src={selectedImage}
            alt="Label"
            width={25}
            height={25}
            className="rounded-full mt-1"
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
            <p className="text-green-600 font-semibold">Stok tersisa: {stock}</p>
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
