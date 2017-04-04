import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { when } from "mobx";
import axios from "axios";

import { Page, Main } from "./styles";

@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    when(
      // once...
      () => this.props.store.app.stations.length === 0,
      // ... then
      () => this.fetchAllStations()
    );
  }

  fetchAllStations = () => {
    const protocol = this.props.store.app.protocol;
    axios
      // rhum = station reporting relative humidity
      .get(`${protocol}//newa2.nrcc.cornell.edu/newaUtil/stateStationList/all`)
      .then(res => {
        this.props.store.app.setStations(res.data.stations);
      })
      .catch(err => {
        console.log(err);
        this.props.store.app.setStations([]);
      });
  };

  render() {
    return (
      <Page>
        <Main>
          <p>hello</p>
        </Main>
      </Page>
    );
  }
}

export default App;
