// src/app/(protected)/pantry/page.tsx

"use client";

import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PantryForm from "../../../components/pantry/PantryForm";
import SearchBar from "../../../components/pantry/SearchBar";
import { db } from "../../../config/firebase";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  expirationDate: string;
}

const PantryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPantryItems = async () => {
      const querySnapshot = await getDocs(collection(db, "pantry"));
      const items: PantryItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PantryItem, "id">),
      }));
      setPantryItems(items);
    };

    fetchPantryItems();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGoToRecipes = () => {
    router.push("/recipes");
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={4} sx={{ padding: 3, borderRadius: 2, marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Pantry Items
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchBar onSearch={handleSearch} />
          </Grid>
          <Grid item xs={12}>
            <PantryForm searchQuery={searchQuery} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToRecipes}
              sx={{ mt: 2 }}
            >
              Generate Recipe Suggestions
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PantryPage;
