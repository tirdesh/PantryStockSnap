"use client";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as PSS from "../../public/PSS.png";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const { currentUser, signOut } = useAuth();
  const router = useRouter();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Pantry", path: "/pantry" },
    { label: "Recipes", path: "/recipes" },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawer = currentUser ? (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => router.push(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  ) : null;

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: isDarkMode ? "#333" : "primary.main" }}
    >
      <Toolbar>
        {isMobile && currentUser && (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
          </>
        )}
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Image
            src={PSS}
            alt="Pantry Stock Snap Logo"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pantry Stock Snap
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          {currentUser &&
            navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                href={item.path}
                sx={{ mx: 1 }}
              >
                {item.label}
              </Button>
            ))}
        </Box>
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {currentUser ? (
          <Button
            color="inherit"
            onClick={signOut}
            sx={{ textTransform: "none", ml: 1 }}
          >
            Sign Out
          </Button>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
