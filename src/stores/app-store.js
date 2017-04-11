import { observable, action } from "mobx";
import { stations } from "../stations";

export default class AppStore {
  // logic------------------------------------------------------------------------------------
  @observable protocol = window.location.protocol;

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

  @observable days = 0;
  @action setDays = d => this.days = d;

  @observable projectedData1 = [];
  @action setProjectedData1 = d => this.projectedData1 = d;

  @observable projectedData2 = [];
  @action setProjectedData2 = d => this.projectedData2 = d;

  // Slider -------------------------------------------------------------------------------------
  @observable temperature = JSON.parse(localStorage.getItem("temperature")) ||
    90;
  @action setTemperature = d => {
    this.temperature = d;
    localStorage.setItem("temperature", JSON.stringify(this.temperature));
  };
}
