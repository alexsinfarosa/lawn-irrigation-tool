import React from "react"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import CompaniesLogos from "../components/companiesLogos"
// import RoundedButton from "../components/styled/roundedButton"
import Loading from "../components/loading"
import AppContext from "../appContext"
import { StyledLink } from "../components/styled/sharedComponents"

export default function App() {
  const { loading, version } = React.useContext(AppContext)

  if (loading) return <Loading />

  return (
    <Container maxWidth="sm" style={{ padding: 0 }}>
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <CompaniesLogos />

        <Box display="flex" justifyContent="center" my={4}>
          <Box>
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
        </Box>

        <Box mb={4} align="center">
          <Typography color="error">- ßeta Release -</Typography>
          <Typography variant="caption">{version}</Typography>
        </Box>

        <Box bgcolor="primary.main" mb={8} p={2} px={4} color="white">
          <Typography align="center">
            Recommendations for efficient lawn irrigation using weather data
          </Typography>
        </Box>

        <StyledLink to="/location/">Get Started</StyledLink>
      </Box>
    </Container>
  )
}
