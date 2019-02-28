import React from "react";
import { Redirect } from "@reach/router";

import SwipeableViews from "react-swipeable-views";

import Layout from "../components/layout";
import SEO from "../components/seo";

// components
import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";
import Loading from "../components/loading";
import loading from "../components/loading";

const MainPage = ({ location }) => {
  console.log("MainPage");
  console.log(location.state);
  // STATE --------------------------------------------------------------
  const [mainPageIdx, setMainPageIdx] = React.useState(1);

  // fields -------------------------------------------------------------
  const initialFields =
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [fields, setFields] = React.useState(initialFields);
  // console.log(fields);

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

  // React.useEffect(() => {
  //   setLoading(false);
  // }, []);

  // if there is nothing in local storage go to landing page
  if (fields.length === 0) {
    return <Redirect from="/main" to="/" noThrow />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <SEO title="Main" keywords={[`gatsby`]} />

      <div style={{ height: "100%" }}>
        <SwipeableViews
          index={mainPageIdx}
          onChangeIndex={setMainPageIdx}
          enableMouseEvents
        >
          <Forecast
            setMainPageIdx={setMainPageIdx}
            forecast={field.forecast}
            address={field.address}
          />

          <Field setMainPageIdx={setMainPageIdx} field={field} />
          <Fields
            setMainPageIdx={setMainPageIdx}
            fields={fields}
            setField={setField}
            setFields={setFields}
          />
        </SwipeableViews>
      </div>
    </Layout>
  );
};

export default MainPage;
