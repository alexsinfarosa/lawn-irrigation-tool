import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { PieChart, Pie, Sector, Cell } from "recharts";

const COLORS = ["#292F36", "#0088FE", "#7FB069", "#FFBB28", "#E63B2E"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  startAngle,
  midAngle,
  endAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(startAngle, midAngle, endAngle);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={-8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const data = [
      { name: "Not Observed", value: 200 },
      { name: "Below", value: 200 },
      { name: "Slightly Below", value: 200 },
      { name: "Slightly Above", value: 200 },
      { name: "Above", value: 200 }
    ];

    const cell = data.map((entry, index) => {
      return <Cell key={index} fill={COLORS[index % COLORS.length]} />;
    });

    return (
      <PieChart width={600} height={600} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={300}
          cy={300}
          activeIndex={0}
          activeShape={renderActiveShape}
          startAngle={220}
          endAngle={-40}
          labelLine={false}
          // label={renderCustomizedLabel}
          outerRadius={140}
          innerRadius={120}
          paddingAngle={2}
        >
          {cell}
        </Pie>
      </PieChart>
    );
  }
}
