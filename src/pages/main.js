import React from "react";
import SwipeableViews from "react-swipeable-views";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Forecast from "../components/forecast";
import Field from "../components/field";
import Fields from "../components/fields";

const MainPage = () => {
  console.log("MainPage");
  const [mainPageIdx, setMainPageIdx] = React.useState(1);
  const handleMainPageIdx = i => setMainPageIdx(i);

  return (
    <Layout>
      <SEO title="Main" keywords={[`gatsby`]} />

      <div style={{ height: "100%" }}>
        <SwipeableViews
          index={mainPageIdx}
          onChangeIndex={() => setMainPageIdx(mainPageIdx)}
          enableMouseEvents
        >
          <Forecast handleMainPageIdx={handleMainPageIdx} />
          <Field handleMainPageIdx={handleMainPageIdx} />
          <Fields handleMainPageIdx={handleMainPageIdx} />
        </SwipeableViews>
      </div>
    </Layout>
  );
};

export default MainPage;
