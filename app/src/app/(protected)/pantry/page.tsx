// src/app/(protected)/pantry/page.tsx

"use client";

import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import PantryForm from "../../../components/pantry/PantryForm";
import SearchBar from "../../../components/pantry/SearchBar";

const PantryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
        </Grid>
      </Paper>
    </Container>
  );
};

export default PantryPage;
