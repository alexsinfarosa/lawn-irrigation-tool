import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import ButtonLink from "../components/styled/buttonLink"
import { GridContainer } from "../components/styled/sharedComponents"

const LocationPage = () => {
  return (
    <Layout>
      <SEO title="Location" />

      <GridContainer>
        <Header icon="chevron-left" title="Create Location - (step 1/3)" />

        <Box mb={1}>
          <Typography variant="h4" gutterBottom>
            Location
          </Typography>

          {/* input */}
          <Box>sdflkjsdf</Box>
        </Box>

        <Box mx={-2}>
          <ButtonLink to="/irrigation" variant="contained" color="primary">
            Continue &rarr;
          </ButtonLink>
        </Box>
      </GridContainer>
    </Layout>
  )
}

export default LocationPage
