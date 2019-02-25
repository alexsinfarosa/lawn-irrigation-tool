import React, { useState } from "react";
import { AppContext } from "../appContext";

import { Router } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LandingPage from "./landing";
import Main from "./main";

const fieldInitialState = {
  address: "",
  streetNumber: null,
  latitude: null,
  longitude: null,
  cropType: "grass",
  forecast: null,
  soilCapacity: "medium"
};

const IndexPage = () => {
  const [field, setField] = useState(fieldInitialState);
  const [fields, setFields] = useState([]);

  // Fetch forecast data ---------------------------------------------
  // const fetchForecastData = (latitude, longitude) => {
  //   const url = `${PROXYDARKSKY}/${latitude},${longitude}?exclude=flags,minutely,alerts,hourly`;
  //   return axios
  //     .get(url)
  //     .then(res => {
  //       // console.log(res.data);
  //       const { currently, daily } = res.data;
  //       return { currently, daily };
  //     })
  //     .catch(err => {
  //       console.log("Failed to load forecast weather data", err);
  //     });
  // };

  return (
    <AppContext.Provider value={{ field, setField, fields, setFields }}>
      <Layout>
        <SEO title="IrriTool" keywords={[`app`]} />
        <Router>
          <LandingPage path="/" />
          <Main path="/main" />
        </Router>
      </Layout>
    </AppContext.Provider>
  );
};

export default IndexPage;
