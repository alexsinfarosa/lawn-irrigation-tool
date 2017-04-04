import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import d3 from "d3";
import { RadialBarChart, RadialBar, Tooltip, Rectangle } from "recharts";

// styled components
// import { Svg } from "../styles";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const data = [
      { name: "18-24", uv: 31.47, pv: 2400, fill: "#8884d8" },
      { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
      { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" }
    ];
    return (
      <RadialBarChart
        width={700}
        height={700}
        innerRadius="60%"
        outerRadius="100%"
        barSize={30}
        data={data}
      >
        <RadialBar
          minAngle={15}
          label
          background
          clockWise={true}
          dataKey="uv"
        />
        <Rectangle x={350} y={10} width={2} />
        {/* <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        /> */}
        <Tooltip />
      </RadialBarChart>
    );
  }
}
