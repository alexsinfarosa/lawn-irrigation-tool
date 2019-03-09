/* eslint-disable react/prop-types */

import React from "react";
import { install } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./.cache/theme";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faChevronLeft,
  faHome,
  faGripHorizontal,
  faPlus,
  faWater,
  faTrash,
  faTint,
  faUmbrella,
  faRaindrops,
  faMoon,
  faFog,
  faWind,
  faCloudSun,
  faCloudMoon,
  faSnowflakes,
  faCloudSleet,
  faClouds,
  faSun,
  faCloudRain
} from "@fortawesome/pro-solid-svg-icons";

import {
  faMoon as fasMoon,
  faFog as fasFog,
  faWind as fasWind,
  faCloudSun as fasCloudSun,
  faCloudMoon as fasCloudMoon,
  faSnowflakes as fasSnowflakes,
  faCloudSleet as fasCloudSleet,
  faClouds as fasClouds,
  faSun as fasSun,
  faCloudRain as falCloudRain,
  faTint as fasTint
} from "@fortawesome/pro-light-svg-icons";
// all fontawesome icons of the project
library.add(
  faChevronLeft,
  faHome,
  faGripHorizontal,
  faPlus,
  faWater,
  faTrash,
  faTint,
  faUmbrella,
  faRaindrops,
  faMoon,
  faFog,
  faWind,
  faCloudSun,
  faCloudMoon,
  faSnowflakes,
  faCloudSleet,
  faClouds,
  faSun,
  fasMoon,
  fasFog,
  fasWind,
  fasCloudSun,
  fasCloudMoon,
  fasSnowflakes,
  fasCloudSleet,
  fasClouds,
  fasSun,
  faCloudRain,
  falCloudRain,
  fasTint
);

install();

export const onInitialClientRender = () => {
  if (process.env.BUILD_STAGE === `develop`) {
    return;
  }

  // Remove the server-side injected CSS.
  const jssStyles = document.querySelector("#jss-server-side");
  jssStyles.parentNode.removeChild(jssStyles);
};

export const wrapRootElement = ({ element }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};
