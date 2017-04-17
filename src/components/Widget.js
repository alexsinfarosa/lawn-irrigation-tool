import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as d3 from "d3";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const {
      observedDataToGraph,
      projectedData2040ToGraph,
      projectedData2070ToGraph,
      days,
      isProjection1,
      isProjection2,
      observedDataMax,
      projectedData2040Max,
      projectedData2070Max,
      isProjectionDataLoaded,
      temperature
    } = this.props.store.app;
    console.log(`%cobservedDataToGraph: ${observedDataToGraph}`, `color: red`);
    console.log(
      `%cprojectedData2040ToGraph: ${projectedData2040ToGraph}`,
      `color: blue`
    );
    console.log(
      `%cprojectedData2070ToGraph: ${projectedData2070ToGraph}`,
      `color: green`
    );

    const margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };

    const width = 500 - margin.left - margin.right;
    const height = 460;
    const radius = Math.min(width, height) / 2;

    // adjust to colorsCY array based on wheather the projection is displayed
    let colorsCY;
    if (observedDataToGraph[observedDataToGraph.length - 1] === 0) {
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

    // Creating pie chart and path
    const pie = d3.pie().sort(null);
    const pathCY = d3
      .arc()
      .outerRadius(radius - 100)
      .innerRadius(radius - 60)
      .padAngle(0.005);
    const pathPs = d3
      .arc()
      .outerRadius(radius - 50)
      .innerRadius(radius - 10)
      .padAngle(0.005);

    // Converts percentage of the pie to numbers. These numbers are the quantiles.
    const diff = data => data.slice(1).map((n, i) => n - data[i]);

    // Observed Data
    const currentYear = pie(diff([0, ...observedDataToGraph])).map((e, i) => {
      return (
        <g key={i}>
          <path d={pathCY(e)} fill={colorsCY[i]} />
        </g>
      );
    });

    // Projection 2040-2069
    const projection1 = pie(
      diff([0, ...projectedData2040ToGraph])
    ).map((e, i) => {
      return (
        <g key={i}>
          <path d={pathPs(e)} fill={colorsPs[i]} />
        </g>
      );
    });

    // Projection 2070-2099
    const projection2 = pie(
      diff([0, ...projectedData2070ToGraph])
    ).map((e, i) => {
      return (
        <g key={i}>
          <path d={pathPs(e)} fill={colorsPs[i]} />
        </g>
      );
    });

    // max sets the scale of the graph
    let max = 0;
    if (isProjection1) {
      max = projectedData2040Max;
    } else if (isProjection2) {
      max = projectedData2070Max;
    } else {
      max = observedDataMax;
    }

    // The block below creates the first circle with numbers
    const percentToDeg = percent => percent * 360 / max;
    const scale = d3.scaleLinear().domain([0, max]).range([0, 1]);

    const innerTicks = scale
      .ticks(20)
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
          {isProjection1 && isProjectionDataLoaded ? projection1 : null}
          {isProjection2 && isProjectionDataLoaded ? projection2 : null}

          <circle cx={0} cy={0} r={9} />
          <line
            stroke="black"
            strokeWidth={1}
            x1={0}
            y1={0}
            x2={0}
            y2={-radius + 123}
            transform={`rotate(${percentToDeg(days)})`}
          />
          <circle cx={0} cy={0} r={3} fill="#aaa" />
          {(percentToDeg(days) >= 0 && percentToDeg(days) <= 90) ||
            (percentToDeg(days) >= 270 && percentToDeg(days) <= 360)
            ? <text
                textAnchor="middle"
                x={0}
                y={25}
                style={{
                  fontSize: ".7em",
                  fill: "#00D1B2",
                  fontWeight: "bold"
                }}
              >
                {`${days} days above ${temperature}`}

              </text>
            : <text
                textAnchor="middle"
                x={0}
                y={-20}
                style={{
                  fontSize: ".7em",
                  fill: "#00D1B2",
                  fontWeight: "bold"
                }}
              >
                {`${days} days above ${temperature}`}

              </text>}

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
