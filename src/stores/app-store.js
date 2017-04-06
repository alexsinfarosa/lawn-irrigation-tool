import { observable, action, computed } from "mobx";
import { states } from "../states";

export default class AppStore {
  // SVG -------------------------------------------------------------------------------------
  @observable width = 500;
  @observable height = 500;
  // logic------------------------------------------------------------------------------------
  @observable protocol = window.location.protocol;

  //State--------------------------------------------------------------------------------------
  @observable state = JSON.parse(localStorage.getItem("state")) || {};
  @action setState = stateName => {
    this.state = states.filter(state => state.name === stateName)[0];
    localStorage.setItem("state", JSON.stringify(this.state));
  };
  @observable selectState = this.state.name ? true : false;
  @action setSelectState = d => {
    this.selectState = d;
    if (this.isLoading) {
      this.setIsMap();
    }
  };

  //Station---------------------------------------------------------------------------------
  @observable stations = [];
  @action setStations = d => this.stations = d;
  @computed get getCurrentStateStations() {
    return this.stations.filter(
      station => station.state === this.state.postalCode
    );
  }
  @observable station = JSON.parse(localStorage.getItem("station")) || {};
  @action setStation = stationName => {
    this.station = this.stations.filter(
      station => station.name === stationName
    )[0];
    localStorage.setItem("station", JSON.stringify(this.station));
  };
  @observable selectStation = this.station.name ? true : false;
  @action setSelectStation = d => this.selectStation = d;

  // ACISData -----------------------------------------------------------------------------------
  @observable ACISData = [];
  @action setACISData = d => this.ACISData = d;

  // Slider -------------------------------------------------------------------------------------
  @observable temperature = 0;
  @action setTemperature = d => this.temperature = d;
}
