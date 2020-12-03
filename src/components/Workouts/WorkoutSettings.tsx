import React from "react";
import { connect } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import TimerIcon from "@material-ui/icons/Timer";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import WifiTetheringIcon from "@material-ui/icons/WifiTethering";
import OpacityIcon from "@material-ui/icons/Opacity";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { selectCollection } from "../../redux/selectors/workoutSelectors";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
  collection: {};
  workoutItem: any;
  route: string;
  itemKey: string;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      height: "100vh",
    },
    wrapper: {
      padding: "3rem 0",
      boxSizing: "border-box",
    },
    fixedDiv: {
      position: "fixed",
      width: "100%",
      height: "100%",
      background: "black",
      left: "0",
      top: "0",
      zIndex: 0,
      opacity: "0.5",
    },
    textOnTop: {
      position: "relative",
      zIndex: 1,
      padding: "2rem 1rem",
    },
  })
);

function WorkoutSettings(props: Props) {
  const { workoutItem, route, itemKey } = props;

  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);
  let history = useHistory();
  const handleClick = () => {
    history.goBack();
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <div
          style={{
            flexDirection: "column",
            height: "30vh",
            backgroundSize: "cover",
            // backgroundImage: `url(${process.env.PUBLIC_URL}/images/${workoutItem.imageUrl})`,
            backgroundImage: `url(${workoutItem.imageUrl})`,
          }}
        >
          <div className={classes.fixedDiv}></div>
          <div className={classes.textOnTop}>
            <Button
              style={{ marginRight: "10px", paddingLeft: "0", color: "#fff" }}
              color="primary"
              onClick={handleClick}
            >
              <ArrowBackIcon />
            </Button>
            <Typography variant="h6">{workoutItem.title}</Typography>
          </div>
        </div>
      </HideOnScroll>
      <div>
        <List
          subheader={<ListSubheader>Settings</ListSubheader>}
          className={classes.root}
        >
          <ListItem>
            <Link
              style={{
                color: "white",
                border: "1px solid white",
                padding: "1rem",
                textDecoration: "none",
              }}
              to={`/workoutdetails/${route}/${itemKey}`}
            >
              Go to Workout
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TimerIcon style={{ color: "#757575" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Duration"
              secondary="Choose your workout duration"
            />
            <ListItemSecondaryAction>
              <span>60 min</span>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <OpacityIcon style={{ color: "#757575" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-warmup"
              primary="Start with a warmup"
              secondary="Three minutes to prevent injuries"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled
                onChange={handleToggle("Warmup")}
                checked={checked.indexOf("Warmup") !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-warmup" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <FitnessCenterIcon style={{ color: "#757575" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-bluetooth"
              primary="Fitness Tools"
              secondary="Set up your fitness tools"
            />
          </ListItem>
          <Grid
            container
            spacing={3}
            style={{ margin: "-12px -24px -12px -24px" }}
          >
            <Grid item xs={11} style={{ marginLeft: "auto" }}>
              <ListItem>
                <ListItemIcon
                  style={{ transform: "rotate(45deg)", marginTop: "20px" }}
                >
                  <FitnessCenterIcon style={{ color: "#757575" }} />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-dumbbell"
                  primary="Dumbbell"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    disabled
                    onChange={handleToggle("dumbbell")}
                    checked={checked.indexOf("dumbbell") !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-dumbbell",
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WifiTetheringIcon style={{ color: "#757575" }} />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-kettlebell"
                  primary="Kettlebell"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    disabled
                    onChange={handleToggle("kettlebell")}
                    checked={checked.indexOf("kettlebell") !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-kettlebell",
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WifiTetheringIcon style={{ color: "#757575" }} />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-kettlebell"
                  primary="Kettlebell"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    disabled
                    onChange={handleToggle("kettlebell")}
                    checked={checked.indexOf("kettlebell") !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-kettlebell",
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <Link
                  style={{
                    color: "white",
                    border: "1px solid white",
                    padding: "1rem",
                    textDecoration: "none",
                  }}
                  to={`/workoutdetails/${route}/${itemKey}`}
                >
                  Go to Workout
                </Link>
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </div>
    </div>
  );
}

// const mapStateToProps = (state: any, ownProps: any) => ({
//   collection: selectCollection(ownProps.match.params.route)(state),
//   route: ownProps.match.params.route,
//   itemKey: ownProps.match.params.id,
//   items: state.workoutState.collections[ownProps.match.params.route].items,
//   workoutItem: state.workoutState.collections[
//     ownProps.match.params.route
//   ].items.find((x: any) => x.id === parseInt(ownProps.match.params.id)),
// });

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    collection: selectCollection(ownProps.match.params.route)(state),
    route: ownProps.match.params.route,
    itemKey: ownProps.match.params.id,
    items: state.workoutState.collections[ownProps.match.params.route].items,
    workoutItem: state.workoutState.collections[
      ownProps.match.params.route
    ].items.find((x: any) => x.id === ownProps.match.params.id),
  };
};
export default connect(mapStateToProps)(WorkoutSettings);
