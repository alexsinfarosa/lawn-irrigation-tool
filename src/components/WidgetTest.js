import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as d3 from "d3";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const { temperature } = this.props.store.app;
    const acis = [10, 20, 40, 60];
    const margin = {
      top: 50,
      right: 10,
      bottom: 50,
      left: 10
    };

    const width = 700 - margin.left - margin.right;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // Returns a path data string
    const currentYear = d3.arc().innerRadius(radius).outerRadius(radius + 20);
    const pieChart = d3
      .pie()
      .sort(null)
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI);

    const graph = pieChart(acis).map((e, i) => {
      console.log(e);
      const centroid = currentYear.centroid(e);
      return (
        <g key={i}>
          <path d={currentYear(e)} fill={COLORS[i]} />
          <text d={i} x={centroid[0]} y={centroid[1]} dy="0.33em" fill="red" />
        </g>
      );
    });

    const config = {
      minAngle: -90,
      maxAngle: 90,
      innerTickRingOffset: -30,
      innerTickCounterclockSpin: 0,
      innerTickNumber: 24,
      outerTickRingOffset: 25,
      outerTickCounterclockSpin: 5,
      outerTickBorderLength: 30
    };

    const percentToDeg = percent => percent * 180 / 60;
    const scale = d3.scaleLinear().domain([0, 60]).range([0, 1]);
    const innerTicks = scale.ticks(config.innerTickNumber).map(tick => ({
      value: tick,
      label: tick
    }));

    const rotate = d => {
      const ratio = scale(d.value);
      const newAngle = config.minAngle + ratio * 180;
      return `rotate(${newAngle}) translate(0, ${-(radius + config.innerTickRingOffset)})`;
    };

    return (
      <svg width={width} height={height}>
        <text
          textAnchor="middle"
          x={width / 2}
          y={radius + 50}
          style={{ fontSize: "1.5em" }}
        >
          {temperature}
        </text>
        <g transform={`translate(${width / 2}, ${height - margin.bottom})`}>
          {graph}
          <circle cx={0} cy={0} r={7} />
          <line
            stroke="#aaa"
            strokeWidth={2}
            x1={0}
            y1={0}
            x2={-170}
            y2={0}
            transform={`rotate(${percentToDeg(temperature)})`}
          />
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
