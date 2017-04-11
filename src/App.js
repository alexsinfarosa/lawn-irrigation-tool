import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import axios from "axios";
import { jStat } from "jStat";

// styled components
import { Page, MyApp, Top, LeftContainer, RightContainer } from "./styles";

// utilities
import { currentYearData } from "./fetchData";

// components
import SelectionMenu from "./components/SelectionMenu";
import Widget from "./components/Widget";
// import Slider from "./components/Slider";

@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  async fetchData() {
    const { protocol, station, temperature } = this.props.store.app;
    const observedData = await currentYearData(protocol, station, temperature);
    const data = observedData.map(year => Number(year[1]));
    this.props.store.app.setDays(data[data.length - 2]);
    const min = Math.min(...data);
    const quantiles = jStat.quantiles(data, [0.25, 0.5, 0.75, 1]);
    const results = [min, ...quantiles];
    this.props.store.app.setObservedData(results);
  }

  submitRequest = () => {
    this.fetchData();
  };

  render() {
    const {
      temperature,
      days
    } = this.props.store.app;
    // this.props.store.app.observedData.map(e => console.log(e));
    return (
      <Page>
        <MyApp>
          <LeftContainer>
            <SelectionMenu onChange={this.submitRequest} />
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
            <Widget />
            {/* <Bottom> */}
            {/* <Slider onChange={this.submitRequest} /> */}
            {/* </Bottom> */}
          </RightContainer>
        </MyApp>
      </Page>
    );
  }
}

export default App;
