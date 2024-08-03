// src/components/ImageUpload.tsx
import { Button } from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React from "react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  expirationDate: string;
}

interface ImageUploadProps {
  item: Partial<PantryItem>;
  setItems: React.Dispatch<React.SetStateAction<any>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ item, setItems }) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `pantry-images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setItems((prevItems: any) => {
          if (Array.isArray(prevItems)) {
            return prevItems.map((i) =>
              i.id === item.id ? { ...i, image: downloadURL } : i
            );
          } else {
            return { ...prevItems, image: downloadURL };
          }
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Button variant="outlined" component="label">
      Upload Image
      <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
    </Button>
  );
};

export default ImageUpload;
