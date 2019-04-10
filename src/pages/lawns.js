import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"

import { MainContainer } from "../components/styled/sharedComponents"
import CompaniesLogos from "../components/companiesLogos"

import Box from "@material-ui/core/Box"

const LawnsPage = () => {
  return (
    <Layout>
      <SEO title="Lawns Page" />
      <MainContainer>
        <CompaniesLogos />
        <Link to="/">HOME</Link>
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default LawnsPage
