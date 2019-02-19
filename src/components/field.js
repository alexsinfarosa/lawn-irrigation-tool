import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import BarChart from "../components/barChart";
import UpdateTodayDeficit from "../components/updateTodayDeficit";

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
    display: "grid",
    gridTemplateRows: "auto 1fr 1fr",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(8),
    height: "100vh"
  },
  top: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: theme.spacing(1)
  },
  dayBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: "1px solid #eee",
    "&:last-child": {
      borderRight: "none"
    },
    padding: theme.spacing(0)
  },
  textDay: {
    paddingBottom: theme.spacing(4)
  },
  textWater: {
    paddingBottom: theme.spacing(4),
    color: theme.palette.secondary.main
  },
  containerParams: {
    display: "flex",
    flexDirection: "column",
    width: 68
  },
  iconAndTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(1)
  },
  textParams: {
    fontSize: "0.6rem",
    textAlign: "center",
    marginLeft: 2,
    color: theme.palette.text.secondary
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4)
  },
  btnBig: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

const Field = ({ handleMainPageIdx }) => {
  console.log("Field");
  const classes = useStyles();
  const theme = useTheme();
  const [isWater, setIsWater] = React.useState(false);

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
        <Typography
          variant="subtitle1"
          align="center"
          style={{ marginBottom: theme.spacing(4) }}
        >
          114 Cayuga St.
        </Typography>

        <div className={classes.top}>
          <div className={classes.dayBlock}>
            <Typography variant="caption" className={classes.textDay}>
              TODAY <small style={{ fontSize: "0.3rem" }}>(EVEN)</small>
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ marginBottom: theme.spacing(4) }}
              onClick={() => setIsWater(!isWater)}
            >
              WATER!
            </Button>
            <FontAwesomeIcon icon="bolt" size="lg" />
            <br />
            <div className={classes.containerParams}>
              <div className={classes.iconAndTextContainer}>
                <FontAwesomeIcon icon="cloud-rain" size="xs" color="inherit" />
                <Typography variant="caption" className={classes.textParams}>
                  60%
                </Typography>
              </div>
              <div className={classes.iconAndTextContainer}>
                <FontAwesomeIcon icon="water" size="xs" color="inherit" />
                <Typography variant="caption" className={classes.textParams}>
                  0.07 in
                </Typography>
              </div>
            </div>
          </div>

          <div className={classes.dayBlock}>
            <Typography variant="caption" className={classes.textDay}>
              Feb 20th
            </Typography>
            <Button
              // variant="outlined"
              color="secondary"
              size="small"
              style={{ marginBottom: theme.spacing(4) }}
            >
              ---
            </Button>
            <FontAwesomeIcon icon="snowflake" size="lg" />
            <br />
            <div className={classes.containerParams}>
              <div className={classes.iconAndTextContainer}>
                <FontAwesomeIcon icon="cloud-rain" size="xs" color="inherit" />
                <Typography variant="caption" className={classes.textParams}>
                  10%
                </Typography>
              </div>
              <div className={classes.iconAndTextContainer}>
                <FontAwesomeIcon icon="water" size="xs" color="inherit" />
                <Typography variant="caption" className={classes.textParams}>
                  0.01 in
                </Typography>
              </div>
            </div>
          </div>

          <div className={classes.dayBlock}>
            <Typography variant="caption" className={classes.textDay}>
              Feb 21st
            </Typography>
            <Button
              // variant="outlined"
              color="secondary"
              size="small"
              style={{ marginBottom: theme.spacing(4) }}
            >
              ---
            </Button>
            <FontAwesomeIcon icon="sun" size="lg" />
            <br />
            <div className={classes.containerParams}>
              <div className={classes.iconAndTextContainer}>
                <FontAwesomeIcon icon="cloud-rain" size="xs" />
                <Typography variant="caption" className={classes.textParams}>
                  9%
                </Typography>
              </div>
              <div className={classes.iconAndTextContainer}>
                <FontAwesomeIcon icon="water" size="xs" />
                <Typography variant="caption" className={classes.textParams}>
                  0.001 in
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Graph or Water Adjustment Area */}
        <div className={classes.bottom}>
          {isWater ? (
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <UpdateTodayDeficit />
            </Slide>
          ) : (
            <BarChart />
          )}
        </div>
      </main>
    </div>
  );
};

export default React.memo(Field);
