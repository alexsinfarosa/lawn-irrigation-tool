import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import d3 from "d3";
import { PieChart, Pie, Sector, Cell } from "recharts";

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
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    };
    const data0 = [
      { name: "B", value: 10 },
      { name: "C", value: 20 },
      { name: "D", value: 30 },
      { name: "E", value: 40 },
      { name: "F", value: 50 },
      { name: "G", value: 60 },
      { name: "H", value: 70 },
      { name: "I", value: 80 },
      { name: "L", value: 90 },
      { name: "M", value: 100 }
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
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          outerRadius={120}
          innerRadius={110}
          startAngle={180}
          endAngle={0}
          data={data0}
          cx={400}
          cy={400}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
        >
          {data0.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
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
          label={renderCustomizedLabel}
          fill="#8884d8"
        >
          {data1.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
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
          label={renderCustomizedLabel}
          fill="#8884d8"
        >
          {data2.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
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
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
        >
          {data3.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
