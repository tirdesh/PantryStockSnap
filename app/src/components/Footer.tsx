"use client";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Container, IconButton, Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: { xs: 2, md: 0 } }}
          >
            © {new Date().getFullYear()} My App. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              href="https://github.com/tirdesh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/tirdesh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="mailto:pettugani.t@northeastern.edu"
              aria-label="Email"
              color="inherit"
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              href="tel:+18573167532"
              aria-label="Phone"
              color="inherit"
            >
              <PhoneIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
