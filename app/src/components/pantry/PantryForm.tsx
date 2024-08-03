// src/components/pantry/PantryForm.tsx
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Remove as RemoveIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import ImageUpload from "../ImageUpload";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  expirationDate: string;
}

interface PantryFormProps {
  searchQuery: string;
}

// Predefined items from TheMealDB API
const predefinedItems = [
  {
    name: "Chicken Breast",
    image: "https://www.themealdb.com/images/ingredients/Chicken%20Breast.png",
  },
  {
    name: "Salmon",
    image: "https://www.themealdb.com/images/ingredients/Salmon.png",
  },
  {
    name: "Tomato",
    image: "https://www.themealdb.com/images/ingredients/Tomato.png",
  },
  {
    name: "Lettuce",
    image: "https://www.themealdb.com/images/ingredients/Lettuce.png",
  },
  {
    name: "Cheddar Cheese",
    image: "https://www.themealdb.com/images/ingredients/Cheddar%20Cheese.png",
  },
  // Add more items as needed
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: "bold",
  },
}));

const PantryForm: React.FC<PantryFormProps> = ({ searchQuery }) => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Omit<PantryItem, "id"> | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PantryItem;
    direction: "asc" | "desc";
  } | null>(null);
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pantry"));
      const fetchedItems: PantryItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PantryItem, "id">),
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (
    id: string,
    updatedItem: Omit<PantryItem, "id">
  ) => {
    try {
      const itemRef = doc(db, "pantry", id);
      await updateDoc(itemRef, updatedItem);
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "pantry", id));
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddNew = async () => {
    if (newItem && newItem.name && newItem.quantity > 0) {
      try {
        const docRef = await addDoc(collection(db, "pantry"), newItem);
        setItems([...items, { id: docRef.id, ...newItem }]);
        setNewItem(null);
      } catch (error) {
        console.error("Error adding new item:", error);
      }
    }
  };

  const handleQuantityChange = (id: string | null, delta: number) => {
    if (id === null) {
      // Handling new item
      setNewItem((prev) =>
        prev
          ? { ...prev, quantity: Math.max(0, (prev.quantity || 0) + delta) }
          : null
      );
    } else {
      // Handling existing item
      setItems(
        items.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
      );
    }
  };

  const handleSort = (key: keyof PantryItem) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setItems((prevItems) =>
      [...prevItems].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>
              <TableSortLabel
                active={sortConfig?.key === "name"}
                direction={
                  sortConfig?.key === "name" ? sortConfig.direction : "asc"
                }
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">
              <TableSortLabel
                active={sortConfig?.key === "quantity"}
                direction={
                  sortConfig?.key === "quantity" ? sortConfig.direction : "asc"
                }
                onClick={() => handleSort("quantity")}
              >
                Quantity
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">
              <TableSortLabel
                active={sortConfig?.key === "expirationDate"}
                direction={
                  sortConfig?.key === "expirationDate"
                    ? sortConfig.direction
                    : "asc"
                }
                onClick={() => handleSort("expirationDate")}
              >
                Expiration Date
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {editingId === item.id ? (
                  <Autocomplete
                    freeSolo
                    options={predefinedItems}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.name
                    }
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                    value={item.name}
                    onChange={(_, newValue) => {
                      if (typeof newValue === "string") {
                        setItems(
                          items.map((i) =>
                            i.id === item.id ? { ...i, name: newValue } : i
                          )
                        );
                      } else if (newValue && newValue.name) {
                        setItems(
                          items.map((i) =>
                            i.id === item.id
                              ? {
                                  ...i,
                                  name: newValue.name,
                                  image: newValue.image,
                                }
                              : i
                          )
                        );
                      }
                    }}
                    style={{ width: "200px" }}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell align="right">
                {editingId === item.id ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, -1)}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      onChange={(e) =>
                        setItems(
                          items.map((i) =>
                            i.id === item.id
                              ? {
                                  ...i,
                                  quantity: parseInt(e.target.value) || 0,
                                }
                              : i
                          )
                        )
                      }
                      type="number"
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                      sx={{
                        width: "50px",
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            "-webkit-appearance": "none",
                            margin: 0,
                          },
                        "& input[type=number]": {
                          "-moz-appearance": "textfield",
                        },
                      }}
                      size="small"
                    />
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 1)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                ) : (
                  item.quantity
                )}
              </TableCell>
              <TableCell align="right">
                {editingId === item.id ? (
                  <TextField
                    type="date"
                    value={item.expirationDate}
                    onChange={(e) =>
                      setItems(
                        items.map((i) =>
                          i.id === item.id
                            ? { ...i, expirationDate: e.target.value }
                            : i
                        )
                      )
                    }
                    size="small"
                  />
                ) : (
                  item.expirationDate
                )}
              </TableCell>
              <TableCell align="right">
                {editingId === item.id ? (
                  <>
                    <IconButton
                      onClick={() => handleSave(item.id, item)}
                      size="small"
                      color="primary"
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditingId(null)} size="small">
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      onClick={() => handleEdit(item.id)}
                      size="small"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      size="small"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              {newItem && <ImageUpload item={newItem} setItems={setNewItem} />}
            </TableCell>
            <TableCell>
              {newItem && (
                <Autocomplete
                  freeSolo
                  options={predefinedItems}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Item name"
                    />
                  )}
                  value={newItem.name}
                  onChange={(_, newValue) => {
                    if (typeof newValue === "string") {
                      setNewItem({ ...newItem, name: newValue });
                    } else if (newValue && newValue.name) {
                      setNewItem({
                        ...newItem,
                        name: newValue.name,
                        image: newValue.image,
                      });
                    }
                  }}
                  style={{ width: "200px" }}
                />
              )}
            </TableCell>
            <TableCell align="right">
              {newItem && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <IconButton
                    onClick={() => handleQuantityChange(null, -1)}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    type="number"
                    inputProps={{
                      min: 0,
                      style: { textAlign: "center" },
                    }}
                    sx={{
                      width: "50px",
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          "-webkit-appearance": "none",
                          margin: 0,
                        },
                      "& input[type=number]": {
                        "-moz-appearance": "textfield",
                      },
                    }}
                    size="small"
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(null, 1)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              )}
            </TableCell>
            <TableCell align="right">
              {newItem && (
                <TextField
                  type="date"
                  value={newItem.expirationDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, expirationDate: e.target.value })
                  }
                  size="small"
                />
              )}
            </TableCell>
            <TableCell align="right">
              {newItem ? (
                <>
                  <IconButton
                    onClick={handleAddNew}
                    size="small"
                    color="primary"
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setNewItem(null)} size="small">
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <Button
                  startIcon={<AddIcon />}
                  onClick={() =>
                    setNewItem({
                      name: "",
                      quantity: 0,
                      image: "",
                      expirationDate: "",
                    })
                  }
                  size="small"
                >
                  Add Item
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PantryForm;
