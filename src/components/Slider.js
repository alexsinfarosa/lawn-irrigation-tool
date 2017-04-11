import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./slider.css";

@inject("store")
@observer
class Slider extends Component {
  handleChange = e => {
    this.props.store.app.setTemperature(e.target.value);
    // if (typeof this.props.onChange === "function") {
    //   this.props.onChange(e.target.name);
    // }
  };

  render() {
    const { temperature } = this.props.store.app;
    return (
      <div style={{ textAlign: "right" }}>
        {/* <label className="temperature">T (˚F)</label> */}
        <input
          name="slider"
          type="range"
          min="85"
          max="100"
          value={temperature}
          step="1"
          onChange={this.handleChange}
        />
        <output htmlFor="slider">
          {" "}
          <small>
            <strong>{temperature}</strong>
          </small>
        </output>
      </div>
    );
  }
}
export default Slider;
