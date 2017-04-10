import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

@inject("store")
@observer
class Station extends Component {
  handleChange = e => {
    this.props.store.app.setStation(e.target.value);
  };

  render() {
    console.log(toJS(this.props.store.app.station));
    const {
      station,
      stations,
      selectStation
    } = this.props.store.app;

    console.log(stations.slice());

    const stationList = stations.map(station => (
      <option key={station.sid}>{station.name}</option>
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
