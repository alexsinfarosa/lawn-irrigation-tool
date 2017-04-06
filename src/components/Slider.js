import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./slider.css";

@inject("store")
@observer
class Slider extends Component {
  handleChange = e => {
    this.props.store.app.setTemperature(e.target.value);
  };

  render() {
    return (
      <div>
        <label className="temperature">Temperature (F)</label>
        <input
          type="range"
          min="0"
          max="60"
          value={this.props.store.app.temperature}
          step="1"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default Slider;
