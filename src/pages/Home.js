import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#1976D2", 
          mb: 3,
        }}
      >
        Welcome to the Task Manager
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#000  ",
          mb: 5,
          maxWidth: "600px",
        }}
      >
        Manage your tasks efficiently with our simple Task Manager app. Stay
        organized and productive!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{
              px: 5,
              py: 2,
              fontSize: "1.1rem",
              borderRadius: "50px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#1976D2",
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
            sx={{
              px: 5,
              py: 2,
              fontSize: "1.1rem",
              borderRadius: "50px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#1976D2",
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
