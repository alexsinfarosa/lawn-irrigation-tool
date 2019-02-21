import React from "react";
import SwipeableViews from "react-swipeable-views";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";

const MainPage = ({ location }) => {
  console.log("MainPage");
  const [mainPageIdx, setMainPageIdx] = React.useState(1);
  const handleMainPageIdx = i => setMainPageIdx(i);

  console.log(location.state);
  return (
    <Layout>
      <SEO title="Main" keywords={[`gatsby`]} />

      <SwipeableViews
        index={mainPageIdx}
        onChangeIndex={() => setMainPageIdx(mainPageIdx)}
        enableMouseEvents
      >
        <Forecast handleMainPageIdx={handleMainPageIdx} />
        <Field handleMainPageIdx={handleMainPageIdx} />
        <Fields handleMainPageIdx={handleMainPageIdx} />
      </SwipeableViews>
    </Layout>
  );
};

export default MainPage;
