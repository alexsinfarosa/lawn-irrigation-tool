import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import ButtonLink from "../components/styled/buttonLink"
import { GridContainer } from "../components/styled/sharedComponents"

const IrrigationPage = () => (
  <Layout>
    <SEO title="Location" />

    <GridContainer>
      <Header icon="chevron-left" title="Irrigation Date - (step 2/3)" />

      <Box mb={1}>
        <Typography variant="h4" gutterBottom>
          Irrigation Date
        </Typography>

        <Typography paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          aliquid vel perspiciatis nesciunt laudantium exercitationem sunt
          tempora amet incidunt distinctio quae, possimus est perferendis atque
          mollitia! Id dolorum excepturi soluta!
        </Typography>
      </Box>

      <Box mx={-2} height="80px">
        <ButtonLink to="/sprinkler" variant="contained" color="primary">
          Continue &rarr;
        </ButtonLink>
      </Box>
    </GridContainer>
  </Layout>
)

export default IrrigationPage
