import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Exercise from "./Exercise";

import AccessibilityIcon from "@material-ui/icons/Accessibility";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun"; //cardio
import AirlineSeatLegroomReducedIcon from "@material-ui/icons/AirlineSeatLegroomReduced"; //Lower body
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import RowingIcon from "@material-ui/icons/Rowing";
import AirlineSeatLegroomExtraIcon from "@material-ui/icons/AirlineSeatLegroomExtra";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
      cursor: "pointer",
      background: "#3a3c6d",
    },
    details: {
      alignSelf: "center",
      display: "flex",
    },
    detailsp: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      fontSize: "0.9rem",
      flex: 1,
    },
    avatar: {
      color: "#af00ff",
      backgroundColor: "#75757512",
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExerciseCard = ({
  title,
  filter,
  filterExercise,
  clearFilters,
  data,
}: {
  title: string;
  filter: string;
  filterExercise: (query: string, filter: string) => void;
  clearFilters: () => void;
  data: any;
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    filterExercise(title, filter);
  };
  const handleClose = () => {
    setOpen(false);
    clearFilters();
  };
  const renderSwitch = (param: string) => {
    switch (param) {
      case "Upper body":
        return <EmojiPeopleIcon />;
      case "Lower body":
        return <AirlineSeatLegroomReducedIcon />;
      case "Abs & Core":
        return <AirlineSeatReclineExtraIcon />;
      case "Back":
        return <RowingIcon />;
      case "Glutes":
        return <AirlineSeatLegroomExtraIcon />;
      case "Whole body":
        return <AccessibilityIcon />;
      default:
        return <DirectionsRunIcon />;
    }
  };
  return (
    <>
      <Paper className={classes.paper} onClick={handleClickOpen}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar className={classes.avatar}>{renderSwitch(title)}</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth className={classes.details}>
            <Typography noWrap className={classes.detailsp}>
              <span>{title}</span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ backgroundColor: "#2e2f52" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Exercises in category: {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div className="bp">
          {data &&
            data.map((prop: any, key: number) => (
              <Exercise
                key={key}
                title={prop.title}
                fileUrl={prop.fileUrl}
                id={prop.id}
              />
            ))}
          {data.length === 0 && (
            <h2>There are no exercises yet in this category yet...</h2>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ExerciseCard;
