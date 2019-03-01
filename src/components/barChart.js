import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { ComposedChart, Bar, Cell, Text, Label, XAxis } from "recharts";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    padding: theme.spacing(2, 0)
  }
}));

function BarChart({ last7Days }) {
  console.log("BarChart");
  const classes = useStyles();
  console.log(last7Days);

  const renderCustomizedLabel = props => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value.split(" ")[1]}
        </text>
      </g>
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" align="center">
        Deficit Values
      </Typography>
      <ComposedChart
        width={window.innerWidth}
        height={window.innerHeight / 3.2}
        data={last7Days}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Bar dataKey="deficit" layout="vertical" label={{ position: "top" }}>
          {last7Days.map((day, i) => {
            return <Cell key={day.date} fill={day.color} />;
          })}
        </Bar>
        <XAxis dataKey="xAxis" tickLine={false} axisLine={true} height={20} />
      </ComposedChart>
    </div>
  );
}

export default React.memo(BarChart);
