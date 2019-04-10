import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import About from "../components/about"
import HowToUseApp from "../components/howToUseApp"

import { makeStyles } from "@material-ui/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { InfoContainer } from "../components/styled/sharedComponents"

const useStyles = makeStyles(theme => ({
  tabs: {
    height: 80,
    background: theme.palette.background.default,
    marginLeft: -16,
    marginRight: -16,
  },
}))

const InfoPage = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <Layout>
      <SEO title="Info Page" />

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
        className={classes.tabs}
      >
        <Tab
          style={{ paddingRight: 48, paddingLeft: 48 }}
          label="About"
          icon={<FontAwesomeIcon icon={["fal", "info"]} size="lg" />}
        />
        <Tab
          style={{ paddingRight: 48, paddingLeft: 48 }}
          label="How to?"
          icon={<FontAwesomeIcon icon={["fal", "question-circle"]} size="lg" />}
        />
      </Tabs>
      {value === 0 && (
        <InfoContainer>
          <About />
        </InfoContainer>
      )}
      {value === 1 && (
        <InfoContainer>
          <HowToUseApp />
        </InfoContainer>
      )}

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default InfoPage
