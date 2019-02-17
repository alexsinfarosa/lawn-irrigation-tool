import React from "react";
import { Link } from "gatsby";

function FieldSprinklerTypePage() {
  console.log("FieldSprinklerTypePage");

  return (
    <div>
      <h2>Sprinkler Type</h2>
      <Link to="/irrigationDate">GO BACK</Link>
      <br />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex sed porro
        minus ullam quibusdam reiciendis minima laudantium quisquam dolorem
        molestiae! Cupiditate praesentium ducimus sapiente. Dolorum quaerat
        impedit tempore cupiditate pariatur.
      </p>

      <Link to="/main">CREATE FIELD</Link>
    </div>
  );
}

export default FieldSprinklerTypePage;
