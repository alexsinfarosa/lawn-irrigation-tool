import React from "react";

import { makeStyles } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";

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
  footer: {
    padding: theme.spacing(2),
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
        <Typography variant="body2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex sed porro
          minus ullam quibusdam reiciendis minima laudantium quisquam dolorem
          molestiae! Cupiditate praesentium ducimus sapiente. Dolorum quaerat
          impedit tempore cupiditate pariatur.
        </Typography>
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
