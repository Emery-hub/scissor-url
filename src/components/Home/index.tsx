import React from "react";
import { useState } from "react";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase";
import AuthModal from "./AuthModal";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      boxSizing="border-box"
      height="100vh"
      bgcolor="#56B7BA"
      color="#fff"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Scissor</Typography>
        <Button onClick={() => setOpenAuthModal(true)} color="inherit">
          Login/Signup
        </Button>
      </Box>

      <Box display="flex" flexGrow={1} alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Short links, Great results</Typography>
              <Box my={2}>
                <Typography>
                  Powerful link shortener to help your brand grow
                </Typography>
              </Box>
              <Button
                onClick={() => setOpenAuthModal(true)}
                color="secondary"
                variant="contained"
                size="large"
              >
                Get Started
              </Button>
            </Box>
          </Grid>

          <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 10px 35px rgba(0,0,0,0.1)",
              }}
              src="/assets/mockup.png"
              alt="design mockup"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

<Typography>Homepage</Typography>;

{
  /* <Button onClick={() => console.log(form)} variant="contained" color="primary">
        Sign Up
      </Button> */
}
