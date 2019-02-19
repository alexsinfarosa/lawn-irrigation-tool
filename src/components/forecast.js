import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    justifyItems: "center",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    background: theme.palette.background.default,
    position: "fixed",
    top: 0,
    width: "100%"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    paddingTop: theme.spacing(12)
  }
}));

const Forecast = ({ handleMainPageIdx }) => {
  console.log("Forecast");
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <FontAwesomeIcon icon="grip-horizontal" size="lg" color="#fafafa" />
        <FontAwesomeIcon
          icon="cloud-sun"
          size="lg"
          color={theme.palette.secondary.main}
        />
        <FontAwesomeIcon
          icon="home"
          size="lg"
          onClick={() => handleMainPageIdx(1)}
        />
      </header>

      <main className={classes.main}>
        <Typography variant="body2">
          Ciccio... Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Hic assumenda corporis doloremque accusamus aliquam reiciendis
          repellat. Eaque quasi minima animi, quas tempora neque modi, magnam
          facilis cum quos suscipit? Amet.
        </Typography>

        <Typography variant="body2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
          assumenda corporis doloremque accusamus aliquam reiciendis repellat.
          Eaque quasi minima animi, quas tempora neque modi, magnam facilis cum
          quos suscipit? Amet.
        </Typography>

        <Typography variant="body2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
          assumenda corporis doloremque accusamus aliquam reiciendis repellat.
          Eaque quasi minima animi, quas tempora neque modi, magnam facilis cum
          quos suscipit? Amet.
        </Typography>

        <Typography variant="body2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
          assumenda corporis doloremque accusamus aliquam reiciendis repellat.
          Eaque quasi minima animi, quas tempora neque modi, magnam facilis cum
          quos suscipit? Amet.
        </Typography>
      </main>
    </div>
  );
};

export default React.memo(Forecast);
