import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import ExerciseCard from "./ExerciseCard";

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
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
      cursor: "pointer",
      width: "100%",
      // backgroundColor: "#af00ff",
      background:
        "linear-gradient(90deg, rgba(128,0,255,1) 0%, rgba(175,0,255,1) 35%, rgba(145,0,255,1) 100%)",
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
  const [opencat, setOpenCat] = React.useState(false);
  const handleClickOpenCat = () => {
    setOpenCat(true);
    filterExercise(title, filter);
  };
  const handleCloseCat = () => {
    setOpenCat(false);
    clearFilters();
  };
  return (
    <>
      <Paper className={classes.paper} onClick={handleClickOpenCat}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>
              <AccessibilityIcon />
            </Avatar>
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
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseCat}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Select musclegroup with {title}
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
              filterExercise={filterExercise}
              clearFilters={clearFilters}
              data={data}
            />
          ))}
          <List>
            <ListItem button>
              <ListItemText
                primary="Default notification"
                secondary="Lorem ipsum"
              />
            </ListItem>
          </List>
        </div>
      </Dialog>
    </>
  );
};

export default ExerciseCardTopCategories;
