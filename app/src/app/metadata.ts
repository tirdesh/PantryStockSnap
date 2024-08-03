// app/metadata.ts
import { Metadata } from "next";
import PSS from "../public/PSS.png";

export const metadata: Metadata = {
  title: "Pantry Stock Snap",
  description: "Your smart pantry management assistant",
  icons: {
    icon: [{ url: PSS.src, type: "image/png" }],
    apple: [{ url: PSS.src, type: "image/png" }],
  },
};
