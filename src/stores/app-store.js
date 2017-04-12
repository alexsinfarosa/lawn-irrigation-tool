import { observable, action, computed } from "mobx";
import { stations } from "../stations";

export default class AppStore {
  // logic------------------------------------------------------------------------------------
  @observable protocol = window.location.protocol;
  @observable isProjection1 = false;
  @action setIsProjection1 = () => this.isProjection1 = !this.isProjection1;
  @observable isProjection2 = false;
  @action setIsProjection2 = () => this.isProjection2 = !this.isProjection2;

  // Stations ---------------------------------------------------------------------------------
  @action setStations = d => this.stations = d;
  @observable station = JSON.parse(localStorage.getItem("station")) || {};
  @action setStation = d => {
    this.station = stations.find(s => s.name === d);
    localStorage.setItem("station", JSON.stringify(this.station));
  };
  @observable selectedStation = this.station ? true : false;
  @action setSelectedStation = d => this.selectedStation = d;

  // Data -----------------------------------------------------------------------------------
  @observable observedData = [];
  @action setObservedData = d => this.observedData = d;

  @computed get observedDataValues() {
    return this.observedData.map(year => Number(year[1]));
  }
  @computed get days() {
    return this.observedDataValues[this.observedDataValues.length - 2];
  }
  @observable minVal = 0;
  @action setMinVal = d => this.minVal = d;

  @observable maxVal = 100;
  @action setMaxVal = d => this.maxVal = d;

  // @computed get bandsValues() {
  //   const data = this.observedDataValues;
  //   const min = Math.min(...data);
  //   const quantiles = jStat.quantiles(data, [0.25, 0.5, 0.75, 1]);
  //   return quantiles.unshift(min);
  // }
  @observable days = 0;
  @action setDays = d => this.days = d;

  @observable projectedData1 = [];
  @action setProjectedData1 = d => this.projectedData1 = d;

  @observable projectedData2 = [];
  @action setProjectedData2 = d => this.projectedData2 = d;

  // Slider -------------------------------------------------------------------------------------
  @observable temperature = JSON.parse(localStorage.getItem("temperature")) ||
    null;
  @action setTemperature = d => {
    this.temperature = d;
    localStorage.setItem("temperature", JSON.stringify(this.temperature));
  };
}
