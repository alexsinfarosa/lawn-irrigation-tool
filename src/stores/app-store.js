import { observable, action, computed } from "mobx";
import { stations } from "../stations";
import { jStat } from "jStat";

export default class AppStore {
  // logic------------------------------------------------------------------------------------
  @observable protocol = window.location.protocol;
  @observable isProjection1 = false;
  @action resetIsProjection1 = d => this.isProjection1 = d
  @action setIsProjection1 = () => {
    this.isProjection1 = !this.isProjection1;
    this.isProjection2 = false;
  };
  @observable isProjection2 = false;
  @action resetIsProjection2 = d => this.isProjection2 = d
  @action setIsProjection2 = () => {
    this.isProjection2 = !this.isProjection2;
    this.isProjection1 = false;
  };
  @observable isObservedDataLoaded = false;
  @action setIsObservedDataLoaded = d => this.isObservedDataLoaded = d;

  @observable isProjectionDataLoaded = false;
  @action setIsProjectionDataLoaded = d => this.isProjectionDataLoaded = d;

  // Stations ---------------------------------------------------------------------------------
  // @action setStations = d => this.stations = d;
  @observable station = JSON.parse(localStorage.getItem("station")) ||
    stations[0];
  @action setStation = d => {
    this.station = stations.find(s => s.name === d);
    localStorage.setItem("station", JSON.stringify(this.station));
  };
  // @observable selectedStation = this.station ? true : false;
  // @action setSelectedStation = d => this.selectedStation = d;

  // Data -----------------------------------------------------------------------------------
  @observable observedData = [];
  @action setObservedData = d => this.observedData = d;

  @computed get observedDataValues() {
    return this.observedData.map(year => Number(year[1]));
  }
  @computed get days() {
    return this.observedDataValues[this.observedDataValues.length - 2];
  }
  @computed get observedDataMin() {
    // removed this.observedDataValues.slice(0,-1)
    return Math.min(...this.observedDataValues);
  }
  @computed get observedDataMax() {
    return Math.max(...this.observedDataValues);
  }
  @computed get observedDataQuantile() {
    return jStat.quantiles(this.observedDataValues, [0.25, 0.5, 0.75, 1]);
  }
  @computed get observedDataToGraph() {
    // Change scale
    let aboveMax = 0;
    if (this.isProjection1) {
      aboveMax = this.projectedData2040Max;
    } else if (this.isProjection2) {
      aboveMax = this.projectedData2070Max;
    }

    let results = [
      this.observedDataMin,
      ...this.observedDataQuantile,
      aboveMax
    ];
    return results.map(e => Math.round(e));
  }

  // Projection 2040-2069 ----------------------------------------------------------
  @observable projectedData2040 = [];
  @action setProjectedData2040 = d => this.projectedData2040 = d;

  @computed get projectedData2040Values() {
    return this.projectedData2040.map(year => Number(year[1]));
  }
  @computed get projectedData2040Min() {
    return Math.min(...this.projectedData2040Values);
  }
  @computed get projectedData2040Max() {
    return Math.max(...this.projectedData2040Values);
  }
  @computed get projectedData2040Quantile() {
    return jStat.quantiles(this.projectedData2040Values, [0.25, 0.5, 0.75, 1]);
  }
  @computed get projectedData2040ToGraph() {
    const results = [
      this.projectedData2040Min,
      ...this.projectedData2040Quantile
    ];
    return results.map(e => Math.round(e));
  }

  // Projection 2070-2099 ----------------------------------------------------------
  @observable projectedData2070 = [];
  @action setProjectedData2070 = d => this.projectedData2070 = d;

  @computed get projectedData2070Values() {
    return this.projectedData2070.map(year => Number(year[1]));
  }
  @computed get projectedData2070Min() {
    return Math.min(...this.projectedData2070Values);
  }
  @computed get projectedData2070Max() {
    return Math.max(...this.projectedData2070Values);
  }
  @computed get projectedData2070Quantile() {
    return jStat.quantiles(this.projectedData2070Values, [0.25, 0.5, 0.75, 1]);
  }
  @computed get projectedData2070ToGraph() {
    let results = [
      this.projectedData2070Min,
      ...this.projectedData2070Quantile
    ];
    return results.map(e => Math.round(e));
  }

  // Slider ---------------------------------------------------------------------------
  @observable temperature = JSON.parse(localStorage.getItem("temperature")) ||
    87;
  @action setTemperature = d => {
    this.temperature = d;
    localStorage.setItem("temperature", JSON.stringify(this.temperature));
  };
}
