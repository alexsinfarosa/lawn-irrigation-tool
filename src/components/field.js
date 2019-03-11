import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import format from "date-fns/format";

// component
import BarChart from "./barChart";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "80px auto",
    height: "100vh"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    justifyItems: "center",
    padding: theme.spacing(0, 4),
    background: theme.palette.background.default
  },
  main: {
    overflow: "auto",
    height: "calc(100vh - 80px)"
  },
  btnBig: {
    paddingTop: theme.spacing(2, 5)
  }
}));

const Field = ({ setMainPageIdx, field, setField, setFields }) => {
  // console.log("Field");
  const classes = useStyles();
  const theme = useTheme();
  console.log(field);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <FontAwesomeIcon
          icon="cloud-sun"
          size="lg"
          onClick={() => setMainPageIdx(0)}
        />
        <FontAwesomeIcon
          icon="home"
          size="2x"
          color={theme.palette.secondary.main}
        />
        <FontAwesomeIcon
          icon="grip-horizontal"
          size="lg"
          onClick={() => setMainPageIdx(2)}
        />
      </header>

      <main className={classes.main}>
        <div>
          {+field.year === new Date().getFullYear() &&
          field.dayOfIrrigation.barDeficit < 0 ? (
            <Typography
              variant="subtitle1"
              align="center"
              style={{
                background: theme.palette.secondary.light,
                color: "#fff"
              }}
            >
              Today you should water!
            </Typography>
          ) : (
            <Typography variant="subtitle1" align="center">
              {field.address}
            </Typography>
          )}
        </div>
        <BarChart field={field} setField={setField} setFields={setFields} />
      </main>
    </div>
  );
};

export default React.memo(Field);
