import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import { MainContainer } from "../components/styled/sharedComponents"

import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const LawnPage = () => {
  return (
    <Layout>
      <SEO title="Lawn Page" />
      <MainContainer>
        <Typography variant="h4">Lawn</Typography>
        <Link to="/">HOME</Link>
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default LawnPage
