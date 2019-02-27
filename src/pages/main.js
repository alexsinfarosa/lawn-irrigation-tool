import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/styles";

import RingLoader from "react-spinners/RingLoader";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";

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
  sprinkler: { type: "", minutes: 0, waterFlow: null },
  streetNumber: null
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const MainPage = () => {
  console.log("MainPage");
  const theme = useTheme();
  const [mainPageIdx, setMainPageIdx] = React.useState(1);
  const handleMainPageIdx = i => setMainPageIdx(i);

  const [field, setField] = React.useState(fieldInitialState);
  const [fields, setFields] = React.useState(fieldsInitialState);

  function handleChangeField(event) {
    setField({ ...field, [event.target.name]: event.target.value });
  }

  const readFromLocalstorage = () => {
    // console.log("readFromLocalStorage");
    const localStorageRef = localStorage.getItem("nrcc-irrigation-tool");
    // console.log(localStorageRef);
    if (localStorageRef) {
      const params = JSON.parse(localStorageRef);
      // console.log(params);
      if (params.length > 0) {
        const fieldCopy = { ...fieldInitialState };

        fieldCopy.address = params[0].address;
        fieldCopy.cropType = params[0].cropType;
        fieldCopy.data = [...params[0].data];
        fieldCopy.forecast = { ...params[0].forecast };
        fieldCopy.id = params[0].id;
        fieldCopy.irrigationDate = params[0].irrigationDate;
        fieldCopy.latitude = params[0].latitude;
        fieldCopy.longitude = params[0].longitude;
        fieldCopy.soilCapacity = params[0].soilCapacity;
        fieldCopy.sprinklerType = params[0].sprinklerType;
        fieldCopy.streetNumber = params[0].streetNumber;
        setField(fieldCopy);

        // setting up initial state for the fields
        setFields(params);
      }
    }
  };

  React.useEffect(() => {
    readFromLocalstorage();
  }, [field.address]);

  console.log(field, fields);
  return (
    <Layout>
      <SEO title="Main" keywords={[`gatsby`]} />

      {field.data.length !== 0 ? (
        <div style={{ height: "100%" }}>
          <SwipeableViews
            index={mainPageIdx}
            onChangeIndex={() => setMainPageIdx(mainPageIdx)}
            enableMouseEvents
          >
            <Forecast
              handleMainPageIdx={handleMainPageIdx}
              forecast={field.forecast}
              address={field.address}
            />
            <Field handleMainPageIdx={handleMainPageIdx} field={field} />
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
