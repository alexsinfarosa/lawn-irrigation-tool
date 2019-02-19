import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";
import SEO from "../components/seo";

import ButtonGLink from "../components/ButtonGLink";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw"
    // padding: theme.spacing(2)
  },
  titleText: {
    color: theme.palette.text.secondary,
    fontWeight: "700",
    marginBottom: theme.spacing(6)
  },
  smallTextTop: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    background: theme.palette.primary.light,
    marginBottom: theme.spacing(8),
    color: "white"
  },
  smallTextBottom: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    // background: theme.palette.primary.light,
    marginBottom: theme.spacing(8)
    // color: "white"
  },
  btnBig: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

const LandingPage = () => {
  console.log("LandingPage");
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Landing Page" keywords={[`landing`]} />

      <div className={classes.root}>
        <div className={classes.titleText}>
          <Typography
            color="inherit"
            component="h1"
            variant="h4"
            align="left"
            gutterBottom
          >
            Lawn
          </Typography>
          <Typography
            color="inherit"
            component="h1"
            variant="h4"
            align="left"
            gutterBottom
          >
            Irrigation
          </Typography>

          <Typography
            color="inherit"
            component="h1"
            variant="h4"
            align="left"
            gutterBottom
          >
            Calculator
          </Typography>
        </div>

        <Typography
          color="inherit"
          variant="caption"
          align="center"
          className={classes.smallTextTop}
        >
          You can find out your watering needs for today and the next two days
        </Typography>

        <Typography
          // color="inherit"
          variant="caption"
          align="justify"
          className={classes.smallTextBottom}
        >
          To ensure a healthy lawn, use less water and save money please follow
          the simple but scientific guidance
        </Typography>

        <ButtonGLink
          to="/location"
          variant="outlined"
          color="primary"
          size="large"
          classes={{ root: classes.btnBig }}
        >
          Get Started
        </ButtonGLink>
      </div>
    </Layout>
  );
};

export default LandingPage;
