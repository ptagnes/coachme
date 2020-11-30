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
import ExerciseCard from "./ExerciseCard";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"; //dumbbell
import SwapCallsIcon from "@material-ui/icons/SwapCalls"; //rope
import SpaceBarIcon from "@material-ui/icons/SpaceBar"; //bar
import RoomServiceIcon from "@material-ui/icons/RoomService"; //bosu ball
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption"; //kettlebell

const Musclegroups = [
  "Upper body",
  "Lower body",
  "Abs & Core",
  "Back",
  "Glutes",
  "Wholebody",
  "Cardio",
];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    avatar: {
      color: "#af00ff",
      backgroundColor: "#75757512",
    },
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
      cursor: "pointer",
      width: "100%",
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
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExerciseCardTopCategories = ({
  title,
  filter,
  filterExercise,
  filterFilteredExercise,
  clearFilters,
  clearFilteredFilters,
  filteredData,
}: {
  title: string;
  filter: string;
  filterExercise: (query: string, filter: string) => void;
  filterFilteredExercise: (query: string, filter: string) => void;
  clearFilters: () => void;
  clearFilteredFilters: () => void;
  filteredData: any;
}) => {
  const classes = useStyles();
  const [opencat, setOpenCat] = React.useState(false);
  const handleClickOpenCat = () => {
    setOpenCat(true);
    filterExercise(title, filter);
  };
  const handleCloseCat = () => {
    setOpenCat(false);
    clearFilters();
  };
  const renderSwitch = (param: string) => {
    switch (param) {
      case "Medicine Ball":
        return <SportsBaseballIcon />;
      case "Barbell":
        return <SpaceBarIcon />;
      case "Dumbbell":
        return <FitnessCenterIcon />;
      case "Resistance Band":
        return <SwapCallsIcon />;
      case "Bosu":
        return <RoomServiceIcon />;
      case "Kettlebell":
        return <EnhancedEncryptionIcon />;
      default:
        return <SportsBaseballIcon />;
    }
  };
  return (
    <>
      <Paper className={classes.paper} onClick={handleClickOpenCat}>
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
        open={opencat}
        onClose={handleCloseCat}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ backgroundColor: "#2e2f52" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseCat}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Select muscles worked with {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseCat}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div className="bp">
          {Musclegroups.map((prop: any, key: number) => (
            <ExerciseCard
              key={key}
              title={prop}
              filter="musclegroup"
              filterExercise={filterFilteredExercise}
              clearFilters={clearFilteredFilters}
              data={filteredData}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default ExerciseCardTopCategories;
