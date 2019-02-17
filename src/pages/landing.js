import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const LandingPage = () => {
  console.log("LandingPage");
  return (
    <Layout>
      <SEO title="Landing Page" keywords={[`landing`]} />

      <h1>Landing Page</h1>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore quia
        aperiam iure corporis mollitia ab quae eos possimus asperiores ullam
        cumque doloribus assumenda labore reiciendis exercitationem animi nisi,
        delectus et?
      </p>

      <Link to="/location">START</Link>
    </Layout>
  );
};

export default LandingPage;
