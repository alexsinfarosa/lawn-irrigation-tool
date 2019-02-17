import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LandingPage from "./landing";
import Main from "./main";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Landing" keywords={[`gatsby`]} />
      <Router>
        <LandingPage path="/" />
        <Main path="/main" />
      </Router>
    </Layout>
  );
};

export default IndexPage;
