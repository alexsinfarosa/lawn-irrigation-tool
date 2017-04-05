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

    // -----------------------------------------------------------------------------------------
    const width = 300;
    const height = 300;
    const margin = {
      top: 60,
      right: 40,
      bottom: 30,
      left: 40
    };

    const config = {
      minAngle: -90,
      maxAngle: 90,
      innerTickRingOffset: -30,
      innerTickCounterclockSpin: 0,
      innerTickNumber: 10,
      outerTickRingOffset: 25,
      outerTickCounterclockSpin: 5,
      outerTickBorderLength: 30
    };

    const radius = Math.min(width, height) / 2;

    const percentToDeg = percent => percent * 180 / 100;

    const element = d3.select(".gauge");

    const arc = d3.svg
      .arc()
      .innerRadius(radius)
      .outerRadius(radius - 10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    const scale = d3.scale.linear().domain([0, 10]).range([0, 1]);

    const innerTicks = scale.ticks(config.innerTickNumber).map(tick => ({
      value: tick,
      label: tick
    }));

    const outerTicks = [
      {
        value: 4,
        label: "Low"
      },
      {
        value: 6.8,
        borderAt: 6,
        label: "Ok"
      },
      {
        value: 8.3,
        borderAt: 7.5,
        label: "Good"
      },
      {
        value: 10,
        borderAt: 9,
        counterNotch: 7,
        label: "Great"
      }
    ];

    console.log("outerTicks", outerTicks);

    const svg = element
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom);

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#c00")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#0c0")
      .attr("stop-opacity", 1);

    // Add layer for the panel
    const chart = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left},${height / 2 + margin.top})`
      );

    chart
      .append("path")
      .attr("class", "arc")
      .style("fill", "url(#gradient)")
      .attr("d", arc);

    chart
      .append("circle")
      .attr("class", "needle-center")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5);

    chart
      .append("line")
      .attr("class", "needle")
      .style("stroke", "black")
      .style("stroke-width", "4")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", -170)
      .attr("y2", 0)
      .transition()
      .delay(300)
      .ease("bounce")
      .duration(500)
      .attr("transform", () => "rotate(" + percentToDeg(80) + ")");

    const innerTicksGroup = chart.append("g").attr("class", "inner-ticks");

    innerTicksGroup
      .selectAll("text")
      .data(innerTicks)
      .enter()
      .append("text")
      .attr("class", "tick")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        var ratio = scale(d.value);
        var newAngle = config.minAngle + ratio * 180;
        return `rotate(${newAngle}) translate(0, ${-(radius + config.innerTickRingOffset)})`;
      })
      .text(d => d.label);

    const outerTicksGroup = chart.append("g").attr("class", "outer-ticks");

    outerTicksGroup
      .selectAll("text")
      .data(outerTicks)
      .enter()
      .append("text")
      .attr("class", "tick")
      .attr("text-anchor", "middle")
      .attr("transform", function(d, i) {
        var ratio = scale(d.value);
        var newAngle = config.minAngle +
          ratio * 180 -
          (d.counterNotch ? d.counterNotch : 0);
        return `rotate(${newAngle}) translate(0, ${-(radius + config.outerTickRingOffset)})`;
      })
      .text(d => d.label);

    outerTicksGroup
      .selectAll("line")
      .data(outerTicks)
      .enter()
      .append("line")
      .filter(d => !!d.borderAt)
      .attr("class", "line")
      .attr("x1", 0)
      .attr("y1", -radius)
      .attr("x2", 0)
      .attr("y2", -(radius + config.outerTickBorderLength))
      .style("stroke", "black")
      .attr("transform", function(d) {
        var ratio = scale(d.borderAt);
        var newAngle = config.minAngle + ratio * 180;
        return `rotate(${newAngle})`;
      });

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
