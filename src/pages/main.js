import React from "react";
import SwipeableViews from "react-swipeable-views";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";

const MainPage = () => {
  console.log("MainPage");
  // const [index, setIndex] = React.useState(1);
  return (
    <Layout>
      <SEO title="Main" keywords={[`gatsby`]} />

      <SwipeableViews index={1} enableMouseEvents>
        <Forecast />
        <Field />
        <Fields />
      </SwipeableViews>
    </Layout>
  );
};

export default MainPage;
