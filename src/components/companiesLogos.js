import React from "react"

import NRCCIcon from "../assets/nrcc-logo-two-line.svg"
import WaterIcon from "../assets/NY-Water.svg"

import Box from "@material-ui/core/Box"

const CompaniesLogos = () => {
  return (
    <Box
      mb={4}
      px={2}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      minHeight="70px"

    >
      <a
        href="http://www.nrcc.cornell.edu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <NRCCIcon style={{ height: 70 }} />
      </a>

      <a
        href="https://amwater.com/nyaw/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WaterIcon style={{ height: 70 }} />
      </a>
    </Box>
  )
}

export default CompaniesLogos
