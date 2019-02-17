import React from "react";
import { Link } from "gatsby";

function FieldIrrigationDatePage() {
  console.log("FieldIrrigationDatePage");

  return (
    <div>
      <h2>Field Irrigation Date</h2>
      <Link to="/location">GO BACK</Link>
      <br />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex sed porro
        minus ullam quibusdam reiciendis minima laudantium quisquam dolorem
        molestiae! Cupiditate praesentium ducimus sapiente. Dolorum quaerat
        impedit tempore cupiditate pariatur.
      </p>

      <Link to="/sprinkler">Continue</Link>
    </div>
  );
}

export default FieldIrrigationDatePage;
