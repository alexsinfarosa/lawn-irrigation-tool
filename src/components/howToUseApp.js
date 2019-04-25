import React from "react"

import { useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Box from "@material-ui/core/Box"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Image from "../components/image"

// screenshots --------------------------
import imgOne from "../images/howTo-1.png"
import imgTwo from "../images/howTo-2.png"

export default function HowToUseApp() {
  const theme = useTheme()
  return (
    <Box px={2}>
      <Box mb={3}>
        <Typography variant="h6">
          For a better experience on mobile devices it is highly recommended to
          follow these instructions
        </Typography>
      </Box>

      <Box mb={5}>
        <Typography
          variant="body2"
          color="secondary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          iOS
        </Typography>
        <ul>
          <li>
            Tap the{" "}
            <img
              src="https://png.icons8.com/ios/18/000000/level-up.png"
              alt="ios level up icon"
            />{" "}
            icon at the bottom of the screen
          </li>
          <li>
            Tap the <code>Add to Home Screen</code> icon
          </li>
          <li>Give it a name (optional)</li>
          <li>
            Tap <code>add</code> at the top right corner of the screen
          </li>
          <li>
            A new icon should have been added to the <code>HOME</code> screen
          </li>
          <li>Tap the newly created icon to launch the app</li>
        </ul>
      </Box>

      <Box mb={5}>
        <Typography
          variant="body2"
          color="secondary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          Android
        </Typography>
        <ul>
          <li>
            Tap the{" "}
            <img
              src="https://png.icons8.com/material/18/000000/menu-2.png"
              alt="android menu icon"
            />
            icon at the top right corner of the screen
          </li>
          <li>
            Tap the <code>Add Home Screen</code> icon
          </li>
          <li>Give it a name (optional)</li>
          <li>
            Tap <code>Add Automatically</code>
          </li>
          <li>
            A new icon should have been added to the <code>HOME</code> screen
          </li>
          <li>Tap the newly created icon to launch the app</li>
        </ul>
      </Box>

      <Divider variant="middle" />

      <Box my={5}>
        <Typography variant="h6">
          The recommendation page (<FontAwesomeIcon icon={["fal", "home"]} />){" "}
          provides the main functionalities of the app. Let's break down from
          top to bottom the various sections.
        </Typography>
      </Box>
      {/* Top Bar */}
      <Box mb={3}>
        <Typography
          variant="h6"
          color="secondary"
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          Top Bar
        </Typography>
      </Box>
      <Box maxWidth="70%" m="auto" mb={3}>
        <Box
          bgcolor={theme.palette.background.deficit}
          color="white"
          p={1}
          textAlign="center"
        >
          <Typography>Water!</Typography>
        </Box>
      </Box>
      <Box mb={5}>
        <Typography align="justify">
          The bar displays today's water recommendation message. It informs the
          user to water (orange) or not (blue) their lawn.
        </Typography>
      </Box>
      {/* Address */}
      <Box mb={3}>
        <Typography
          variant="h6"
          color="secondary"
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          Address
        </Typography>
      </Box>
      <Box maxWidth="90%" m="auto" mb={3}>
        <Typography align="center" color="textSecondary">
          133 N Main St, Freeport, NY, USA
        </Typography>
      </Box>
      <Box mb={5}>
        <Typography paragraph align="justify">
          Next, we find the address. This is the address provided by the user.
          It is required to obtain weather related data.
        </Typography>
      </Box>

      {/* Graph */}
      <Box mb={3}>
        <Typography
          variant="h6"
          color="secondary"
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          Graph
        </Typography>
      </Box>
      <Box m="auto" mb={3}>
        <Image src={imgOne} />
      </Box>
      <Typography paragraph align="justify">
        We arrive then at the graph. In the example above, the blue bar going to
        the right of the graph indicates no water defict, hence on 04/13, the
        user should not water the lawn.
      </Typography>
      <Typography paragraph align="justify">
        The orange bar going to the left of the graph warns the user of a water
        deficit. In this case, on 04/12, the user should follow the app's
        recommendation and water their lawn.
      </Typography>
      <Box mb={5}>
        <Typography paragraph align="justify">
          Users can tap on any of the water droplet icons on the right side of
          the graph. When tapping an icon, which turns into blue, the user tells
          the app that the lawn was watered that day, which triggers the app to
          recalculate the daily deficits. The user can also undo the action by
          tapping the icon again which makes it grey.
        </Typography>
      </Box>
      {/* Example */}
      <Box mb={3}>
        <Typography
          variant="h6"
          color="secondary"
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          Using Forecast Data to Calculate Current Date Deficit
        </Typography>
      </Box>
      <Box m="auto" mb={6}>
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
