import {
  Card,
  CardContent,
  Chip,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
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
            <TableCell sx={{ fontWeight: "bold" }}>Nama Obat</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Stok</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Golongan</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Sediaan</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Deskripsi</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Gambar</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
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
              <TableRow
                key={id}
                sx={{ "& td, & th": { borderBottom: "none" } }}
              >
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
                  <IconButton size="small" className="mr-2">
                  <Link href={`/detail/${id}`} passHref>
                      <Edit />
                    </Link>
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
