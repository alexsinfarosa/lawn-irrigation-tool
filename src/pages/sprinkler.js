import React from "react";

import { makeStyles } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

import ButtonGLink from "../components/buttonGLink";
import ImageSprinkler from "../components/imgSprinkler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// images
import SpraySprinkler from "../images/spraySprinkler.png";
import SingleStreamRotor from "../images/singleStreamRotorSprinkler.png";
import MultipleStreamRotor from "../images/multipleStreamRotorSprinkler.png";
import MoveableSprinkler from "../images/moveableSprinkler.png";

const images = [
  { title: "Spray Sprinkler", img: SpraySprinkler, flux: 2.4 },
  { title: "Single Stream Rotor", img: SingleStreamRotor, flux: 4.3 },
  { title: "Multiple Stream Rotor", img: MultipleStreamRotor, flux: 6.3 },
  { title: "Moveable Sprinkler", img: MoveableSprinkler, flux: 8.9 }
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
    flexDirection: "column"
    // justifyContent: "center"
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
    width: "100%",
    height: "100%"
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
    paddingBottom: theme.spacing(2),
    background: theme.palette.primary.light,
    color: "#fff"
  },
  padding: {
    padding: theme.spacing(2, 4)
  }
}));

function SprinklerTypePage({ location }) {
  console.log("SprinklerTypePage");
  const classes = useStyles();
  const [sprinkler, setSprinkler] = React.useState("");
  const [flux, setFlux] = React.useState(null);

  // console.log(location.state);
  function handleChange(event) {
    if (event.target.value === sprinkler) {
      setSprinkler("");
    } else {
      setSprinkler(event.target.value);
      const sprinkler = images.find(img => img.title === event.target.value);
      setFlux(sprinkler.flux);
    }
  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/irrigationDate" variant="button" style={{ padding: 8 }}>
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          variant="subtitle1"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Sprinkler Type - <small>step(3/3)</small>
        </Typography>
      </header>

      <main className={classes.main}>
        <div className={classes.padding}>
          <Typography variant="h6" align="center">
            What type of water system do you have?
          </Typography>

          <br />
          <Typography variant="caption" align="justify">
            As different types of sprinkler heads can deliver different volumes
            of water please choose the type of sprinkler heads that you have.
            <br />
            If none is selected, it defaults to the most commonly sold type in
            the region.
          </Typography>
        </div>

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
                          checked={sprinkler === tile.title}
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

      {sprinkler.length !== 0 && (
        <footer className={classes.footer}>
          <ButtonGLink
            to="/main"
            variant="contained"
            fullWidth
            classes={{ root: classes.btnBig }}
          >
            Create Field
          </ButtonGLink>
        </footer>
      )}
    </div>
  );
}

export default SprinklerTypePage;
