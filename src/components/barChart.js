import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid"
  }
}));

function BarChart() {
  console.log("BarChart");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle">BarChart</Typography>
    </div>
  );
}

export default BarChart;
