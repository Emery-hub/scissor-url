import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { app } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Close as CloseIcon } from "@mui/icons-material";

const AuthModal = ({ onClose }: { onClose: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  //   const handleSignup = () => {
  //     const auth = getAuth(app);
  //     createUserWithEmailAndPassword(auth, form.email, form.password);
  //   };

  //   const handleSignin = () => {
  //     const auth = getAuth(app);
  //     signInWithEmailAndPassword(auth, form.email, form.password);
  //   };

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err: any) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? "Sign In" : "Sign Up"}
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "24px" }}
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
          variant="filled"
        />
        <TextField
          fullWidth
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
          variant="filled"
        />

        <Box mt={2} color="red">
          <Typography>{error}</Typography>
        </Box>
        {/* <Button onClick={handleSignup} variant="contained" color="secondary">
          Sign Up
        </Button> */}
      </DialogContent>
      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          mx={2}
        >
          <Typography onClick={() => setIsSignIn((o) => !o)}>
            {isSignIn
              ? "Don't have an account? Click me"
              : "Already have an account? Click me"}
          </Typography>
          <Button
            disableElevation
            onClick={handleAuth}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
