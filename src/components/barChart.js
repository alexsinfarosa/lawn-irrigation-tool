import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";
// import Checkbox from "@material-ui/core/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, Cell } from "recharts";

// utils
import reverse from "lodash.reverse";
import format from "date-fns/format";
import { runWaterDeficitModel } from "../utils/api";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0)
    // background: "pink"
  }
}));

const reversedLastDays = field => {
  // only latest value to display on the barChart
  const irrigationDateIdx = field.data.findIndex(
    d => d.date === field.irrigationDate
  );
  const idxMinusFourDays =
    irrigationDateIdx - 4 < 0 ? 0 : irrigationDateIdx - 4;
  const idxPlus2Days = irrigationDateIdx + 3;

  // building the array for the barChart
  const results = field.data.slice(idxMinusFourDays, idxPlus2Days).map(day => {
    day.yAxis =
      day.date === format(new Date(), "MM/dd/yyyy")
        ? "TODAY"
        : format(new Date(day.date), "MM/dd");
    day.isAboveThreshold = day.deficit > day.threshold;
    day.color = day.isAboveThreshold ? "red" : "green";
    return day;
  });

  // console.log(results);
  return results;
};

function BarChartDeficit({ field }) {
  console.log("BarChart");
  const classes = useStyles();
  const theme = useTheme();

  // State ----------------------------------------
  const [lastDays, setLastDays] = React.useState(reversedLastDays(field));

  const watered = (dayIdx, dayObj) => {
    console.log(dayIdx);
    const copyField = { ...field };

    const pcpns = copyField.data.map(d => d.pcpn);
    const waterAppliedByUserArr = copyField.data.map(d => d.waterAppliedByUser);
    const pets = copyField.data.map(d => d.pet);

    // add the amount of water the user has applied on the lawn to precipitation
    const sumWaterAmount = pcpns.map(
      (num, idx) => num + waterAppliedByUserArr[idx]
    );
    // console.log(sumWaterAmount);
    // recalculating deficit with new precipitation array
    const reCalculatedValues = runWaterDeficitModel(sumWaterAmount, pets);
    // console.log(copyField.data);

    const isZero = copyField.data[dayIdx].waterAppliedByUser === 0;
    const rate = field.sprinkler.waterFlow * field.sprinkler.minutes;
    copyField.data[dayIdx].waterAppliedByUser = isZero ? rate : 0;
    console.log(isZero, rate, copyField.data[dayIdx].waterAppliedByUser);

    // rebuilding field's data array
    copyField.data = copyField.data.map((day, i) => {
      let p = { ...day };
      p.deficit = reCalculatedValues.deficitDaily[i];
      p.pcpn = reCalculatedValues.precipDaily[i];
      p.pet = reCalculatedValues.petDaily[i];
      return p;
    });

    console.log(reversedLastDays(copyField));
    setLastDays(reversedLastDays(copyField));

    // update local storage ---------------------------------
    const localStorageRef = JSON.parse(
      window.localStorage.getItem("lawn-irrigation-tool")
    );

    const fieldIdx = localStorageRef.findIndex(f => f.id === field.id);
    localStorageRef[fieldIdx] = copyField;

    window.localStorage.setItem(
      "lawn-irrigation-tool",
      JSON.stringify(localStorageRef)
    );
  };

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
    console.log(props);
    const { y, index, results } = props;
    return (
      <svg
        width={24}
        height={24}
        x={window.innerWidth - 40}
        y={y}
        style={{ backgroundColor: "pink", padding: 16 }}
      >
        {results[index].waterAppliedByUser === 0 ? (
          <FontAwesomeIcon
            icon="square"
            size="1x"
            color={theme.palette.text.secondary}
            onClick={() => watered(index, results[index])}
          />
        ) : (
          <FontAwesomeIcon
            icon="check-square"
            color={theme.palette.secondary.main}
            onClick={() => watered(index, results[index])}
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
        height={window.innerHeight - 180}
        data={lastDays}
        maxBarSize={20}
        // stackOffset="sign"
        margin={{ top: 0, right: 64, left: 16, bottom: 8 }}
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
        <ReferenceLine x={field.threshold} stroke="red" />

        <Bar
          dataKey="deficit"
          // fill={theme.palette.secondary.main}
          // stackId="stack"
          minPointSize={1}
          radius={[0, 20, 20, 0]}
          label={<CustomizedLabel results={lastDays} />}
        >
          {lastDays.map(day => {
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
