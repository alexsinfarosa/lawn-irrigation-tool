import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import { MainContainer } from "../components/styled/sharedComponents"
import Loading from "../components/loading"
import LawnGraph from "../components/lawnGraph"

import AppContext from "../appContext"

const LawnPage = () => {
  const { lawn, loading } = React.useContext(AppContext)

  if (loading) return <Loading />
  return (
    <Layout>
      <SEO title="Lawn Page" />

      <MainContainer>
        {lawn.id !== null && <LawnGraph lawn={lawn} />}
      </MainContainer>

      <Navigation />
    </Layout>
  )
}

export default LawnPage
