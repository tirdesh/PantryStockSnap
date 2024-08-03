// src/pages/recipes/page.tsx
"use client";

import { Container, Grid, Paper, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import RecipeSuggestions from "../../../components/pantry/RecipeSuggestions";
import { db } from "../../../config/firebase";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  expirationDate: string;
}

const RecipesPage: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

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
              Recipe Suggestions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RecipeSuggestions pantryItems={pantryItems} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RecipesPage;
