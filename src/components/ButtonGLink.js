import React from "react";
import MuiButton from "@material-ui/core/Button";
import { Link as GastsbyLink } from "gatsby";

function ButtonGLink(props) {
  return <MuiButton component={GastsbyLink} {...props} />;
}

export default ButtonGLink;
