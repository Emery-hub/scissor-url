import React from "react";
import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
    <>
      <Typography>Homepage</Typography>
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
      </Button>

      {/* <Button onClick={() => console.log(form)} variant="contained" color="primary">
        Sign Up
      </Button> */}
    </>
  );
};

export default Home;
