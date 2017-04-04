import { observable, action } from "mobx";
import { states } from "../states";

export default class AppStore {
  // logic------------------------------------------------------------------------------------
  @observable protocol = window.location.protocol;

  //State--------------------------------------------------------------------------------------
  @observable state = JSON.parse(localStorage.getItem("state")) || {};
  @action setState = stateName => {
    this.state = states.filter(state => state.name === stateName)[0];
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  //Station---------------------------------------------------------------------------------
  @observable stations = [];
  @action setStations = d => this.stations = d;

  @observable station = JSON.parse(localStorage.getItem("station")) || {};
  @action setStation = stationName => {
    this.station = this.stations.filter(
      station => station.name === stationName
    )[0];
    localStorage.setItem("station", JSON.stringify(this.station));
  };

  // ACISData -----------------------------------------------------------------------------------
  @observable ACISData = [];
  @action setACISData = d => this.ACISData = d;
}
