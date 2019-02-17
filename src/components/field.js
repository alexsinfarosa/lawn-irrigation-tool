import React from "react";
// import { Link } from "gatsby";

const Field = () => {
  console.log("Field");

  return (
    <div style={{ height: "100vh" }}>
      <h1>Field Component</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic assumenda
        corporis doloremque accusamus aliquam reiciendis repellat. Eaque quasi
        minima animi, quas tempora neque modi, magnam facilis cum quos suscipit?
        Amet.
      </p>
    </div>
  );
};

export default React.memo(Field);
