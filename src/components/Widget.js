import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as d3 from "d3";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    // console.log(d3);
    const width = 500;
    const height = 500;
    const margin = {
      top: 160,
      right: 40,
      bottom: 30,
      left: 340
    };

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

    const radius = Math.min(width, height) / 2;
    const percentToDeg = percent => percent * 180 / 60;

    const currentYear = d3
      .arc()
      .innerRadius(radius)
      .outerRadius(radius + 20)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    const p20402069 = d3
      .arc()
      .innerRadius(radius + 25)
      .outerRadius(radius + 45)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    const p20692099 = d3
      .arc()
      .innerRadius(radius + 50)
      .outerRadius(radius + 70)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

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
      <svg width="100%" height={`${height + margin.top + margin.bottom}`}>
        <g
          transform={
            `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`
          }
        >
          <path d={currentYear()} fill="red" />
          <path d={p20402069()} fill="lightgreen" />
          <path d={p20692099()} fill="orange" />
          <circle cx={0} cy={0} r={7} />
          <text textAnchor="middle" x={0} y={40}>{49}</text>
          <line
            stroke="#aaa"
            strokeWidth={2}
            x1={0}
            y1={0}
            x2={-210}
            y2={0}
            transform={`rotate(${percentToDeg(17)})`}
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
