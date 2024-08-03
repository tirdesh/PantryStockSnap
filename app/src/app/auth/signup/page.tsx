"use client";

import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import EmailPasswordForm from "../../../components/auth/EmailPasswordForm";
import SocialAuthButtons from "../../../components/auth/SocialAuthButtons";

const SignUpForm: React.FC = () => {
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
          Sign Up
        </Typography>
        <EmailPasswordForm isSignUp={true} />
        <SocialAuthButtons />
        <Link href="/auth/signin" variant="body2" sx={{ mt: 2 }}>
          {"Already have an account? Sign In"}
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpForm;
