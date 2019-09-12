import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"

import { GridContainer } from "../components/styled/sharedComponents"
import { StyledButton } from "../components/styled/sharedComponents"

// iutils
import { DatePicker } from "@material-ui/pickers"

import AppContext from "../appContext"

const IrrigationPage = () => {
  const { lawn, globalDispatch, createHasUserWatered } = React.useContext(
    AppContext
  )
  const [selectedDate, handleDateChange] = React.useState(null)

  return (
    <Layout>
      <SEO title="Irrigation" />

      <GridContainer>
        <Header icon="chevron-left" title="Irrigation Date - (step 2/3)" />

        <Box my={2}>
          <Box mb={4} align="center">
            <Typography variant="h6" gutterBottom>
              Select the date of last irrigation otherwise continue
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

        <StyledButton
          to={lawn.lat ? "/sprinkler/" : "/irrigation/"}
          disabled={lawn.lat ? false : true}
          onClick={() => {
            if (lawn.lat !== null) {
              globalDispatch({
                type: "setDate",
                selectedDate:
                  selectedDate === null
                    ? null
                    : selectedDate.toLocaleDateString(),
              })
              createHasUserWatered(
                selectedDate ? selectedDate.toLocaleDateString() : null
              )
            }
          }}
        >
          Continue
        </StyledButton>
      </GridContainer>
    </Layout>
  )
}

export default IrrigationPage
