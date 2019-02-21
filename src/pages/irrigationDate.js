import React from "react";

import { makeStyles } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import ButtonGLink from "../components/ButtonGLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import format from "date-fns/format";

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
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  footer: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(7)
  },
  btnBig: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    background: theme.palette.primary.light,
    color: "#fff"
  }
}));

function IrrigationDatePage({ location }) {
  console.log("IrrigationDatePage");
  const classes = useStyles();
  const [irrigationDate, setIrrigationDate] = React.useState(
    new Date().toString()
  );

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/location" variant="button" style={{ padding: 8 }}>
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          component="h1"
          variant="subtitle1"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Irrigation Date - <small>step(2/3)</small>
        </Typography>
      </header>

      <main className={classes.main}>
        <Typography variant="h6" align="center" gutterBottom>
          When did you last irrigate your lawn?
        </Typography>

        <br />
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Irrigation Date"
            type="date"
            variant="outlined"
            format="YYYY-MM-DD"
            // defaultValue={format(new Date(), "MM-dd-yyyy")}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e =>
              setIrrigationDate(new Date(e.target.value).toString())
            }
          />
        </form>
      </main>

      <footer className={classes.footer}>
        <ButtonGLink
          to="/sprinkler"
          state={{ ...location.state, irrigationDate }}
          variant="contained"
          fullWidth
          classes={{ root: classes.btnBig }}
        >
          Continue
        </ButtonGLink>
      </footer>
    </div>
  );
}

export default IrrigationDatePage;
