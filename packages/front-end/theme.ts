import { ThemeOptions, createTheme } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#FEDA84", // Change the primary color
    },
    secondary: {
      main: "#10124F", // Change the secondary color
    },
  },
});

export default theme;
