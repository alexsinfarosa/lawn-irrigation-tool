import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";
// import Checkbox from "@material-ui/core/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, Cell } from "recharts";

// utils
import reverse from "lodash.reverse";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";

// import { runWaterDeficitModel } from "../utils/api";

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

  // console.log(results);
  return reverse(field.data.slice(idxMinusFourDays, idxPlus2Days));
};

function BarChartDeficit({ field }) {
  console.log("BarChart");
  const classes = useStyles();
  const theme = useTheme();

  // State ----------------------------------------
  const [lastDays] = React.useState(reversedLastDays(field));
  console.log(lastDays);
  console.log(field);

  const domain = lastDays => {
    const min = Math.min(...lastDays.map(d => d.barDeficit));
    const max = Math.max(...lastDays.map(d => d.barDeficit));

    const absMin = Math.abs(min);
    const absMax = Math.abs(max);

    const domain = Math.max(absMin, absMax).toFixed(2);
    const start = Number(domain) * -1;
    const end = Number(domain);
    console.log([start, end]);
    return [start, end];
  };

  React.useEffect(() => {
    console.log("CALLED!!!!!!!!!!!!!!!!");
    reversedLastDays(field);
    domain(lastDays);
  }, [field.address]);
  // const watered = (dayIdx, dayObj) => {
  //   console.log(dayIdx);
  //   const copyField = { ...field };

  //   const pcpns = copyField.data.map(d => d.pcpn);
  //   const waterAppliedByUserArr = copyField.data.map(d => d.waterAppliedByUser);
  //   const pets = copyField.data.map(d => d.pet);

  //   // add the amount of water the user has applied on the lawn to precipitation
  //   const sumWaterAmount = pcpns.map(
  //     (num, idx) => num + waterAppliedByUserArr[idx]
  //   );
  //   // console.log(sumWaterAmount);
  //   // recalculating deficit with new precipitation array
  //   const reCalculatedValues = runWaterDeficitModel(sumWaterAmount, pets);
  //   // console.log(copyField.data);

  //   const isZero = copyField.data[dayIdx].waterAppliedByUser === 0;
  //   const rate = field.sprinkler.waterFlow * field.sprinkler.minutes;
  //   copyField.data[dayIdx].waterAppliedByUser = isZero ? rate : 0;
  //   console.log(isZero, rate, copyField.data[dayIdx].waterAppliedByUser);

  //   // rebuilding field's data array
  //   copyField.data = copyField.data.map((day, i) => {
  //     let p = { ...day };
  //     p.deficit = reCalculatedValues.deficitDaily[i];
  //     p.pcpn = reCalculatedValues.precipDaily[i];
  //     p.pet = reCalculatedValues.petDaily[i];
  //     return p;
  //   });

  //   console.log(reversedLastDays(copyField));
  //   setLastDays(reversedLastDays(copyField));

  //   // update local storage ---------------------------------
  //   const localStorageRef = JSON.parse(
  //     window.localStorage.getItem("lawn-irrigation-tool")
  //   );

  //   const fieldIdx = localStorageRef.findIndex(f => f.id === field.id);
  //   localStorageRef[fieldIdx] = copyField;

  //   window.localStorage.setItem(
  //     "lawn-irrigation-tool",
  //     JSON.stringify(localStorageRef)
  //   );
  // };

  const XaxisLabel = props => {
    const { x, y, index, payload } = props;
    console.log(props);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor={index === 0 ? "start" : "end"}
          fill={index === 0 ? "#F79824" : "#0197F6"}
          ticks={domain(lastDays)}
          // transform="rotate(-15)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const YaxisLabel = props => {
    const { x, y, payload } = props;
    // const today = new Date();
    // const tomorrow = today.setDate(today.getDate() + 1);
    // const yesterday = today.setDate(today.getDate() - 1);
    return (
      <g>
        <text x={x - 84} y={y} dy={5} fill="#666">
          {format(new Date(), "MM/dd/yyyy") === payload.value ? (
            <tspan fontWeight="bold" fill="red" fontSize="1.1rem">
              TODAY
            </tspan>
          ) : (
            <tspan fontSize="0.9rem">
              {format(new Date(payload.value), "E do")}
            </tspan>
          )}
        </text>
      </g>
    );
  };

  const RightIconButtons = props => {
    const { y, index, lastDays } = props;
    return (
      <svg width={24} height={24} x={window.innerWidth - 40} y={y}>
        {isAfter(new Date(lastDays[index].date), new Date()) ? (
          <FontAwesomeIcon
            icon="cloud-sun"
            size="1x"
            color={theme.palette.text.secondary}
            // onClick={() => watered(index, lastDays[index])}
          />
        ) : lastDays[index].waterAppliedByUser === 0 ? (
          <FontAwesomeIcon
            icon="tint"
            color={theme.palette.grey["300"]}
            // onClick={() => watered(index, lastDays[index])}
          />
        ) : (
          <FontAwesomeIcon
            icon="tint"
            color={theme.palette.secondary.main}
            // onClick={() => watered(index, lastDays[index])}
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
        margin={{ top: 0, right: 80, left: 50, bottom: 8 }}
      >
        <XAxis
          type="number"
          tick={<XaxisLabel />}
          tickCount={2}
          // tickLine={false}
          stroke={theme.palette.grey["400"]}
          // domain={[dataMin => Math.abs(field.threshold), dataMax => dataMax]}
          domain={domain(lastDays)}
        />
        <YAxis
          dataKey="date"
          type="category"
          tickLine={false}
          axisLine={false}
          tick={<YaxisLabel />}
        />
        <ReferenceLine x={0} stroke={theme.palette.grey["400"]} />

        <Bar
          dataKey="deficit"
          minPointSize={0}
          radius={[0, 20, 20, 0]}
          label={<RightIconButtons lastDays={lastDays} />}
        >
          {lastDays.map(day => {
            return (
              <Cell
                key={day.date}
                fill={day.deficit >= 0 ? "#0197F6" : "#F79824"}
                // opacity={0.9}
              />
            );
          })}
        </Bar>
      </BarChart>
    </div>
  );
}

export default BarChartDeficit;
