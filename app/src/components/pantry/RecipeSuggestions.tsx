// src/components/pantry/RecipeSuggestions.tsx

import BlockIcon from "@mui/icons-material/Block";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  expirationDate: string;
}

interface Recipe {
  title: string;
  description: string;
  fullRecipe: string;
}

interface RecipeSuggestionsProps {
  pantryItems: PantryItem[];
}

const dummyRecipes: Recipe[] = [
  {
    title: "Tomato Bruschetta",
    description:
      "A classic Italian appetizer featuring juicy tomatoes on toasted bread, perfect for a light and refreshing snack.",
    fullRecipe:
      "1. Dice the tomatoes and mix with chopped basil, minced garlic, olive oil, salt, and pepper.\n2. Spoon the mixture onto toasted baguette slices.\n3. Serve immediately.",
  },
  {
    title: "Tomato and Mozzarella Caprese Salad",
    description:
      "A simple and elegant salad showcasing the delicious combination of fresh tomatoes, creamy mozzarella cheese, and fragrant basil.",
    fullRecipe:
      "1. Slice the tomatoes and mozzarella cheese.\n2. Arrange the slices on a platter, alternating between tomato and mozzarella.\n3. Tuck basil leaves between the slices.\n4. Drizzle with balsamic glaze and season with salt and pepper.\n5. Serve chilled.",
  },
  {
    title: "Tomato and Vegetable Pasta",
    description:
      "A hearty and nutritious pasta dish packed with colorful vegetables and a rich tomato sauce, perfect for a satisfying dinner.",
    fullRecipe:
      "1. Cook the pasta according to package instructions.\n2. In a large pan, sauté chopped onion and minced garlic until fragrant.\n3. Add diced tomatoes, zucchini, bell pepper, and Italian seasoning. Cook until vegetables are tender.\n4. Toss in the cooked pasta and mix well.\n5. Serve hot, garnished with grated Parmesan cheese.",
  },
];

const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({
  pantryItems,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [starItem, setStarItem] = useState<string | null>(null);
  const [excludedItems, setExcludedItems] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleItemClick = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handleStarItem = (itemName: string) => {
    setStarItem(starItem === itemName ? null : itemName);
  };

  const handleExcludeItem = (itemName: string) => {
    if (excludedItems.includes(itemName)) {
      setExcludedItems(excludedItems.filter((item) => item !== itemName));
    } else {
      setExcludedItems([...excludedItems, itemName]);
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
      if (starItem === itemName) setStarItem(null);
    }
  };

  const handleGenerateRecipes = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setRecipes(dummyRecipes);
      setLoading(false);
    }, 1000);
  };

  const handleOpenModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Choose Ingredients for Magical Recipes
        </Typography>
        <Grid container spacing={1}>
          {pantryItems.map((item) => (
            <Grid item key={item.id}>
              <Chip
                label={item.name}
                onClick={() => handleItemClick(item.name)}
                onDelete={
                  selectedItems.includes(item.name) || starItem === item.name
                    ? undefined
                    : () => handleExcludeItem(item.name)
                }
                deleteIcon={<BlockIcon />}
                color={
                  excludedItems.includes(item.name)
                    ? "default"
                    : selectedItems.includes(item.name)
                    ? "primary"
                    : "default"
                }
                sx={{ m: 0.5 }}
              />
              {selectedItems.includes(item.name) && (
                <Tooltip
                  title={
                    starItem === item.name ? "Unstar" : "Set as main ingredient"
                  }
                >
                  <IconButton
                    size="small"
                    onClick={() => handleStarItem(item.name)}
                  >
                    <StarIcon
                      color={starItem === item.name ? "warning" : "action"}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateRecipes}
          disabled={loading || selectedItems.length === 0}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? "Generating..." : "Generate Recipes"}
        </Button>
        {recipes.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setRecipes([])}
            startIcon={<RefreshIcon />}
          >
            Clear Recipes
          </Button>
        )}
      </Box>
      {recipes.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Magical Recipe Suggestions:
          </Typography>
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleOpenModal(recipe)}
                    >
                      View Full Recipe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedRecipe?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {selectedRecipe?.description}
          </Typography>
          <Typography variant="body1" component="div">
            {selectedRecipe?.fullRecipe.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default RecipeSuggestions;
