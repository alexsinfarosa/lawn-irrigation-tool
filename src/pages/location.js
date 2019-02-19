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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  label: { color: "red" },
  footer: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(7)
  },
  btnBig: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
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
          variant="subtitle1"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Create Location - step(1/3)
        </Typography>
      </header>

      <main className={classes.main}>
        <Typography component="h1" variant="h6" align="center" gutterBottom>
          Enter Your Location
        </Typography>

        <br />
        <Typography variant="caption" align="justify" gutterBottom>
          Note: We also consider the Nassau County odd/even irrigation ordinance
          if an address number is provided.
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
        <ButtonGLink
          to="/irrigationDate"
          variant="contained"
          color="primary"
          fullWidth
          classes={{ root: classes.btnBig }}
        >
          Continue
        </ButtonGLink>
      </footer>
    </div>
  );
}

export default FieldLocationPage;
