import React from "react"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { window } from "browser-monads"

import CompaniesLogos from "../components/companiesLogos"
// import RoundedButton from "../components/styled/roundedButton"
import Loading from "../components/loading"
import AppContext from "../appContext"
import { StyledLink } from "../components/styled/sharedComponents"

export default function App() {
  const { loading } = React.useContext(AppContext)

  if (loading) return <Loading />

  return (
    <Container maxWidth="sm">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <CompaniesLogos />

        <Box width={window.innerWidth < 480 ? "42%" : "30%"} mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lawn
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            Irrigation
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            Tool
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography color="error">- ßeta Release -</Typography>
        </Box>

        <Box bgcolor="primary.main" mx={-2} mb={8} p={2} px={4} color="white">
          <Typography align="center">
            You can find out your watering needs for today and the next two days
          </Typography>
        </Box>

        {/* <RoundedButton
          to="/location/"
          variant="outlined"
          color="primary"
          size="large"
        >
          Get Started
        </RoundedButton> */}

        <StyledLink to="/location/">Get Started</StyledLink>
      </Box>
    </Container>
  )
}
