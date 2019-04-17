import React from "react"
import RingLoader from "react-spinners/RingLoader"

import { useTheme } from "@material-ui/styles"
import Box from "@material-ui/core/Box"

export default function Loading() {
  const theme = useTheme()
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <RingLoader color={theme.palette.primary.main} />
    </Box>
  )
}
