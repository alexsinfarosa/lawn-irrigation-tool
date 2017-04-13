import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import axios from "axios";
import { jStat } from "jStat";

// styled components
import { Page, MyApp, Top, LeftContainer, RightContainer } from "./styles";

// utilities
import { currentYearData, projection1, projection2 } from "./fetchData";

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

  currentModel = (fetchedData, isProjection1, isProjection2) => {
    const data = fetchedData.map(year => Number(year[1]));
    console.log(`%cObserved: ${data}`, `color: red`);
    this.props.store.app.setDays(data[data.length - 2]);

    // Exclude current year from calculating min value
    const min = Math.min(...data.slice(0, -1));
    this.props.store.app.setMinValCY(min);

    // Change scale
    let aboveMax = 0;
    if (isProjection1) {
      aboveMax = this.props.store.app.maxValP1;
    } else if (isProjection2) {
      aboveMax = this.props.store.app.maxValP2;
    }
    console.log(`%caboveMax: ${aboveMax}`, `color: red`);
    console.log(`%cmin: ${min}`, `color: red`);

    const max = Math.max(...data);
    this.props.store.app.setMaxValCY(max);
    console.log(`%cmax: ${max}`, `color: red`);

    const quantiles = jStat.quantiles(data.slice(0, -1), [0.25, 0.5, 0.75, 1]);
    let results = [min, ...quantiles, aboveMax];
    results = results.map(e => Math.round(e));
    console.log(`%cresults: ${results}`, `color: red`);
    this.props.store.app.setObservedData(results);
  };

  projection1Model = projection2040 => {
    const data = projection2040.map(year => Number(year[1]));
    console.log(`%cProjection 2040-2069: ${data}`, `color: blue`);
    const min = Math.min(...data);
    const max = Math.max(...data);
    console.log(`%cmax: ${max}`, `color: blue`);
    this.props.store.app.setMaxValP1(max);
    const quantiles = jStat.quantiles(data, [0.25, 0.5, 0.75, 1]);
    let results = [min, ...quantiles];
    results = results.map(e => Math.round(e));
    console.log(`%cresults: ${results}`, `color: blue`);
    this.props.store.app.setProjectedData1(results);
  };

  projection2Model = projection2070 => {
    const data = projection2070.map(year => Number(year[1]));
    console.log(`%cProjection 2070-2099: ${data}`, `color: green`);
    const min = Math.min(...data);
    const max = Math.max(...data);
    console.log(`%cmax: ${max}`, `color: green`);
    this.props.store.app.setMaxValP2(max);
    const quantiles = jStat.quantiles(data, [0.25, 0.5, 0.75, 1]);
    let results = [min, ...quantiles];
    results = results.map(e => Math.round(e));
    console.log(`%cresults: ${results}`, `color: green`);
    this.props.store.app.setProjectedData2(results);
  };

  async fetchData() {
    const {
      protocol,
      station,
      temperature,
      isProjection1,
      isProjection2
    } = this.props.store.app;

    // current year
    const observedData = await currentYearData(protocol, station, temperature);
    this.currentModel(observedData, isProjection1, isProjection2);

    // projections
    const projection2040 = await projection1(protocol, station, temperature);
    this.projection1Model(projection2040);

    // projection 2
    const projection2070 = await projection2(protocol, station, temperature);
    this.projection2Model(projection2070);
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
              <p>
                There have been
                {" "}
                <strong>{days}</strong>
                {" "}
                days above
                {" "}
                <strong>{temperature}˚F</strong>
                {" "}
                so far <strong>LAST</strong> year
              </p>
              <p />
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
