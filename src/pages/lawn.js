import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import { MainContainer } from "../components/styled/sharedComponents"
import Loading from "../components/loading"
import LawnGraph from "../components/lawnGraph"

import Box from "@material-ui/core/Box"

import AppContext from "../appContext"

const LawnPage = () => {
  const { loading } = React.useContext(AppContext)

  if (loading) return <Loading />
  return (
    <Layout>
      <SEO title="Lawn Page" />

      <MainContainer>
        <LawnGraph />
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default LawnPage
