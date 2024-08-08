import React from "react";
import { useState } from "react";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase";

const Home = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSignup = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, form.email, form.password);
  };

  const handleSignin = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, form.email, form.password);
  };
  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user;
  //   console.log("User signed up:", user);
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.error("Error signing up:", errorCode, errorMessage);
  // });

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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Scissor</Typography>
        <Button color="inherit">Login/Signup</Button>
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
              <Button color="secondary" variant="contained" size="large">
                Get Started
              </Button>
            </Box>
          </Grid>

          <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              style={{ width: "100%", borderRadius: "10px" }}
              src="/assets/image2.png"
              alt="design mockup"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

{
  /* <Typography>Homepage</Typography>
      <TextField
        value={form.email}
        name="email"
        onChange={handleChange}
        label="Email"
        variant="filled"
      />
      <TextField
        value={form.password}
        name="password"
        onChange={handleChange}
        label="Password"
        type="password"
        variant="filled"
      />
      <Button onClick={handleSignup} variant="contained" color="primary">
        Sign Up
      </Button>
      <Button onClick={handleSignin} variant="contained" color="primary">
        Sign In
      </Button> */
}

{
  /* <Button onClick={() => console.log(form)} variant="contained" color="primary">
        Sign Up
      </Button> */
}
