// src/app/(protected)/dashboard/page.tsx
"use client";

import {
  Brightness4,
  Cloud,
  Kitchen,
  LockOpen,
  Restaurant,
  Storage,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { TabContext, TabPanel } from "@mui/lab";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechStack {
  category: string;
  techs: {
    icon: React.ReactNode;
    name: string;
    description: string;
  }[];
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const features: Feature[] = [
    {
      icon: <Kitchen />,
      title: "Pantry Management",
      description: "Easily manage and track your pantry items",
    },
    {
      icon: <Restaurant />,
      title: "Recipe Generator",
      description: "Generate recipes based on your available ingredients",
    },
    {
      icon: <LockOpen />,
      title: "User Authentication",
      description: "Secure sign-in and sign-out functionality",
    },
    {
      icon: <Brightness4 />,
      title: "Dark/Light Mode",
      description:
        "Toggle between dark and light themes for comfortable viewing",
    },
  ];

  const techStacks: TechStack[] = [
    {
      category: "Frontend",
      techs: [
        {
          icon: (
            <Image
              src="https://mui.com/static/logo.png"
              alt="MUI"
              width={24}
              height={24}
            />
          ),
          name: "Material-UI",
          description: "React components for faster and easier web development",
        },
        {
          icon: (
            <Image
              src="https://nextjs.org/static/favicon/favicon-32x32.png"
              alt="Next.js"
              width={24}
              height={24}
            />
          ),
          name: "Next.js",
          description: "React framework for production-grade applications",
        },
      ],
    },
    {
      category: "Backend",
      techs: [
        {
          icon: <Storage />,
          name: "Firebase Firestore",
          description: "NoSQL cloud database to store and sync data",
        },
        {
          icon: <LockOpen />,
          name: "Firebase Authentication",
          description: "Secure authentication system for user management",
        },
        {
          icon: <Cloud />,
          name: "Firebase Storage",
          description:
            "Object storage for uploading and serving user-generated content",
        },
      ],
    },
    {
      category: "Deployment",
      techs: [
        {
          icon: (
            <Image
              src="https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png"
              alt="Vercel"
              width={24}
              height={24}
            />
          ),
          name: "Vercel",
          description: "Platform for static and serverless deployment",
        },
      ],
    },
    {
      category: "AI Integration",
      techs: [
        {
          icon: (
            <Image
              src="https://openai.com/favicon.ico"
              alt="OpenAI"
              width={24}
              height={24}
            />
          ),
          name: "OpenAI",
          description:
            "AI-powered recipe generation and natural language processing",
        },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader
            title="Welcome to Pantry Stock Snap"
            subheader="Your smart pantry management and recipe generation assistant"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .MuiCardHeader-subheader": {
                color: "primary.contrastText",
              },
            }}
          />
          <CardContent>
            <Box sx={{ my: 2 }}>
              <Typography variant="h5" gutterBottom>
                About Pantry Stock Snap
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Pantry Stock Snap is an innovative application designed to
                simplify your kitchen management and meal planning. By
                leveraging AI technology, we help you keep track of your pantry
                items and generate delicious recipes based on what you have on
                hand.
              </Typography>
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h5" gutterBottom>
                Key Features
              </Typography>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Box color="primary.main">{feature.icon}</Box>
                          <Typography variant="h6" ml={1}>
                            {feature.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h5" gutterBottom>
                Technology Stack
              </Typography>
              <Card>
                <CardContent>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="tech stack tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        {techStacks.map((stack, index) => (
                          <Tab
                            label={stack.category}
                            value={index.toString()}
                            key={index}
                          />
                        ))}
                      </Tabs>
                    </Box>
                    {techStacks.map((stack, index) => (
                      <TabPanel value={index.toString()} key={index}>
                        <Grid container spacing={2}>
                          {stack.techs.map((tech, techIndex) => (
                            <Grid item xs={12} sm={6} key={techIndex}>
                              <Box display="flex" alignItems="center">
                                <Box
                                  sx={{
                                    bgcolor: "background.paper",
                                    borderRadius: "50%",
                                    p: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {tech.icon}
                                </Box>
                                <Box ml={2}>
                                  <Typography variant="subtitle1">
                                    {tech.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {tech.description}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </TabPanel>
                    ))}
                  </TabContext>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
