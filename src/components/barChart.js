import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0)
    // background: "pink"
  }
}));

function BarChartDeficit({ reversedLast7Days }) {
  console.log("BarChart");
  const classes = useStyles();
  const theme = useTheme();
  console.log(reversedLast7Days);

  return (
    <div className={classes.root}>
      <BarChart
        layout="vertical"
        width={window.innerWidth}
        height={window.innerHeight - 120}
        data={reversedLast7Days}
        maxBarSize={20}
        stackOffset="sign"
        margin={{ top: 24, right: 32, left: 16, bottom: 32 }}
      >
        <XAxis type="number" />
        <YAxis
          dataKey="xAxis"
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="threshold"
          fill={"#82ca9d"}
          stackId="stack"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="deficit"
          fill={theme.palette.secondary.main}
          stackId="stack"
          radius={[0, 20, 20, 0]}
        />
        <Bar
          dataKey="negativeDeficit"
          fill={"#82ca9d"}
          stackId="stack"
          radius={[20, 0, 0, 20]}
        />
      </BarChart>
    </div>
  );
}

export default React.memo(BarChartDeficit);
