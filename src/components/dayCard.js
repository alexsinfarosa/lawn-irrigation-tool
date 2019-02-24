import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: theme.spacing(2),
    gridTemplateRows: "auto 1fr auto",
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
    // background: "teal",
    display: "flex"
  },
  circle: {
    border: `1px solid ${theme.palette.text.hint}`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 130,
    height: 130
  }
}));
const DayCard = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isWater, setIsWater] = React.useState(false);
  return (
    <div className={classes.container}>
      <Typography variant="bosy1" align="center" className={classes.topSide}>
        TODAY
      </Typography>

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
            <Typography variant="h4">20˚</Typography>
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
              5%
            </Typography>
          </div>
        </div>
      </div>

      <div className={classes.rightSide}>
        {isWater ? (
          <Typography variant="h6">NO DEFICIT</Typography>
        ) : (
          <Typography variant="h6" color="secondary">
            WATER!
          </Typography>
        )}
      </div>

      <div className={classes.bottomSide}>
        {isWater ? (
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
              <Checkbox checked={isWater} style={{ color: "#fff" }} />
            </div>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="default"
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
                checked={isWater}
                style={{ color: theme.palette.text.secondary }}
              />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DayCard;
