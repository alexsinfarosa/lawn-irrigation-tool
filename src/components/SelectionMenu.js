import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { stations } from "../stations";
import Slider from "./Slider";

@inject("store")
@observer
class SelectionMenu extends Component {
  handleChange = e => {
    this.props.store.app.setSelectedStation(true);
    this.props.store.app.setStation(e.target.name);
    if (typeof this.props.onChange === "function") {
      this.props.onChange(e.target.name);
    }
  };

  render() {
    const {
      isProjection1,
      isProjection2,
      setIsProjection1,
      setIsProjection2
    } = this.props.store.app;
    // console.log(toJS(this.props.store.app.station));

    const stationList = stations.map(station => (
      <li key={station.sid} onClick={this.handleChange}>
        <a
          name={station.name}
          className={
            station.name === this.props.store.app.station.name
              ? "is-active"
              : null
          }
        >
          {station.name}
        </a>
      </li>
    ));

    return (
      <aside className="menu">

        <p className="menu-label">
          Stations
        </p>
        <ul className="menu-list">
          {stationList}
        </ul>

        <br />

        <p className="menu-label">
          Temperature (˚F)
        </p>
        <ul className="menu-list">
          <Slider name="slider" onChange={this.handleChange} />
        </ul>

        <br />

        <p className="menu-label">
          Projection Graphs
        </p>
        <ul className="menu-list">
          <li onClick={setIsProjection1} style={{ marginBottom: "2px" }}>
            <a className={isProjection1 ? "is-active" : null}>
              Projection 2040-2069
            </a>
          </li>
          <li onClick={setIsProjection2}>
            <a className={isProjection2 ? "is-active" : null}>
              Projection 2070-2099
            </a>
          </li>
        </ul>

      </aside>
    );
  }
}

export default SelectionMenu;
