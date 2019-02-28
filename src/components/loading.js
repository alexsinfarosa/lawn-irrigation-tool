import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";

import RingLoader from "react-spinners/RingLoader";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
}));
export default function loading() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <RingLoader color={theme.palette.primary.main} />
    </div>
  );
}
