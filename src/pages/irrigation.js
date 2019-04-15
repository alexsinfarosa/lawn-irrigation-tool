import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import ButtonLink from "../components/styled/buttonLink"
import { GridContainer } from "../components/styled/sharedComponents"

// iutils
import { DatePicker } from "material-ui-pickers"
import { fetchPETData } from "../utils/api"

import AppContext from "../appContext"

const IrrigationPage = () => {
  const { lawn, setLoading, globalDispatch } = React.useContext(AppContext)
  const [selectedDate, handleDateChange] = React.useState(null)

  return (
    <Layout>
      <SEO title="Location" />

      <GridContainer>
        <Header icon="chevron-left" title="Irrigation Date - (step 2/3)" />

        <Box my={2}>
          <Box mb={4} align="center">
            <Typography variant="h6" gutterBottom>
              Select the date of last irrigation, otherwise continue.
            </Typography>
          </Box>

          <Box align="center">
            <DatePicker
              autoOk
              allowKeyboardControl
              disableFuture
              clearable
              format="MM/dd/yyyy"
              label="Irrigation Date"
              showTodayButton
              minDate={`03/01/${new Date().getFullYear()}`}
              value={selectedDate}
              onChange={handleDateChange}
              animateYearScrolling
              style={{ width: 300 }}
            />
          </Box>
        </Box>

        <Box mx={-2} height="80px">
          <ButtonLink
            to="/sprinkler"
            variant="contained"
            color="primary"
            disabled={lawn.lat ? false : true}
            onClick={async () => {
              setLoading(true)

              const petData = await fetchPETData(lawn.lat, lawn.lng)
              globalDispatch({ type: "setPETData", petData })

              globalDispatch({
                type: "setDate",
                selectedDate:
                  selectedDate === null
                    ? null
                    : selectedDate.toLocaleDateString(),
              })
              setLoading(false)
            }}
          >
            Continue &rarr;
          </ButtonLink>
        </Box>
      </GridContainer>
    </Layout>
  )
}

export default IrrigationPage
