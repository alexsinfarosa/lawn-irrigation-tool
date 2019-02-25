import React from "react";
import PropTypes from "prop-types";
import { Context } from "./createContext";

const fieldsInitialState = [];
const fieldInitialState = {
  address: "",
  cropType: "grass",
  data: [],
  forecast: null,
  id: null,
  irrigationDate: new Date().toString(),
  latitude: null,
  longitude: null,
  soilCapacity: "medium",
  sprinklerType: { name: "", flux: null },
  streetNumber: null
};

const AppProvider = ({ children }) => {
  const [field, setField] = React.useState(fieldInitialState);
  const [fields, setFields] = React.useState(fieldsInitialState);

  function handleChangeField(event) {
    setField({ ...field, [event.target.name]: event.target.value });
  }

  const readFromLocalstorage = () => {
    console.log("readFromLocalStorage");
    const localStorageRef = localStorage.getItem("nrcc-irrigation-tool");
    // console.log(localStorageRef);
    if (localStorageRef) {
      const params = JSON.parse(localStorageRef);
      // console.log(params);
      if (params.length > 0) {
        // setting up initial state for the field
        fieldInitialState.address = params[0].address;
        fieldInitialState.cropType = params[0].cropType;
        fieldInitialState.data = [...params[0].data];
        fieldInitialState.forecast = { ...params[0].forecast };
        fieldInitialState.id = params[0].id;
        fieldInitialState.irrigationDate = params[0].irrigationDate;
        fieldInitialState.latitude = params[0].latitude;
        fieldInitialState.longitude = params[0].longitude;
        fieldInitialState.soilCapacity = params[0].soilCapacity;
        fieldInitialState.sprinklerType = params[0].sprinklerType;
        fieldInitialState.streetNumber = params[0].streetNumber;

        // setting up initial state for the fields
        fieldsInitialState.push(...params);
      }
    }
  };

  React.useEffect(() => {
    readFromLocalstorage();
  }, [fields]);

  console.log(field);
  return (
    <Context.Provider value={{ field, fields, handleChangeField }}>
      {children}
    </Context.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
