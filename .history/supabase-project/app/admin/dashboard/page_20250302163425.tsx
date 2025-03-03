"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import { Box, Typography, Button, Grid } from "@mui/material";
import { getMedicines } from "@/app/actions"; // Import Server Action

interface IInterpretation {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [interpretations, setInterpretations] = useState<IInterpretation[]>([]);
  const [filteredInterpretations, setFilteredInterpretations] = useState<
    IInterpretation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("A-Z");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines();

        if (!data) throw new Error("Failed to fetch medicines");

        // Urutkan data by default (A-Z)
        data.sort((a: IInterpretation, b: IInterpretation) =>
          a.name.localeCompare(b.name)
        );

        setInterpretations(data);
        setFilteredInterpretations(data);
      } catch (error) {
        console.log("Error: ", error);
        setError("Failed to load medicines. Please try reloading the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleFilter = (category: string) => {
    setFilteredInterpretations(
      category === "Semua"
        ? interpretations
        : interpretations.filter((item) => item.classification === category)
    );
  };

  const handleSearch = (query: string) => {
    setFilteredInterpretations(
      interpretations.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSort = (order: "A-Z" | "Z-A") => {
    setSortOrder(order);
    const sortedData = [...filteredInterpretations].sort((a, b) =>
      order === "A-Z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFilteredInterpretations(sortedData);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirect ke login setelah logout
  };

  return (
    <Box width="100%">
      {/* Header */}
      <Box display="flex" alignItems="center" mt={6}>
        <Typography color="black" variant="h5" fontWeight="bold" mx={2}>
          DAFTAR OBAT
        </Typography>
        <Button
          component={Link}
          href="/create"
          variant="contained"
          sx={{
            fontWeight: "bold",
            color: "black",
            backgroundColor: "white",
            minWidth: "20px",
            minHeight: "20px",
            padding: "2px 2px",
            borderRadius: "20%",
          }}
        >
          +
        </Button>
      </Box>

      {/* Kalau error */}
      {error && (
        <Typography color="error" py={4}>
          {error}
        </Typography>
      )}

      {/* FilterBar */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        mb={4}
      >
        <FilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
        />
      </Box>

      {/* Data List */}
      {isLoading ? (
        <Typography>Loading medicines...</Typography>
      ) : filteredInterpretations.length > 0 ? (
        <Suspense fallback={<p>Loading slow content...</p>}>
          <Grid container spacing={3}>
            {filteredInterpretations.map((medicine) => (
              <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                <ProductCard
                  id={medicine.id}
                  name={medicine.name}
                  description={medicine.description}
                  price={medicine.price}
                  stock={medicine.stock}
                  classification={medicine.classification}
                  category={medicine.category}
                  image_url={medicine.image_url}
                />
              </Grid>
            ))}
          </Grid>
        </Suspense>
      ) : (
        <Typography>No results found.</Typography>
      )}
      {/* Tombol Logout */}
      <Button variant="contained" color="error" onClick={handleSignOut}>
        Logout
      </Button>
    </Box>
  );
}
