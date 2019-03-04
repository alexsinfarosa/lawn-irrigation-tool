import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";
// import Checkbox from "@material-ui/core/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, Cell } from "recharts";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0)
    // background: "pink"
  }
}));

function BarChartDeficit({ reversedSevenDays }) {
  console.log("BarChart");
  const classes = useStyles();
  const theme = useTheme();

  // console.log(reversedSevenDays);

  const XaxisTick = props => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-15)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const YaxisTick = props => {
    const { x, y, payload } = props;
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
    const { y, index } = props;
    return (
      <svg width={20} height={20} x={window.innerWidth - 32} y={y}>
        {reversedSevenDays[index].suggestion === "WATER!" ? (
          <FontAwesomeIcon
            icon="check-square"
            size="1x"
            color={theme.palette.secondary.main}
            onClick={() => console.log(reversedSevenDays[index])}
          />
        ) : (
          <FontAwesomeIcon
            icon="square"
            size="1x"
            color={theme.palette.text.secondary}
            onClick={() => console.log(reversedSevenDays[index])}
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
        data={reversedSevenDays}
        maxBarSize={20}
        // stackOffset="sign"
        margin={{ top: 24, right: 64, left: 16, bottom: 32 }}
        // style={{ background: "pink" }}
      >
        <XAxis type="number" tick={<XaxisTick />} />
        <YAxis
          dataKey="yAxis"
          type="category"
          tickLine={false}
          axisLine={false}
          tick={<YaxisTick />}
        />
        {/*<Bar
          dataKey="threshold"
          fill={"#82ca9d"}
          stackId="stack"
          radius={[0, 0, 0, 0]}
        /> */}
        <ReferenceLine
          // y={reversedSevenDays[0].threshold}
          x={0.15}
          stroke="red"
        />

        <Bar
          dataKey="deficit"
          // fill={theme.palette.secondary.main}
          // stackId="stack"
          radius={[0, 20, 20, 0]}
          label={<CustomizedLabel reversedSevenDays={reversedSevenDays} />}
        >
          {reversedSevenDays.map(day => {
            console.log(day);
            return <Cell key={day.date} fill={day.color} opacity={0.5} />;
          })}
        </Bar>

        {/*<Bar
          dataKey="negativeDeficit"
          fill={"#9cc9f5"}
          stackId="stack"
          radius={[0, 20, 20, 0]}
        /> */}
      </BarChart>
    </div>
  );
}

export default React.memo(BarChartDeficit);
