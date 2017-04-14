import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { stations } from "../stations";
import Slider from "./Slider";
import Loader from "react-loaders";

import "./slider.css";

@inject("store")
@observer
class SelectionMenu extends Component {
  handleChange = e => {
    this.props.store.app.setStation(e.target.name);
    this.props.onChange();
  };

  render() {
    const {
      isProjection1,
      isProjection2,
      isProjectionDataLoaded
    } = this.props.store.app;
    console.log(toJS(this.props.store.app.station));

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

    const renderLoader = () => (
      <Loader type="ball-scale-ripple-multiple" active />
    );

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
          {isProjectionDataLoaded ? "Projection" : "Loading..."}
          {" "}
          Graphs
          {" "}
          {isProjectionDataLoaded ? null : renderLoader}
        </p>
        <ul className="menu-list">
          {isProjectionDataLoaded
            ? <li
                onClick={this.props.store.app.setIsProjection1}
                style={{ marginBottom: "2px" }}
              >
                <a
                  name="projection1"
                  className={isProjection1 ? "is-active" : null}
                >
                  Projection <small>2040-2069</small>
                </a>
              </li>
            : <li style={{ marginBottom: "2px" }}>
                <a style={{ opacity: ".4" }}>
                  Projection <small>2040-2069</small>
                </a>
              </li>}
          {isProjectionDataLoaded
            ? <li onClick={this.props.store.app.setIsProjection2}>
                <a
                  name="projection2"
                  className={isProjection2 ? "is-active" : null}
                >
                  Projection <small>2070-2099</small>
                </a>
              </li>
            : <li>
                <a style={{ opacity: ".4" }}>
                  Projection <small>2070-2099</small>
                </a>
              </li>}

        </ul>

      </aside>
    );
  }
}

export default SelectionMenu;
