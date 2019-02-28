import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LandingPage from "../components/landing";
import Main from "./main";

const IndexPage = () => {
  console.log("IndexPage");

  return (
    <Layout>
      <SEO title="Lawn Irrigation Tool" keywords={[`app`]} />
      <Router>
        <LandingPage path="/" />
        <Main path="/main" />
      </Router>
    </Layout>
  );
};

export default IndexPage;
