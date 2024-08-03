import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <AppBar elevation={0} color="secondary" position="static">
      <Toolbar>
        <Typography variant="h6">Scissor</Typography>
        <Box marginLeft="auto">
          <Button color="inherit">Links</Button>
          <Button color="inherit">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
