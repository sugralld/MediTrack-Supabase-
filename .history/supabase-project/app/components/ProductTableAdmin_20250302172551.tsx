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
import { Delete, Edit } from "@mui/icons-material";

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
            <TableCell className="text-white">Nama Obat</TableCell>
            <TableCell className="text-white">Harga</TableCell>
            <TableCell className="text-white">Stok</TableCell>
            <TableCell className="text-white">Golongan</TableCell>
            <TableCell className="text-white">Sediaan</TableCell>
            <TableCell className="text-white">Deskripsi</TableCell>
            <TableCell className="text-white text-right">Gambar</TableCell>
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
                    label={price}
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell className="text-white">{stock}</TableCell>
                <TableCell>
                  <Chip
                    label={classification}
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={category}
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell className="text-white">{description}</TableCell>
                <TableCell className="text-white">
                    <Image src={image_url} alt="image"/>
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
      
    </TableContainer>
  );
};

export default ProductTableAdmin;
