import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const XaxisTick = props => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const YaxisTick = props => {
    const { x, y, stroke, payload } = props;
    return (
      <g>
        <text
          x={x - 54}
          y={y}
          dy={6}
          // textAnchor="start"
          fill="#666"
          // transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomizedLabel = props => {
    console.log(props);
    const { x, y, stroke, value, index } = props;
    return (
      <svg width={20} height={20} x={window.innerWidth - 32} y={y}>
        {reversedLast7Days[index].message === "WATER!" ? (
          <FontAwesomeIcon
            icon="check-square"
            size="1x"
            // color="red"
            onClick={() => console.log(reversedLast7Days[index])}
          />
        ) : (
          <FontAwesomeIcon
            icon="square"
            size="1x"
            // color="red"
            onClick={() => console.log(reversedLast7Days[index])}
          />
        )}
      </svg>
    );
  };

  return (
    <div className={classes.root}>
      <BarChart
        layout="vertical"
        width={window.innerWidth}
        height={window.innerHeight - 120}
        data={reversedLast7Days}
        maxBarSize={20}
        stackOffset="sign"
        margin={{ top: 24, right: 64, left: 16, bottom: 32 }}
        // style={{ background: "pink" }}
      >
        <XAxis type="number" tick={<XaxisTick />} />
        <YAxis
          dataKey="xAxis"
          type="category"
          tickLine={false}
          axisLine={false}
          tick={<YaxisTick />}
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
          label={<CustomizedLabel reversedLast7Days={reversedLast7Days} />}
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
