import React ,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';

const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try{
            const mockUser = {
                email : "randomuser@gmail.com",
                password : "1234",
                token : "mockToken12"
            }
            if(email === mockUser.email && password===mockUser.password){
                localStorage.setItem("token",mockUser.token);
                alert("Login Successfull !");
                navigate("/tasks");
            }
            else{
                alert("Invalid");
            }
        }
        catch(err){
            console.log(err.message);
            alert("Login Failed")
        }
    }
    return (
        <Container maxWidth="sm" sx={{backgroundColor:"white" , border:"black"}}>
          <Box mt={26}>
            <Typography variant="h4" gutterBottom align="center" color="textPrimary">
              Login
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <Grid container spacing={3}>
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
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{" "}
                <Button color="primary" onClick={() => navigate("/signup")}>
                  Signup
                </Button>
              </Typography>
            </Box>
          </Box>
        </Container>
      );
}

export default Login;
