import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled components
import { Page, MyApp, LeftContainer, RightContainer } from "./styles";

// utilities
import { fetchObservedData, fetchProjections } from "./fetchData";

// components
import SelectionMenu from "./components/SelectionMenu";
import Widget from "./components/Widget";

@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  getData = async () => {
    // this.props.store.app.setIsObservedDataLoaded(false);
    this.props.store.app.setIsProjectionDataLoaded(false);
    const { protocol, station, temperature } = this.props.store.app;

    // current year
    const observedData = await fetchObservedData(
      protocol,
      station,
      temperature
    );
    // LOGS ------
    const data = observedData.map(year => Number(year[1]));
    console.log(`%cObserved: ${data}`, `color: red`);
    const min = Math.min(...data.slice(0, -1));
    console.log(`%cmin: ${min}`, `color: red`);
    const max = Math.max(...data);
    console.log(`%cmax: ${max}`, `color: red`);
    // LOGS ------
    this.props.store.app.setObservedData(observedData);
    this.props.store.app.setIsObservedDataLoaded(true);

    // projections
    const projectionsModel = await fetchProjections(
      protocol,
      station,
      temperature
    );
    // LOGS ------
    const data2040 = projectionsModel[0].map(year => Number(year[1]));
    console.log(`%cProjection 2040-2069: ${data2040}`, `color: blue`);
    const max2040 = Math.max(...data2040);
    console.log(`%cmax: ${max2040}`, `color: blue`);
    // LOGS ------
    this.props.store.app.setProjectedData2040(projectionsModel[0]);

    // LOGS ------
    const data2070 = projectionsModel[1].map(year => Number(year[1]));
    console.log(`%cProjection 2070-2069: ${data2070}`, `color: green`);
    const max2070 = Math.max(...data2070);
    console.log(`%cmax: ${max2070}`, `color: green`);
    // LOGS ------
    this.props.store.app.setProjectedData2070(projectionsModel[1]);

    this.props.store.app.setIsProjectionDataLoaded(true);
  };

  render() {
    const { isObservedDataLoaded } = this.props.store.app;
    return (
      <Page>
        <MyApp>
          <LeftContainer>
            <SelectionMenu onChange={this.getData} />
          </LeftContainer>

          <RightContainer>
            {/* <Top>
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
            </Top> */}
            {isObservedDataLoaded && <Widget />}
          </RightContainer>
        </MyApp>
      </Page>
    );
  }
}

export default App;
