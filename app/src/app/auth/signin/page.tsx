"use client";

import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import EmailPasswordForm from "../../../components/auth/EmailPasswordForm";
import SocialAuthButtons from "../../../components/auth/SocialAuthButtons";

const SignInForm: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <EmailPasswordForm isSignUp={false} />
        <SocialAuthButtons />
        <Link href="/auth/signup" variant="body2" sx={{ mt: 2 }}>
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Container>
  );
};

export default SignInForm;
