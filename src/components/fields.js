import React from "react";
import { navigate } from "@reach/router";

import { makeStyles, useTheme } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../components/Link";

// utils ------------
import format from "date-fns/format";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "80px auto",
    height: "100vh"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    justifyItems: "center",
    padding: theme.spacing(0, 4),
    background: theme.palette.background.default
  },
  main: {
    overflow: "auto",
    height: "calc(100vh - 80px)"
  },
  paper: {
    margin: theme.spacing(2, 4),
    marginBottom: theme.spacing(3)
  }
}));

const Fields = ({ setMainPageIdx, fields, setField, setFields }) => {
  console.log("Fields");
  const classes = useStyles();
  const theme = useTheme();

  const [isDialog, setIsDialog] = React.useState(false);
  const [fieldId, setFieldId] = React.useState(0);

  const deleteField = () => {
    const fields = JSON.parse(
      window.localStorage.getItem("lawn-irrigation-tool")
    );
    const newFields = fields.filter(field => field.id !== fieldId);
    if (newFields.length === 0) {
      window.localStorage.removeItem("lawn-irrigation-tool");
      navigate("/");
    } else {
      setFields(newFields);
      setField(newFields[0]);
      window.localStorage.setItem(
        "lawn-irrigation-tool",
        JSON.stringify(newFields)
      );
    }
  };

  // React.useEffect(() => {
  //   console.log("fields rerendered");
  // }, [fields]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <FontAwesomeIcon
          icon="home"
          size="lg"
          onClick={() => setMainPageIdx(1)}
        />
        <FontAwesomeIcon
          icon="grip-horizontal"
          size="2x"
          color={theme.palette.secondary.main}
        />
        <Link to="/location" variant="button" color="inherit">
          <FontAwesomeIcon icon="plus" size="lg" />
        </Link>
      </header>

      <main className={classes.main}>
        {fields.map(field => {
          const isBarDeficit = field.dayOfIrrigation.barDeficit < 0;
          return (
            <Paper key={field.id} className={classes.paper} elevation={1}>
              <List component="nav" style={{ paddingTop: 22 }}>
                <ListItem
                  onClick={() => {
                    setField(field);
                    setMainPageIdx(1);
                  }}
                >
                  {isBarDeficit ? (
                    <FontAwesomeIcon icon="tint" color={"#F79824"} size="2x" />
                  ) : (
                    <FontAwesomeIcon icon="tint" color={"#0197F6"} size="2x" />
                  )}

                  <ListItemText
                    primary={field.address}
                    secondary={format(
                      new Date(field.irrigationDate),
                      "MMMM dd, yyyy"
                    )}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        setFieldId(field.id);
                        setIsDialog(true);
                      }}
                    >
                      <FontAwesomeIcon icon="trash" size="xs" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          );
        })}
      </main>

      {/* DIALOG -----------------------------*/}
      <Dialog
        open={isDialog}
        onClose={() => setIsDialog(false)}
        aria-labelledby="alert-dialog-delete-lawn"
        aria-describedby="alert-dialog-delete-selected-lawn"
        // hideBackdrop={true}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="body2">
            Are you sure you want to delete it?
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setIsDialog(false)} color="secondary">
            Undo
          </Button>
          <Button
            onClick={() => {
              deleteField();
              setIsDialog(false);
            }}
            color="secondary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(Fields);
