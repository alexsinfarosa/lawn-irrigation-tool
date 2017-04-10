import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { when } from "mobx";
import axios from "axios";

// styled components
import {
  Page,
  MyApp,
  Top,
  LeftContainer,
  RightContainer,
  Bottom
} from "./styles";

// utilities
import { currentYearData } from "./fetchData";
import { quartileBounds } from "./utils";

// components
// import State from "./components/State";
import Station from "./components/Station";
import WidgetTest from "./components/WidgetTest";
import Slider from "./components/Slider";

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
        const selectedStations = res.data.stations.filter(e => {
          return e.name === "Boston Logan" ||
            e.name === "Hartford" ||
            e.name === "Providence" ||
            e.name === "Philadelphia" ||
            e.name === "Islip" ||
            e.name === "NYC-Central Park";
        });
        this.props.store.app.setStations(selectedStations);
        this.getData();
      })
      .catch(err => {
        console.log(err);
        this.props.store.app.setStations([]);
      });
  };

  async getData() {
    const { protocol, station } = this.props.store.app;
    const observedData = await currentYearData(protocol, station);
    console.log(observedData);
    const data = observedData.map(year => year[1]);
    this.props.store.app.setDays(data[data.length - 1]);
    this.props.store.app.setObservedData(quartileBounds(data));
  }

  render() {
    const { temperature, days } = this.props.store.app;
    return (
      <Page>
        <MyApp>
          <LeftContainer>
            <Station />
          </LeftContainer>

          <RightContainer>
            <Top>
              There have been
              {" "}
              <strong>{days}</strong>
              {" "}
              days above
              {" "}
              <strong>{temperature}˚F</strong>
              {" "}
              so far this year
            </Top>
            <WidgetTest />
            <Bottom>
              <Slider />
            </Bottom>
          </RightContainer>
        </MyApp>
      </Page>
    );
  }
}

export default App;
