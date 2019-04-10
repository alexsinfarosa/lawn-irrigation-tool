import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import { MainContainer } from "../components/styled/sharedComponents"

import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const ForecastPage = () => {
  return (
    <Layout>
      <SEO title="Forecast Page" />
      <MainContainer>
        <Typography variant="h4">Forecast</Typography>
        <Link to="/">HOME</Link>
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default ForecastPage
