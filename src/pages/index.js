import React from "react";
import { Router, navigate } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LandingPage from "./landing";
import Main from "./main";

const IndexPage = () => {
  console.log("IndexPage");

  React.useEffect(() => {
    const localStorageRef = window.localStorage.getItem("nrcc-irrigation-tool");
    if (localStorageRef) {
      navigate("/main");
    }
  }, []);

  return (
    <Layout>
      <SEO title="IrriTool" keywords={[`app`]} />
      <Router>
        <LandingPage path="/" />
        <Main path="/main" />
      </Router>
    </Layout>
  );
};

export default IndexPage;
