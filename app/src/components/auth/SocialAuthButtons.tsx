// src/components/auth/SocialAuthButtons.tsx
"use client";

import { Google as GoogleIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { auth } from "../../config/firebase";

const SocialAuthButtons: React.FC = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleSignIn}
    >
      Sign In with Google
    </Button>
  );
};

export default SocialAuthButtons;
