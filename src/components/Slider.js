import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./slider.css";

@inject("store")
@observer
class Slider extends Component {
  handleChange = e => {
    console.log(e.target);
    this.props.store.app.setTemperature(e.target.value);
    this.props.onChange();
    // if (typeof this.props.onChange === "function") {
    //   this.props.onChange(e.target.name);
    // }
  };

  render() {
    const { temperature } = this.props.store.app;
    return (
      <div>
        {/* <label className="temperature">T (˚F)</label> */}
        <input
          name="slider"
          type="range"
          min="74"
          max="96"
          value={temperature}
          step="2"
          onChange={this.handleChange}
        />
        <output htmlFor="slider">
          {" "}
          <small>
            <strong style={{ color: "#00D1B2" }}>{temperature}</strong>
          </small>
        </output>
      </div>
    );
  }
}
export default Slider;
