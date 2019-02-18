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
    paddingBottom: theme.spacing(4),
    textAlign: "center"
  }
}));

function SprinklerTypePage() {
  console.log("SprinklerTypePage");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/irrigationDate" variant="button" style={{ padding: 8 }}>
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Sprinkler Type
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
        <ButtonGLink to="/main" variant="outlined" color="primary">
          Create Field
        </ButtonGLink>
      </footer>
    </div>
  );
}

export default SprinklerTypePage;
