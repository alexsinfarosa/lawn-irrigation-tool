import React from "react"

import { useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Image from "../components/image"

// screenshots --------------------------
import imgOne from "../images/howTo-1.png"

export default function HowToUseApp() {
  const theme = useTheme()
  return (
    <Box px={2}>
      {/* Top Bar */}
      <Typography variant="h6" color="secondary" gutterBottom>
        Top Bar
      </Typography>
      <Typography align="justify">
        The top bar displays today's water recommendation message.
      </Typography>
      <Box mb={2} />
      <Box maxWidth="70%" m="auto" mb={6}>
        <Box
          bgcolor={theme.palette.background.deficit}
          color="white"
          p={1}
          textAlign="center"
        >
          <Typography>Water!</Typography>
        </Box>

        <Box textAlign="center" my={2}>
          <Typography textAlign="center">Or</Typography>
        </Box>

        <Box
          bgcolor={theme.palette.background.noDeficit}
          color="white"
          p={1}
          textAlign="center"
        >
          <Typography>Do Not Water!</Typography>
        </Box>
      </Box>

      {/* Address */}
      <Typography variant="h6" color="secondary" gutterBottom>
        Address
      </Typography>
      <Typography paragraph align="justify">
        This is the address provided by the user. It is required to obtain
        weather related data.
      </Typography>
      <Box maxWidth="70%" m="auto" mb={6}>
        <Typography align="center" color="textSecondary">
          133 N Main St, Freeport, NY, USA
        </Typography>
      </Box>
      <Box mb={6} />

      {/* Graph */}
      <Typography variant="h6" color="secondary" gutterBottom>
        Graph
      </Typography>

      <Typography paragraph align="justify">
        In the example below, the blue bar going to the right of the graph
        indicates no water defict, hence the user on 04/13 should not water the
        lawn.
      </Typography>

      <Typography paragraph align="justify">
        The orange bar going to the left of the graph warns the user of a water
        deficit. In this case, the user on 04/12 should follow the app's
        recommendation and water the lawn.
      </Typography>

      <Typography paragraph align="justify">
        The user can tap on any of the water droplet icons on the right side of
        the graph. When tapping an icon, the user tells the app that the lawn
        was watered that day, which triggers the app to recalculate the daily
        deficits.
      </Typography>

      <Typography paragraph align="justify">
        The droplet icons can have a grey background if not water was applied,
        or a blue background if water was applied on the lawn on a give day.
      </Typography>

      <Box maxWidth="70%" m="auto" my={6}>
        <Image src={imgOne} />
      </Box>
    </Box>
  )
}
