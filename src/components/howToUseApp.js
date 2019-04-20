import React from "react"

import { useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Image from "../components/image"

// screenshots --------------------------
import imgOne from "../images/howTo-1.png"
import imgTwo from "../images/howTo-2.png"

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
      <Box maxWidth="90%" m="auto" mb={6}>
        <Box
          bgcolor={theme.palette.background.deficit}
          color="white"
          p={1}
          textAlign="center"
        >
          <Typography>Water!</Typography>
        </Box>

        <Box textAlign="center" my={2}>
          <Typography>Or</Typography>
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
      <Box maxWidth="90%" m="auto" mb={6}>
        <Typography align="center" color="textSecondary">
          133 N Main St, Freeport, NY, USA
        </Typography>
      </Box>
      <Box mb={6} />

      {/* Graph */}
      <Typography variant="h6" color="secondary" gutterBottom>
        Graph
      </Typography>

      <Box maxWidth="90%" m="auto" my={6}>
        <Image src={imgOne} />
      </Box>

      <Typography paragraph align="justify">
        In the example above, the blue bar going to the right of the graph
        indicates no water defict, hence on the date 04/13, the user should not
        water the lawn.
      </Typography>

      <Typography paragraph align="justify">
        The orange bar going to the left of the graph warns the user of a water
        deficit. In this case, on the date 04/12, the user should follow the
        app's recommendation and water the lawn.
      </Typography>

      <Typography paragraph align="justify">
        Users can tap on any of the water droplet icons on the right side of the
        graph. When tapping an icon, the user tells the app that the lawn was
        watered that day, which triggers the app to recalculate the daily
        deficits.
      </Typography>

      <Typography paragraph align="justify">
        The droplet icons can have a grey background if no water was applied, or
        a blue background if water was applied on the lawn on a given day.
      </Typography>

      <Box mb={6} />

      {/* Example */}
      <Typography variant="h6" color="secondary" gutterBottom>
        Using Forecast Data to Calculate Current Date Deficit
      </Typography>
      <Box maxWidth="90%" m="auto" my={6}>
        <Image src={imgTwo} />
      </Box>
      <Typography paragraph align="justify">
        In the above graph, the user is advised not to water on the current date
        (TODAY), despite the graph indicating a water deficit.
      </Typography>
      <Typography paragraph align="justify">
        The reason being that the calculation of the water deficit for the
        current date includes forecast data, rainfall. In fact, from the graph
        we see that there is a high probability of rainfall for the next day.
      </Typography>

      <Typography paragraph align="justify">
        Because of the high probability, the rainfall is accounted into the
        calculation of the current date's deficit. As a result of that the app
        now suggests to the user not to water the lawn, allowing water
        conservation.
      </Typography>

      <Typography paragraph align="justify">
        <b>Note:</b> For users following the{" "}
        <b>Nassau Even/Odd Water Ordinance</b>, the app will use forecast data
        for the day after tomorrow instead to determine the current date deficit
        since they are allowed to water only every other day.
      </Typography>
      <Box mb={6} />
    </Box>
  )
}
