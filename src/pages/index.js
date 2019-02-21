import React, { useState } from "react";
import { AppContext } from "../appContext";

import { Router } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LandingPage from "./landing";
import Main from "./main";

const IndexPage = () => {
  const [field, setField] = useState({
    address: "",
    streetNumber: null,
    latitude: null,
    longitude: null,
    cropType: "grass",
    forecast: null,
    soilCapacity: "medium"
  });
  const [fields, setFields] = useState([]);

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
