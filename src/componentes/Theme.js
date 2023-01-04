import { createTheme } from "@mui/material";
// import { dark } from "@mui/material/styles/createPalette";

export const Tema = createTheme({
  palette: {
    primary:{
        main: "#F25270",
    },
    secondary: {
      main: "#2BF08D",
      contrastText: "#FAFAFA",
    },
    appBar: {
      main: "#f3f5f4",
      contrastText: "#0F0F0F"
    }
  }
})