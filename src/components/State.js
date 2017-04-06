import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// Utilities
import { states } from "../states";

// styled-components
// import { Select, Selector } from "./styles";

@inject("store")
@observer
class State extends Component {
  handleChange = e => {
    this.props.store.app.setSelectState(true);
    this.props.store.app.setState(e.target.value);
    this.props.store.app.setSelectStation(false);
    this.props.store.app.station = {};
  };

  render() {
    const stateList = states.map(state => (
      <option key={state.postalCode}>{state.name}</option>
    ));

    return (
      <div className="field">
        <p className="control">
          <span className="select is-small">
            <select
              name="state"
              value={this.props.store.app.state.name}
              onChange={this.handleChange}
            >
              {this.props.store.app.selectState
                ? null
                : <option>Select State</option>}
              {stateList}
            </select>
          </span>
        </p>
      </div>
    );
  }
}
export default State;
