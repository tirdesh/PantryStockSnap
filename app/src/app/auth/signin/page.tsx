// src/app/auth/signin/page.tsx
"use client";

import { Box, Container, Link, Paper, Typography } from "@mui/material";
import React from "react";
import EmailPasswordForm from "../../../components/auth/EmailPasswordForm";
import SocialAuthButtons from "../../../components/auth/SocialAuthButtons";

const SignInForm: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 3, borderRadius: 2, marginTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Sign In
          </Typography>
          <EmailPasswordForm isSignUp={false} />
          <SocialAuthButtons />
          <Link href="/auth/signup" variant="body2" sx={{ mt: 2 }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInForm;
