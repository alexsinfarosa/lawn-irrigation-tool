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
    const {
      station,
      selectedStation
    } = this.props.store.app;

    const stationList = stations.map(station => (
      <option key={station.sid}>{station.name}</option>
    ));

    const stationList2 = stations.map(station => (
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
      // <div className="field">
      //   <p className="control">
      //     <span className="select is-small">
      //       <select
      //         name="station"
      //         value={station.name}
      //         onChange={this.handleChange}
      //       >
      //         {selectedStation ? null : <option>Select Station</option>}
      //         {stationList}
      //
      //       </select>
      //     </span>
      //   </p>
      // </div>
      (
        <aside className="menu">
          <p className="menu-label">
            Stations
          </p>
          <ul className="menu-list">
            {stationList2}
          </ul>
        </aside>
      )
    );
  }
}

export default Station;
