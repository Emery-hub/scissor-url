import React, { useState, useEffect } from "react";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import theme from "./theme";
// import { auth } from "./firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import LinkRedirect from "./components/LinkRedirect";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialLoad(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (initialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/account" /> : <Home />}
          />
          <Route
            path="/account"
            element={user ? <Account /> : <Navigate to="/" />}
          />
          <Route path="/:shortCode" element={<LinkRedirect />} />

          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
  // Remove the extra closing curly brace
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {});
  // }, []);

  // return (
  //   <ThemeProvider theme={theme}>
  //     {" "}
  //     {/* Provide the theme prop */}
  //     <Router>
  //       <Route path="/" element={user ? <redirect to="/account" /> :  <Home />} />

  //       <Routes>
  //         <Route path="/account" element={<Account />} />
  //       </Routes>
  //     </Router>
  //   </ThemeProvider>
  // );
};

export default App;
