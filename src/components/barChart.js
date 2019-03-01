import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { ComposedChart, Bar, Cell } from "recharts";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    padding: theme.spacing(2, 4)
  }
}));

function BarChart({ last7Days }) {
  console.log("BarChart");
  const classes = useStyles();
  console.log(last7Days);
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" align="center">
        Deficit Values
      </Typography>
      <ComposedChart
        width={376}
        height={200}
        data={last7Days}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        style={{ marginLeft: -32, marginRight: -32 }}
      >
        {/*<Bar dataKey="deficit">
          {last7Days.map(day => {
            return (
              <Cell
                key={day.date}
                fill={day.color}
                stroke={day.color}
                // strokeWidth={index === 2 ? 4 : 1}
              />
            );
          })}
        </Bar> */}

        <Bar dataKey="deficit" stackId="a" fill="orange" />
        <Bar dataKey="threshold" stackId="a" fill="#8884d8" />
      </ComposedChart>
    </div>
  );
}

export default React.memo(BarChart);
