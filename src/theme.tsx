import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    primary: {
      main: "#56B7BA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#03142F",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      textTransform: "capitalize",
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
});
