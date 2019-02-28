import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/styles";

import RingLoader from "react-spinners/RingLoader";

import Layout from "../components/layout";
import SEO from "../components/seo";

// utils --------------------------------------
import { fetchForecastData, getPET } from "../utils/api.js";
import takeRight from "lodash.takeright";

// components
import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";

const MainPage = () => {
  console.log("MainPage");
  const theme = useTheme();

  // STATE --------------------------------------------------------------
  const [loading, setLoading] = React.useState(false);
  const [mainPageIdx, setMainPageIdx] = React.useState(1);
  const handleMainPageIdx = i => setMainPageIdx(i);

  // fields -------------------------------------------------------------
  const initialFields = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [fields] = React.useState(initialFields);

  // field ---------------------------------------------------------------
  const initialField = () => {
    if (fields.length > 0) {
      return fields[0];
    }
    return {
      address: "",
      data: [],
      forecast: {},
      irrigationDate: new Date().toString(),
      lat: null,
      lng: null,
      sprinkler: { name: "", img: null, waterFlow: null, minutes: 0 },
      streetNumber: null
    };
  };
  const [field, setField] = React.useState(initialField);

  // Model data --------------------------------------------------------
  const runModel = async field => {
    const soilCapacity = "medium";
    const fieldCopy = { ...field };

    if (fieldCopy.data === undefined) {
      setLoading(true);
      fieldCopy.forecast = await fetchForecastData(field.lat, field.lng);
      fieldCopy.data = await getPET(
        field.irrigationDate,
        field.lat,
        field.lng,
        soilCapacity,
        0
      );
      fieldCopy.last7Days = takeRight(fieldCopy.data, 7);
      const fields = JSON.parse(
        window.localStorage.getItem("lawn-irrigation-tool")
      );

      const index = fields.findIndex(field => field.id === fieldCopy.id);
      fields.splice(index, 1, fieldCopy);
      window.localStorage.setItem(
        "lawn-irrigation-tool",
        JSON.stringify(fields)
      );
      setLoading(false);
    }

    setField(fieldCopy);
  };

  // side effects ---------------------------------------------------------
  React.useEffect(() => {
    runModel(field);
  }, []);

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
              forecast={field.forecast}
              address={field.address}
            />
            <Field handleMainPageIdx={handleMainPageIdx} field={field} />
            <Fields
              handleMainPageIdx={handleMainPageIdx}
              fields={fields}
              runModel={runModel}
            />
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
