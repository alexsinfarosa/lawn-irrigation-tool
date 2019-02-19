import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid"
  }
}));

function UpdateTodayDeficit() {
  console.log("UpdateTodayDeficit");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle">Update Water Deficit</Typography>
    </div>
  );
}

export default UpdateTodayDeficit;
