import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <Typography
          variant="subtitle1"
          align="center"
          style={{ marginBottom: theme.spacing(2) }}
        >
          114 Cayuga St.
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(4)
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FontAwesomeIcon icon="sun" size="2x" style={{ marginRight: 4 }} />
            <Typography variant="h4">20˚</Typography>
          </div>
          <Typography variant="caption">Mostly Cloudly</Typography>
        </div>

        <div style={{ marginBottom: theme.spacing(4) }}>
          <Typography variant="button">Next 7 Days</Typography>
          <Typography variant="caption">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
            dignissimos voluptate, eveniet perspiciati.
          </Typography>
        </div>

        <div>Forecast Table</div>
      </main>
    </div>
  );
};

export default React.memo(Forecast);
