import { ThemeOptions, createTheme } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
  typography: {
    fontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
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
