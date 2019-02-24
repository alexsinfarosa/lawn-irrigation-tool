import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    padding: theme.spacing(2)
  }
}));

function BarChart() {
  console.log("BarChart");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">BarChart</Typography>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem sequi
        laudantium quibusdam hic molestiae, animi sint nulla! Repellendus
        aliquid, libero laboriosam magnam placeat eius? Dignissimos molestiae
        aliquid architecto praesentium dolor?
      </p>
    </div>
  );
}

export default BarChart;
