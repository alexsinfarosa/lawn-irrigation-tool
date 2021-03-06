import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"
import { MainContainer } from "../components/styled/sharedComponents"
import Loading from "../components/loading"

import { makeStyles, useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

// utils
import { mapIcon } from "../utils/mapIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AppContext from "../appContext"

import format from "date-fns/format"
import subDays from "date-fns/subDays"
import addDays from "date-fns/addDays"

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 230px)",
  },
}))

const ForecastPage = () => {
  const theme = useTheme()
  const classes = useStyles()

  const { loading, lawn } = React.useContext(AppContext)
  const { daily, currently } = lawn.forecast

  if (loading) return <Loading />

  return (
    <Layout>
      <SEO title="Forecast Page" />
      {Object.keys(lawn.forecast).length !== 0 ? (
        <MainContainer>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={2}
            height="100px"
          >
            <Typography variant="caption" color="textSecondary" gutterBottom>
              {lawn.address}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={1}
            >
              <Box mr={1}>
                <FontAwesomeIcon
                  icon={mapIcon(currently.icon)}
                  size="4x"
                  style={{ marginRight: 8 }}
                />
              </Box>

              <Box textAlign="left">
                <Typography variant="h3">
                  {Math.round(currently.temperature, 2)}˚
                </Typography>
                <Typography variant="subtitle2">{currently.summary}</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            mb={3}
            style={{
              borderLeft: `4px solid ${theme.palette.secondary.main}`,
            }}
            mx={2}
            height="80px"
          >
            <Box pl={1}>
              <Typography variant="h6" color="secondary">
                Next 7 Days
              </Typography>
            </Box>

            <Box pl={1}>
              <Typography variant="caption">{daily.summary}</Typography>
            </Box>
          </Box>

          <Box px={2} className={classes.main}>
            {daily.data.map(day => {
              const date = new Date(day.time * 1000).toLocaleDateString()
              const today = new Date()
              const tomorrow = addDays(today, 1)
              const yesterday = subDays(today, 1)
              const formatted = date => format(date, "M/d/yyyy")

              let dd = format(new Date(date), "MMM do")
              if (date === formatted(tomorrow)) dd = "Tomorrow"
              if (date === formatted(today)) dd = "Today"
              if (date === formatted(yesterday)) dd = "Yesterday"

              return (
                <Box
                  flexGrow={1}
                  key={day.time}
                  mb={1}
                  py={"0.5rem"}
                  display="flex"
                  alignItems="center"
                >
                  <Box flexGrow={1} textAlign="left" width={20}>
                    <Typography>
                      {/* {format(new Date(day.time) * 1000, "MMM do")} */}
                      {dd}
                    </Typography>
                    <Box>
                      <FontAwesomeIcon
                        icon={["fa", "raindrops"]}
                        style={{ marginRight: 4 }}
                        color={theme.palette.background.noDeficit}
                      />
                      <Typography variant="caption">
                        {`${Math.round(day.precipProbability * 100)}%`}
                      </Typography>
                    </Box>
                  </Box>

                  {/* ICON */}
                  <Box flexGrow={1} textAlign="center">
                    <FontAwesomeIcon
                      icon={["fal", mapIcon(day.icon)]}
                      color={theme.palette.text.primary}
                      size="2x"
                    />
                  </Box>

                  {/* MIN TEMP */}
                  <Box flexGrow={1} textAlign="center">
                    <Typography>{`${Math.round(
                      day.temperatureLow,
                      1
                    )}˚`}</Typography>
                  </Box>

                  {/* MAX TEMP */}
                  <Box flexGrow={1} textAlign="right">
                    <Typography>
                      {`${Math.round(day.temperatureHigh, 1)}˚`}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </MainContainer>
      ) : (
        <MainContainer>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Box maxWidth="350px" align="center">
              <Typography variant="subtitle1">
                Tap the <code>Lawns</code> icon below to go to the lawns page
                and setup a new lawn
              </Typography>
            </Box>
          </Box>
        </MainContainer>
      )}

      <Navigation />
    </Layout>
  )
}

export default ForecastPage
