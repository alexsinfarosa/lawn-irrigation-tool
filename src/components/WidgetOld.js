import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import d3 from "d3";
import { PieChart, Pie, Cell } from "recharts";

// styled components
// import { Svg } from "../styles";

@inject("store")
@observer
export default class Widget extends Component {
  render() {
    const RADIAN = Math.PI / 180;
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const renderCustomizedLabel = (
      { cx, cy, midAngle, innerRadius, outerRadius, percent, index }
    ) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 13;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="middle"
        >
          {`${index * 10}`}
        </text>
      );
    };

    const renderCustomizedLines = ({ cx, cy, index, midAngle }) => {
      return <rect x={305} y={344} width={1} height={20} fill="black" />;
    };

    const data0 = [
      { name: "B", value: 10 },
      { name: "C", value: 10 },
      { name: "D", value: 10 },
      { name: "E", value: 10 },
      { name: "F", value: 10 },
      { name: "G", value: 10 },
      { name: "G", value: 10 }
    ];
    const data1 = [
      { name: "Group A", value: 100 },
      { name: "Group B", value: 200 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 400 }
    ];
    const data2 = [
      { name: "Group A", value: 150 },
      { name: "Group B", value: 350 },
      { name: "Group C", value: 320 },
      { name: "Group D", value: 100 }
    ];
    const data3 = [
      { name: "Group A", value: 200 },
      { name: "Group B", value: 370 },
      { name: "Group C", value: 430 },
      { name: "Group D", value: 300 }
    ];

    return (
      <div>
        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          <rect x={305} y={344} width={1} height={20} fill="black" />;
          <Pie
            outerRadius={112}
            innerRadius={110}
            startAngle={180}
            endAngle={0}
            data={data0}
            cx={400}
            cy={400}
            labelLine={true}
            label={renderCustomizedLabel}
            fill="#8884d8"
          >
            {data0.map((entry, index) => <Cell key={index} fill="#333" />)}
          </Pie>

          <Pie
            outerRadius={180}
            innerRadius={160}
            startAngle={180}
            endAngle={0}
            data={data1}
            cx={400}
            cy={400}
            labelLine={false}
            // label={renderCustomizedLabel}
            fill="#8884d8"
          >
            {data1.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Pie
            outerRadius={210}
            innerRadius={190}
            startAngle={180}
            endAngle={0}
            data={data2}
            cx={400}
            cy={400}
            labelLine={false}
            // label={renderCustomizedLabel}
            fill="#8884d8"
          >
            {data2.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Pie
            outerRadius={240}
            innerRadius={220}
            startAngle={180}
            endAngle={0}
            data={data3}
            cx={400}
            cy={400}
            // labelLine={false}
            // label={renderCustomizedLabel}
            fill="#8884d8"
          >
            {data3.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}
