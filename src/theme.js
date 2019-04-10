import red from "@material-ui/core/colors/red"
import { createMuiTheme } from "@material-ui/core/styles"
import pink from "@material-ui/core/colors/pink"
import indigo from "@material-ui/core/colors/indigo"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[100],
      main: indigo[300],
      dark: indigo[500],
    },
    secondary: {
      light: pink[100],
      main: pink[300],
      dark: pink[500],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  deficit: {
    color: "#F79824",
  },
  noDeficit: {
    color: "#0197F6",
  },
})

export default theme
