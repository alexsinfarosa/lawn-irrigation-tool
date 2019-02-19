import React from "react";

import { makeStyles } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

import ButtonGLink from "../components/ButtonGLink";
import ImageSprinkler from "../components/imgSprinkler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// images
import SpraySprinkler from "../images/spraySprinkler.png";
import SingleStreamRotor from "../images/singleStreamRotorSprinkler.png";
import MultipleStreamRotor from "../images/multipleStreamRotorSprinkler.png";
import MoveableSprinkler from "../images/moveableSprinkler.png";

const images = [
  { title: "Spray Sprinkler", img: SpraySprinkler },
  { title: "Single Stream Rotor", img: SingleStreamRotor },
  { title: "Multiple Stream Rotor", img: MultipleStreamRotor },
  { title: "Moveable Sprinkler", img: MoveableSprinkler }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr auto"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  containerList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: theme.spacing(0)
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%"
  },
  title: {
    color: "#fff",
    fontSize: "0.9rem"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  footer: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(7)
  },
  btnBig: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  leftRightPadding: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

function SprinklerTypePage() {
  console.log("SprinklerTypePage");
  const classes = useStyles();
  const [selectedImg, setSelectedImg] = React.useState("");

  function handleChange(event) {
    if (event.target.value === selectedImg) {
      setSelectedImg("");
    } else {
      setSelectedImg(event.target.value);
    }
  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/irrigationDate" variant="button" style={{ padding: 8 }}>
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          component="h1"
          variant="subtitle1"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Sprinkler Type step(3/3)
        </Typography>
      </header>

      <main className={classes.main}>
        <div className={classes.leftRightPadding}>
          <Typography
            component="h1"
            variant="subtitle2"
            align="justify"
            gutterBottom
          >
            As different types of sprinkler heads can deliver different volumes
            of water please choose the type of sprinkler heads that you have.
            <br />
            If none is selected, it defaults to the most commonly sold type in
            the region.
          </Typography>

          <br />

          {selectedImg === "" ? (
            <Typography
              variant="subtitle1"
              align="center"
              style={{ color: "#fff" }}
            >
              ""
            </Typography>
          ) : (
            <Typography variant="subtitle1" align="center">
              {selectedImg}
            </Typography>
          )}
        </div>

        <br />

        <div className={classes.containerList}>
          <GridList className={classes.gridList} cols={1.5}>
            {images.map(tile => {
              return (
                <GridListTile key={tile.img}>
                  <ImageSprinkler src={tile.img} />
                  {/* <img src={tile.img} alt={tile.title} /> */}
                  <GridListTileBar
                    title={tile.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton>
                        <Checkbox
                          checked={selectedImg === tile.title}
                          onChange={handleChange}
                          value={tile.title}
                          style={{ color: "#fff" }}
                        />
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      </main>

      <footer className={classes.footer}>
        <ButtonGLink
          to="/main"
          variant="contained"
          color="primary"
          fullWidth
          classes={{ root: classes.btnBig }}
        >
          Create Field
        </ButtonGLink>
      </footer>
    </div>
  );
}

export default SprinklerTypePage;
