import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: theme.spacing(2),
    gridTemplateRows: "auto 1fr auto",
    gridTemplateAreas: `
    "topSide topSide"
    "leftSide rightSide"
    "bottomSide bottomSide"
    `,
    height: "100%",
    padding: theme.spacing(2, 4)
  },
  topSide: {
    gridArea: "topSide",
    marginBottom: theme.spacing(3)
    // background: "pink"
  },
  leftSide: {
    gridArea: "leftSide",
    // background: "orange",
    justifySelf: "right",
    alignSelf: "center"
  },
  rightSide: {
    gridArea: "rightSide",
    // background: "tomato",
    justifySelf: "left",
    alignSelf: "center"
  },
  bottomSide: {
    gridArea: "bottomSide",
    marginTop: theme.spacing(3),
    // background: "teal",
    display: "flex"
  },
  circle: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 130,
    height: 130
  }
}));
const DayCard = ({ day }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [isWater, setIsWater] = React.useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.topSide}>
        <Typography variant="body1" align="center">
          {day.date}
        </Typography>

        <Typography variant="subtitle1" align="center" color="textSecondary">
          {day.address}
        </Typography>
      </div>
      <div className={classes.leftSide}>
        <div className={classes.circle}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FontAwesomeIcon icon="sun" size="2x" style={{ marginRight: 4 }} />
            <Typography variant="h4">{day.temp}˚</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: theme.palette.text.secondary
            }}
          >
            <FontAwesomeIcon
              icon="cloud-rain"
              size="lg"
              color="inherit"
              style={{ marginRight: 8 }}
            />
            <Typography variant="body2" className={classes.textParams}>
              {day.pcpn}%
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.rightSide}>
        {day.shouldWater ? (
          <Typography variant="h6">NO DEFICIT</Typography>
        ) : (
          <Typography variant="h6" color="secondary">
            WATER!
          </Typography>
        )}
      </div>
      <div className={classes.bottomSide}>
        {day.shouldWater ? (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ padding: theme.spacing(2) }}
            onClick={() => setIsWater(!isWater)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              I watered!
              <Checkbox checked={day.shouldWater} style={{ color: "#fff" }} />
            </div>
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            style={{ padding: theme.spacing(2) }}
            onClick={() => setIsWater(!isWater)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              Didn't water
              <Checkbox
                checked={day.shouldWater}
                style={{
                  color: theme.palette.secondary.light
                }}
              />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DayCard;
