import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid,Box } from "@mui/material";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:"POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body:JSON.stringify({name,email,password,contact})
      })
      if(!response.ok){
        throw new Error(`${response.status}`)
      }

      const data = await response.json();
      console.log(data);

      const token = "mockToken12";
      localStorage.setItem("token",token);
      alert("Succesfull");
      navigate("/login")
    }
    catch(err){
      console.log(err.message);
      alert("Failed")
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={20}>
        <Typography variant="h4" gutterBottom align="center" color="textPrimary">
          Signup
        </Typography>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                type="tel"
                variant="outlined"
                fullWidth
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: "12px",
                  fontWeight: "bold",
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  }
                }}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Button color="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
