import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

@inject("store")
@observer
class Station extends Component {
  handleChange = e => {
    this.props.store.app.setSelectStation(true);
    this.props.store.app.setStation(e.target.value);
  };

  render() {
    // console.log(toJS(this.props.store.app.station));
    const {
      getCurrentStateStations,
      station,
      selectStation
    } = this.props.store.app;

    const stationList = getCurrentStateStations.map(station => (
      <option key={`${station.id} ${station.network}`}>{station.name}</option>
    ));
    return (
      <div className="field">
        <p className="control">
          <span className="select is-small">
            <select
              name="station"
              value={station.name}
              onChange={this.handleChange}
            >
              {selectStation ? null : <option>Select Station</option>}
              {stationList}
            </select>
          </span>
        </p>
      </div>
    );
  }
}

export default Station;
