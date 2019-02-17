import React from "react";
import { Link } from "gatsby";

function FieldLocationPage({ location }) {
  console.log("FieldLocationPage");

  // Go Button need to be dynamic
  let previous = "/";
  if (location.state.fromFields) {
    previous = "/main";
  }

  return (
    <div>
      <h2>Field location</h2>
      <Link to={previous}>GO BACK</Link>
      <br />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex sed porro
        minus ullam quibusdam reiciendis minima laudantium quisquam dolorem
        molestiae! Cupiditate praesentium ducimus sapiente. Dolorum quaerat
        impedit tempore cupiditate pariatur.
      </p>

      <Link to="/irrigationDate">Continue</Link>
    </div>
  );
}

export default FieldLocationPage;
