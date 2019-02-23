import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr"
  }
}));
const DayCard = () => {
  const classes = useStyles();
  const [isWater, setIsWater] = React.useState(false);
  return (
    <div>
      <Typography variant="caption" align="center" className={classes.topSide}>
        TODAY
      </Typography>

      <div className={classes.leftSide}>
        <div>
          <FontAwesomeIcon icon="bolt" size="lg" />
          <FontAwesomeIcon icon="cloud-rain" size="xs" color="inherit" />
          <Typography variant="caption" className={classes.textParams}>
            60%
          </Typography>
        </div>
      </div>

      <div className={classes.rightSide}>
        <Typography varinat="caption" color="secondary">
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
