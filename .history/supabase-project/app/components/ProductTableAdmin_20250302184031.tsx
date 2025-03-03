import { Card, CardContent, Chip, TableContainer, Paper, IconButton } from "@mui/material";
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Nama Obat
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Harga
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Stok
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Golongan
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Sediaan
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Deskripsi
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Gambar
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
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
                <TableCell className="text-black">{name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "IDR",
                  }).format(price)}
                </TableCell>
                <TableCell className="text-black">{stock}</TableCell>
                <TableCell>
                  <Chip
                    label={classification}
                    color="secondary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip label={category} color="primary" variant="outlined" />
                </TableCell>
                <TableCell
                  className="text-black"
                  sx={{
                    maxWidth: "200px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {description}
                </TableCell>
                <TableCell className="text-black">
                  <Image src={image_url} alt="image" width={100} height={25} />
                </TableCell>
                <TableCell className="text-right">
                  <IconButton size="small">
                    <Delete />
                  </IconButton>
                  <IconButton size="small" className="ml-2">
                    <Edit />
                  </IconButton>
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
