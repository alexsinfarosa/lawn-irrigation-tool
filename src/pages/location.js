import React from "react";

import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";

import ButtonGLink from "../components/ButtonGLink";

function FieldLocationPage() {
  console.log("FieldLocationPage");

  return (
    <div>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Location
      </Typography>

      <Link to="/" variant="button">
        GO BACK
      </Link>

      <Typography variant="body2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex sed porro
        minus ullam quibusdam reiciendis minima laudantium quisquam dolorem
        molestiae! Cupiditate praesentium ducimus sapiente. Dolorum quaerat
        impedit tempore cupiditate pariatur.
      </Typography>

      <br />
      <ButtonGLink to="/irrigationDate" variant="outlined" color="primary">
        Continue
      </ButtonGLink>
    </div>
  );
}

export default FieldLocationPage;
