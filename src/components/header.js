import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = ({ icon, title, right }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
      mb={1}
    >
      <Box component="span">
        <FontAwesomeIcon
          icon={icon}
          size="lg"
          onClick={() => window.history.back()}
        />
      </Box>
      <Box component="span">
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box component="span">{right}</Box>
    </Box>
  )
}

export default Header
