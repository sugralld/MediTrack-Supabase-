import { Card, CardContent, Chip, TableContainer, Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getClassificationImage } from "@/utils/medImages";

interface ProductTableProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}

const ProductTableAdmin: React.FC<{ products: ProductTableProps[] }> = ({
  products,
}) => {
  return (
    <TableContainer component={Paper} className="bg-gray-300">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-white">Name</TableCell>
            <TableCell className="text-white">Role</TableCell>
            <TableCell className="text-white">Joined</TableCell>
            <TableCell className="text-white">Status</TableCell>
            <TableCell className="text-white text-right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(
            ({
              id,
              name,
              description,
              price,
              stock,
              category,
              classification,
              image_url,
            }) => (
              <TableRow key={id}>
                <TableCell className="text-white">{name}</TableCell>
                <TableCell>
                  <Chip
                    label={member.role}
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell className="text-white">{member.joined}</TableCell>
                <TableCell>
                  <Chip
                    label={member.status}
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Edit />}
                    className="ml-2"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <Link href={`/detail/${id}`} passHref>
        <Card
          className="rounded-2xl shadow-md p-2 transition-all duration-300 cursor-pointer 
        hover:outline hover:outline-blue-300 active:outline-blue-200"
        >
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
              <Chip
                label={classification}
                color="secondary"
                variant="outlined"
              />
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
        </Card>
      </Link>
    </TableContainer>
  );
};

export default ProductTableAdmin;
