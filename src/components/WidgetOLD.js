import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as d3 from "d3";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const {
      observedData,
      days,
      isProjection1,
      isProjection2,
      maxVal
    } = this.props.store.app;
    console.log(observedData.slice());

    const p1Data = [9, 25, 35, 25, 7];
    const p2Data = [5, 10, 30, 40, 15];
    const margin = {
      top: 50,
      right: 10,
      bottom: 50,
      left: 10
    };
    const width = 700 - margin.left - margin.right;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const COLORS = [
      "#757575",
      "#1E88E5",
      "#FDD835",
      "#FFB300",
      "#e53935"
      // "#757575"
    ];

    const config = {
      minAngle: -90,
      maxAngle: 90,
      innerTickRingOffset: -30,
      innerTickCounterclockSpin: 0,
      innerTickNumber: 20,
      outerTickRingOffset: 25,
      outerTickCounterclockSpin: 5,
      outerTickBorderLength: 30
    };

    const percentToDeg = percent => percent * 180 / maxVal;
    const scale = d3.scaleLinear().domain([0, maxVal]).range([0, 1]);
    const innerTicks = scale.ticks(config.innerTickNumber).map(tick => ({
      value: tick,
      label: tick
    }));

    // var thresholdScale = d3
    //   .scaleThreshold()
    //   .domain([0, 50, 100])
    //   .range(["#ccc", "lightblue", "orange", "#ccc"]);

    const rotate = d => {
      const ratio = scale(d.value);
      const newAngle = config.minAngle + ratio * 180;
      return `rotate(${newAngle}) translate(0, ${-(radius + config.innerTickRingOffset)})`;
    };

    // Returns a path data string
    const archCY = d3.arc().innerRadius(radius).outerRadius(radius + 20);
    const archP1 = d3.arc().innerRadius(radius + 25).outerRadius(radius + 45);
    const archP2 = d3.arc().innerRadius(radius + 50).outerRadius(radius + 70);
    const pieChart = d3
      .pie()
      .sort(null)
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI);

    const currentYear = pieChart(observedData).map((e, i) => {
      // const centroid = archCY.centroid(e);
      return (
        <g key={i}>
          <path d={archCY(e)} fill={COLORS[i]} />
          {/* <text
            d={i}
            x={centroid[0]}
            y={centroid[1]}
            dy="0.33em"
            fill="black"
          /> */}
        </g>
      );
    });

    const p1 = pieChart(p1Data).map((e, i) => {
      // const centroid = archP1.centroid(e);
      return (
        <g key={i}>
          <path d={archP1(e)} fill={COLORS[i]} />
          {/* <text d={i} x={centroid[0]} y={centroid[1]} dy="0.33em" fill="red" /> */}
        </g>
      );
    });

    const p2 = pieChart(p2Data).map((e, i) => {
      // const centroid = archP2.centroid(e);
      return (
        <g key={i}>
          <path d={archP2(e)} fill={COLORS[i]} />
          {/* <text d={i} x={centroid[0]} y={centroid[1]} dy="0.33em" fill="red" /> */}
        </g>
      );
    });

    return (
      <svg width={width} height={height}>
        <text
          textAnchor="middle"
          x={width / 2}
          y={radius + 50}
          style={{ fontSize: "1.5em" }}
        >
          {days}
        </text>
        <g transform={`translate(${width / 2}, ${height - margin.bottom})`}>
          {isProjection2 && p2}
          {isProjection1 && p1}
          {currentYear}
          <circle cx={0} cy={0} r={7} />
          <line
            stroke="#aaa"
            strokeWidth={2}
            x1={0}
            y1={0}
            x2={-167}
            y2={0}
            transform={`rotate(${percentToDeg(days)})`}
          />
          <circle cx={0} cy={0} r={3} fill="#aaa" />
          <g>
            {innerTicks.map((e, i) => {
              return (
                <text
                  style={{ fill: "#333", fontSize: "11px" }}
                  textAnchor="middle"
                  key={i}
                  transform={rotate(e)}
                >
                  {e.label}
                </text>
              );
            })}
          </g>
        </g>
      </svg>
    );
  }
}
