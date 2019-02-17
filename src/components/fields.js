import React from "react";
import { Link } from "gatsby";

const Fields = () => {
  console.log("Fields");

  return (
    <div style={{ height: "100vh" }}>
      <h1>Fields Component</h1>
      <Link to="/location" state={{ fromFields: true }}>
        ADD FIELD
      </Link>

      <br />

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic assumenda
        corporis doloremque accusamus aliquam reiciendis repellat. Eaque quasi
        minima animi, quas tempora neque modi, magnam facilis cum quos suscipit?
        Amet.
      </p>
    </div>
  );
};

export default React.memo(Fields);
