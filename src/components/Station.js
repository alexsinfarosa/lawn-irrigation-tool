import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { stations } from "../stations";

@inject("store")
@observer
class Station extends Component {
  handleChange = e => {
    this.props.store.app.setSelectedStation(true);
    this.props.store.app.setStation(e.target.name);
    if (typeof this.props.onChange === "function") {
      this.props.onChange(e.target.name);
    }
  };

  render() {
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
      </aside>
    );
  }
}

export default Station;
