import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as d3 from "d3";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const {
      observedData,
      projectedData1,
      projectedData2,
      days,
      isProjection1,
      isProjection2,
      maxValCY,
      maxValP1,
      maxValP2
    } = this.props.store.app;

    const margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };

    const width = 600 - margin.left - margin.right;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    // adjust to colorsCY array based on wheather the projection is displayed
    let colorsCY;
    if (observedData[observedData.length - 1] === 0) {
      colorsCY = ["#757575", "#1E88E5", "#FDD835", "#FFB300", "#e53935"];
    }
    colorsCY = [
      "#757575",
      "#1E88E5",
      "#FDD835",
      "#FFB300",
      "#e53935",
      "#757575"
    ];

    const colorsPs = ["#757575", "#1E88E5", "#FDD835", "#FFB300", "#e53935"];

    const pie = d3.pie().sort(null);
    const pathCY = d3.arc().outerRadius(radius - 100).innerRadius(radius - 60);
    const pathPs = d3.arc().outerRadius(radius - 50).innerRadius(radius - 10);
    // const label = d3.arc().outerRadius(radius - 20).innerRadius(radius - 20);

    const diff = data => data.slice(1).map((n, i) => n - data[i]);

    // console.log(`diff(observedData): ${diff([0, ...observedData])}`);
    const currentYear = pie(diff([0, ...observedData])).map((e, i) => {
      return (
        <g key={i}>
          <path d={pathCY(e)} fill={colorsCY[i]} />
        </g>
      );
    });

    const projection1 = pie(diff([0, ...projectedData1])).map((e, i) => {
      return (
        <g key={i}>
          <path d={pathPs(e)} fill={colorsPs[i]} />
        </g>
      );
    });

    const projection2 = pie(diff([0, ...projectedData2])).map((e, i) => {
      return (
        <g key={i}>
          <path d={pathPs(e)} fill={colorsPs[i]} />
        </g>
      );
    });

    let max;
    if (isProjection1) {
      max = maxValP1;
    } else if (isProjection2) {
      max = maxValP2;
    } else {
      max = maxValCY;
    }

    const percentToDeg = percent => percent * 360 / max;
    const scale = d3.scaleLinear().domain([0, max]).range([0, 1]);

    const innerTicks = scale
      .ticks(25)
      .map(tick => ({ value: tick, label: tick }));

    const rotate = d => {
      const ratio = scale(d.value);
      const newAngle = ratio * 360;
      return `rotate(${newAngle}) translate(0, ${-(radius - 120)})`;
    };

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {currentYear}
          {isProjection1 && projection1}
          {isProjection2 && projection2}

          <circle cx={0} cy={0} r={9} />
          <line
            stroke="#aaa"
            strokeWidth={2}
            x1={0}
            y1={0}
            x2={0}
            y2={-radius + 123}
            transform={`rotate(${percentToDeg(days)})`}
          />
          <circle cx={0} cy={0} r={3} fill="#aaa" />
          <text textAnchor="middle" x={0} y={30} style={{ fontSize: "1em" }}>
            {days}
          </text>
          <g>
            {innerTicks.map((e, i) => {
              if (i !== innerTicks.length - 1 && e.value % 1 === 0) {
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
              }
              return null;
            })}
          </g>
        </g>
      </svg>
    );
  }
}
