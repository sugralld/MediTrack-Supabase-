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
  id: string;
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
            <TableCell>Nama Obat</TableCell>
            <TableCell>Harga</TableCell>
            <TableCell>Stok</TableCell>
            <TableCell>Golongan</TableCell>
            <TableCell>Sediaan</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Gambar</TableCell>
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
                <TableCell className="text-gre">{name}</TableCell>
                <TableCell>
                  <Chip label={price} color="success" variant="outlined" />
                </TableCell>
                <TableCell className="text-gre">{stock}</TableCell>
                <TableCell>
                  <Chip
                    label={classification}
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip label={category} color="success" variant="outlined" />
                </TableCell>
                <TableCell
                  className="text-gre"
                  sx={{
                    maxWidth: "200px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {description}
                </TableCell>
                <TableCell className="text-gre">
                  <Image src={image_url} alt="image" width={200} height={25} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Edit />}
                    className="ml-2"
                  />
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
