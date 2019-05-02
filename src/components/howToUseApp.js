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

// Context ------------------------------
import AppContext from "../appContext"

export default function HowToUseApp() {
  const theme = useTheme()
  const { version } = React.useContext(AppContext)

  return (
    <Box px={2}>
      <Box mb={3}>
        <Typography variant="h6" align="justify">
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
        <Typography variant="h6" align="justify">
          The recommendation page (<FontAwesomeIcon icon={["fal", "home"]} />){" "}
          provides the main functionalities of the app. It has three sections.
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
          Recommendation Bar
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
        <Typography align="justify" gutterBottom>
          The bar displays a daily recommendation message. It informs the user
          to either irrigate (Orange Bar) or that there is already sufficient
          water in the soil so irrigation should NOT occur (Blue Bar).
        </Typography>
        <Typography align="justify" gutterBottom>
          The recommendation is updated multiple times per day. New forecasts
          are incorporated on a three-hour cycle starting at midnight. Observed
          data are updated once per day, typically between noon and 1 pm. The
          recommendation is most likely to change following this update.
        </Typography>
        <Typography align="justify" gutterBottom>
          If you follow the recommendation, the app does not require you to
          provide any additional information. However if you do not follow the
          recommendation (for example if you forget to bypass your irrigation
          schedule on a day when no watering is recommended), you must inform
          the app by tapping on the water drop next to that day. A blue drop
          means watering occurred and a gray drop means you did not irrigate.
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
          Next, we find the address, that is provided by the user. It is
          required to obtain weather related data.
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
      <Typography variant="subtitle1" gutterBottom>
        The graph serves three purposes.
      </Typography>

      <ol>
        <li>
          The blue and orange bars give a visual indication of water status over
          the previous week and the next two days based on the weather forecast.{" "}
        </li>
        <li>
          A blue water drop indicates days that watering was necessary. A gray
          water drop denotes days that watering was not needed. The drops are
          tappable so a user can override the recommendation (for example
          indicate they watered even though the app recommended not to). The app
          needs this information to make an accurate recommendation. So if your
          sprinkler automatically operates while you are on vacation, it is
          recommended that you update the app by tapping the drops next to the
          days that your system operated. The graph and recommendation is
          recomputed whenever a drop tapped.
        </li>
        <li>
          Weather icons give the user an idea of the weather conditions that the
          app expects to occur during the next two days (see graph below).
        </li>
      </ol>

      {/* Example */}
      <Box mb={3}>
        <Typography
          variant="h6"
          color="secondary"
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          Data Used to Make the Watering Recommendation
        </Typography>
      </Box>
      <Box m="auto" mb={6}>
        <Image src={imgTwo} />
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        The recommendation to water or not water depends on:
      </Typography>

      <ul>
        <li>When and how long you last irrigated</li>
        <li>The amount of rain that occurred</li>
        <li>The amount of water that evaporated</li>
        <li>The forecast for rain and evaporation over the next two days</li>
      </ul>

      <Typography paragraph align="justify">
        Watering is only recommended when the app indicates dry conditions BOTH
        today and the next time time that watering is allowed (either tomorrow
        or the day after tomorrow if your address follows the Nassau County
        Odd/Even Ordinance.) The app factors in the tolerance of your lawn to
        stay healthy even when the graph indicates dry conditions today.
      </Typography>
      <Typography paragraph align="justify">
        In the graph above, although today is dry, the high probability of
        natural rainfall over the next two days drives the “Do Not Water”
        recommendation. For optimal water savings make sure you follow the
        recommendation in the bar!
      </Typography>

      <Box align="center" my={3}>
        <Typography color="secondary">{version}</Typography>
      </Box>
    </Box>
  )
}
