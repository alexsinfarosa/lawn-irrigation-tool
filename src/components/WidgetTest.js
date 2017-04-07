import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as d3 from "d3";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const data = [15, 30, 45, 60];

    const margin = {
      top: 50,
      right: 10,
      bottom: 50,
      left: 10
    };

    const width = 700 - margin.left - margin.right;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3
      .scaleOrdinal()
      .range(["#BBDEFB", "#FFF9C4", "#FFE0B2", "#ffcdd2"]);

    console.log(color());

    const currentYear = d3
      .arc()
      .innerRadius(radius)
      .outerRadius(radius + 20)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    const pieChart = d3.pie().sort(null).value(d => d);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height - margin.bottom})`}>
          {pieChart(data).map((d, i) => (
            <g key={i}>
              <path d={currentYear()} fill={d => color(d.data)} />
            </g>
          ))}
        </g>
      </svg>
    );
  }
}
