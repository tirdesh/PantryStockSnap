// src/components/auth/EmailPasswordForm.tsx
"use client";

import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { useValidation } from "../../hooks/useValidation";

interface EmailPasswordFormProps {
  isSignUp?: boolean;
}

interface FormData {
  email: string;
  password: string;
}

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({
  isSignUp = false,
}) => {
  const router = useRouter();
  const { validateField } = useValidation();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);
    setFormErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password } = formData;
      try {
        if (isSignUp) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
        router.push("/dashboard");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
    </Box>
  );
};

export default EmailPasswordForm;
