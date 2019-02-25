import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { weatherIcons } from "../utils/weatherIcons";
import format from "date-fns/format";
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
    height: "calc(100vh - 80px)",
    padding: theme.spacing(0, 4)
  },
  forecastList: {
    // background: "orange"
  },
  forecastRow: {
    display: "flex",
    justifyContent: "space-between",
    height: 40
  }
}));

const Forecast = ({ handleMainPageIdx, forecast, address }) => {
  console.log("Forecast");
  const classes = useStyles();
  const theme = useTheme();

  console.log(forecast);

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
          {address}
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
            <Typography variant="h4">
              {Math.round(forecast.currently.temperature, 2)}˚
            </Typography>
          </div>
          <Typography variant="caption">
            {forecast.currently.summary}
          </Typography>
        </div>

        <div style={{ marginBottom: theme.spacing(4) }}>
          <Typography variant="subtitle2" gutterBottom>
            Next 7 Days
          </Typography>
          <Typography variant="caption">{forecast.daily.summary}</Typography>
        </div>

        <div className={classes.forecastList}>
          {forecast.daily.data.map(day => (
            <div key={day.time} className={classes.forecastRow}>
              <Typography
                variant="caption"
                align="left"
                style={{ background: "white" }}
              >
                {format(new Date(day.time) * 1000, "EEE").toUpperCase()}
              </Typography>
              <div>
                <img
                  src={weatherIcons[day.icon]}
                  alt={day.summary}
                  style={{
                    width: 16,
                    height: 16
                  }}
                />
              </div>
              <Typography variant="caption">{`${Math.round(
                day.temperatureLow,
                1
              )}˚`}</Typography>
              <Typography variant="caption">
                {`${Math.round(day.temperatureHigh, 1)}˚`}
              </Typography>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default React.memo(Forecast);
