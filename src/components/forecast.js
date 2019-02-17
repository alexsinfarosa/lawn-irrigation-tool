import React from "react";

import Typography from "@material-ui/core/Typography";

const Forecast = () => {
  console.log("Forecast");
  return (
    <div style={{ height: "100vh" }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Forecast
      </Typography>

      <Typography variant="body2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic assumenda
        corporis doloremque accusamus aliquam reiciendis repellat. Eaque quasi
        minima animi, quas tempora neque modi, magnam facilis cum quos suscipit?
        Amet.
      </Typography>
    </div>
  );
};

export default React.memo(Forecast);
