import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import { MainContainer } from "../components/styled/sharedComponents"
import Loading from "../components/loading"

import { useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

// utils
import { mapIcon } from "../utils/mapIcon"
import format from "date-fns/format"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AppContext from "../appContext"

const ForecastPage = () => {
  const theme = useTheme()
  const { loading, lawn } = React.useContext(AppContext)
  const { daily, currently } = lawn.forecast

  if (loading) return <Loading />
  return (
    <Layout>
      <SEO title="Forecast Page" />
      <MainContainer>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Box display="flex" mb={1}>
            <FontAwesomeIcon
              icon={mapIcon(currently.icon)}
              size="4x"
              style={{ marginRight: 8 }}
            />

            <Typography variant="h3">
              {Math.round(currently.temperature, 2)}˚
            </Typography>
          </Box>

          <Typography variant="subtitle2">{currently.summary}</Typography>
        </Box>

        <Box bgcolor={theme.palette.primary.main} color="#fff" p={1} mb={2}>
          <Typography variant="h6" color="inherit">
            Next 7 Days
          </Typography>
        </Box>

        <Box mb={2} textAlign="center">
          <Typography variant="caption">{daily.summary}</Typography>
        </Box>

        <Box>
          {daily.data.map(day => {
            return (
              <Box
                key={day.time}
                mb={1}
                py={0.5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box flexGrowth={1}>
                  <Typography style={{ fontWeight: "bold" }}>
                    {format(new Date(day.time) * 1000, "EEE").toUpperCase()}
                  </Typography>
                  <Box>
                    <FontAwesomeIcon
                      icon={["fa", "raindrops"]}
                      style={{ marginRight: 4 }}
                      color={"#0197F6"}
                    />
                    <Typography variant="caption">
                      {`${Math.round(day.precipProbability * 100)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Box flexGrowth={1}>
                  <FontAwesomeIcon
                    icon={["fal", mapIcon(day.icon)]}
                    color={theme.palette.text.primary}
                    size="2x"
                  />
                </Box>
                <Box flexGrowth={1}>
                  <Typography>{`${Math.round(
                    day.temperatureLow,
                    1
                  )}˚`}</Typography>
                </Box>
                <Box flexGrowth={1}>
                  <Typography>
                    {`${Math.round(day.temperatureHigh, 1)}˚`}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default ForecastPage
