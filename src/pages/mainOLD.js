import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/styles";

import RingLoader from "react-spinners/RingLoader";

import Layout from "../components/layout";
import SEO from "../components/seo";

// utils --------------------------------------
import { fetchForecastData } from "../utils/api.js";

// components
import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";

let initialFields = [];
const initialState = {
  address: "",
  cropType: "grass",
  data: [],
  forecast: {},
  id: null,
  irrigationDate: new Date().toString(),
  lat: null,
  lng: null,
  soilCapacity: "medium",
  sprinkler: { name: "", img: null, waterFlow: null, minutes: 0 },
  streetNumber: null
};

function reducer(state, action) {
  // console.log(state, action);
  switch (action.type) {
    case "setState":
      return action.state;
    case "setLocation":
      return {
        ...state,
        address: action.address,
        lat: action.lat,
        lng: action.lng,
        streetNumber: action.streetNumber
      };
    case "setIrrigationDate":
      return { ...state, irrigationDate: action.irrigationDate };
    case "setSprinkler":
      return { ...state, sprinkler: action.sprinkler };
    case "setForecast":
      return { ...state, forecast: action.forecast };
    case "setData":
      return { ...state, data: action.data };
    case "setCropType":
      return { ...state, cropType: action.cropType };
    case "setSoilCapacity":
      return { ...state, soilCapacity: action.soilCapacity };
    case "setId":
      return { ...state, id: action.id };
    case "reset":
      return {
        address: "",
        cropType: "grass",
        data: [],
        forecast: {},
        id: null,
        irrigationDate: new Date().toString(),
        lat: null,
        lng: null,
        soilCapacity: "medium",
        sprinkler: { name: "", img: null, waterFlow: null, minutes: 0 },
        streetNumber: null
      };
    default:
      throw new Error();
  }
}

const MainPage = () => {
  console.log("MainPage");
  const theme = useTheme();

  // STATE --------------------------------------------------------
  const [loading, setLoading] = React.useState(false);
  const [mainPageIdx, setMainPageIdx] = React.useState(1);
  const handleMainPageIdx = i => setMainPageIdx(i);

  // Add Field if field params are in local storage--------------------------
  const addField = async () => {
    const fieldsRef = JSON.parse(
      window.localStorage.getItem("nrcc-irrigation-tool")
    );
    if (fieldsRef) {
      initialFields = [...fieldsRef];
    }

    const locationRef = window.localStorage.getItem("LIT_location");
    const irrigationDateRef = window.localStorage.getItem("LIT_irrigationDate");
    const sprinklerRef = window.localStorage.getItem("LIT_sprinkler");
    if (locationRef && irrigationDateRef && sprinklerRef) {
      setLoading(true);
      let newState = { ...initialState };
      // set location
      const location = { ...JSON.parse(locationRef) };
      newState.address = location.address;
      newState.lat = location.lat;
      newState.lng = location.lng;
      newState.streetNumber = location.streetNumber;

      // set irrigationDate
      const irrigationDate = new Date(irrigationDateRef).toString();
      newState.irrigationDate = irrigationDate;

      // set sprinkler
      const sprinkler = { ...JSON.parse(sprinklerRef) };
      newState.sprinkler.name = sprinkler.name;
      newState.sprinkler.img = sprinkler.img;
      newState.sprinkler.waterFlow = sprinkler.waterFlow;
      newState.sprinkler.minutes = sprinkler.minutes;

      // set forecast
      const forecast = await fetchForecastData(location.lat, location.lng);
      newState.forecast = { ...forecast };

      // set data...
      // const data = await getDate()
      // dispatch({type: 'setData', data})

      // set id
      newState.id = Date.now();

      // add new field to fields in local storage
      initialFields = [newState, ...initialFields];
      window.localStorage.setItem(
        "nrcc-irrigation-tool",
        JSON.stringify(initialFields)
      );

      // delete items from local storage
      window.localStorage.removeItem("LIT_location");
      window.localStorage.removeItem("LIT_irrigationDate");
      window.localStorage.removeItem("LIT_sprinkler");

      setLoading(false);
      return newState;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fieldsLocalStorageRef = () => initialFields;
  const [fields] = React.useState(fieldsLocalStorageRef);

  React.useEffect(() => {
    addField().then(res => {
      if (res) {
        dispatch({ type: "setState", state: { ...res } });
      }
    });
    dispatch({ type: "setState", state: { ...fields[0] } });
  }, [fields]);

  console.log(state, fields);
  return (
    <Layout>
      <SEO title="Main" keywords={[`gatsby`]} />

      {!loading ? (
        <div style={{ height: "100%" }}>
          <SwipeableViews
            index={mainPageIdx}
            onChangeIndex={() => setMainPageIdx(mainPageIdx)}
            enableMouseEvents
          >
            <Forecast
              handleMainPageIdx={handleMainPageIdx}
              forecast={state.forecast}
              address={state.address}
            />
            <Field handleMainPageIdx={handleMainPageIdx} field={state} />
            <Fields handleMainPageIdx={handleMainPageIdx} fields={fields} />
          </SwipeableViews>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <RingLoader color={theme.palette.primary.main} />
        </div>
      )}
    </Layout>
  );
};

export default MainPage;
