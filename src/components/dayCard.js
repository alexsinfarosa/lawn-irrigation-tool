import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto 1fr 1fr",
    gridTemplateAreas: `
    "topSide topSide"
    "leftSide rightSide"
    "bottomSide bottomSide"
    `
  },
  topSide: {
    gridArea: "topSide"
    // background: "pink"
  },
  leftSide: {
    gridArea: "leftSide",
    // background: "orange",
    justifySelf: "center",
    alignSelf: "center"
  },
  rightSide: {
    gridArea: "rightSide",
    // background: "tomato",
    justifySelf: "center",
    alignSelf: "center"
  },
  bottomSide: {
    gridArea: "bottomSide",
    // background: "teal",
    justifySelf: "center"
  }
}));
const DayCard = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isWater, setIsWater] = React.useState(false);
  return (
    <div className={classes.container}>
      <Typography variant="caption" align="center" className={classes.topSide}>
        TODAY
      </Typography>

      <div className={classes.leftSide}>
        <div style={{ width: 75 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <FontAwesomeIcon icon="bolt" size="2x" style={{ marginRight: 8 }} />
            <Typography variant="h5">20˚</Typography>
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
              size="xs"
              color="inherit"
              style={{ marginRight: 8 }}
            />
            <Typography variant="caption" className={classes.textParams}>
              60%
            </Typography>
          </div>
        </div>
      </div>

      <div className={classes.rightSide}>
        <Typography variant="subtitle1" color="secondary">
          WATER
        </Typography>
      </div>

      <FormGroup row className={classes.bottomSide}>
        <FormControlLabel
          control={
            <Switch checked={isWater} onChange={() => setIsWater(!isWater)} />
          }
          label={isWater ? "I watered!" : "I did not water"}
        />
      </FormGroup>
    </div>
  );
};

export default DayCard;
