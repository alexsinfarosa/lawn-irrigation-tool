import React from "react";

import { makeStyles } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import ButtonGLink from "../components/ButtonGLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr auto"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  main: {
    padding: theme.spacing(2)
  },
  label: { color: "red" },
  footer: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    textAlign: "center"
  }
}));

function FieldLocationPage() {
  console.log("FieldLocationPage");
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/" variant="button" style={{ padding: 8 }}>
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Location
        </Typography>
      </header>

      <main className={classes.main}>
        <Typography variant="caption" align="justify" gutterBottom>
          To access weather information in your area please enter your location.
          We also consider the Nassau County odd/even irrigation ordinance if an
          address number is provided.
        </Typography>

        <br />
        <TextField
          id="outlined-full-width"
          label="Address"
          placeholder="Type your address"
          // helperText=""
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </main>

      <footer className={classes.footer}>
        <ButtonGLink to="/irrigationDate" variant="outlined" color="primary">
          Continue
        </ButtonGLink>
      </footer>
    </div>
  );
}

export default FieldLocationPage;
