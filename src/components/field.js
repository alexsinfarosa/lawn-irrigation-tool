import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import DayCard from "../components/dayCard";
import BarChart from "../components/barChart";

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
    padding: theme.spacing(2, 3),
    background: theme.palette.background.default,
    position: "fixed",
    top: 0,
    width: "100%"
  },
  main: {
    display: "grid",
    gridTemplateRows: "auto 1fr 1fr",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10),
    height: "100vh"
  },
  main_top: {
    background: "pink",
    padding: theme.spacing(1, 0)
  },
  main_middle: {
    width: "100%",
    background: "orange"
  },
  main_bottom: { background: "tomato" },
  btnBig: {
    paddingTop: theme.spacing(2, 5)
  }
}));

const Field = ({ handleMainPageIdx }) => {
  console.log("Field");
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <FontAwesomeIcon
          icon="cloud-sun"
          size="lg"
          onClick={() => handleMainPageIdx(0)}
        />
        <FontAwesomeIcon
          icon="home"
          size="lg"
          color={theme.palette.secondary.main}
        />
        <FontAwesomeIcon
          icon="grip-horizontal"
          size="lg"
          onClick={() => handleMainPageIdx(2)}
        />
      </header>

      <main className={classes.main}>
        {/* grid top */}
        <div className={classes.main_top}>
          <Typography variant="subtitle1" align="center">
            114 Cayuga St.
          </Typography>
        </div>

        {/* grid middle */}
        <div className={classes.main_middle}>
          <DayCard />
        </div>

        {/* grid bottom */}
        <div className={classes.main_bottom}>
          <BarChart />
        </div>
      </main>
    </div>
  );
};

export default React.memo(Field);
