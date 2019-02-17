import React from "react";

import Typography from "@material-ui/core/Typography";
import ButtonGLink from "../components/ButtonGLink";

import Layout from "../components/layout";
import SEO from "../components/seo";

const LandingPage = () => {
  console.log("LandingPage");
  return (
    <Layout>
      <SEO title="Landing Page" keywords={[`landing`]} />

      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Welcome!
      </Typography>

      <Typography variant="body2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore quia
        aperiam iure corporis mollitia ab quae eos possimus asperiores ullam
        cumque doloribus assumenda labore reiciendis exercitationem animi nisi,
        delectus et?
      </Typography>

      <br />
      <ButtonGLink to="/location" variant="outlined" color="primary">
        Let's begin!
      </ButtonGLink>
    </Layout>
  );
};

export default LandingPage;
