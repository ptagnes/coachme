import React from "react";
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

import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
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
    },
  })
);

export default function Workout(props: Props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);

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
            padding: "2rem",
            backgroundImage: "url(https://ptagnes.web.app/images/img10.jpg)",
          }}
        >
          <Typography variant="h6">Insane Six Pack</Typography>
          <Typography variant="body1">
            Ab workout that will get you a shredded six pack in no time
          </Typography>
        </div>
      </HideOnScroll>
      <div>
        <List
          subheader={<ListSubheader>Settings</ListSubheader>}
          className={classes.root}
        >
          <ListItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Duration"
              secondary="Choose your workout duration"
            />
            <ListItemSecondaryAction>
              <span>60 min</span>
              {/* <Switch
                edge="end"
                onChange={handleToggle("wifi")}
                checked={checked.indexOf("wifi") !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
              /> */}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <OpacityIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-warmup"
              primary="Start with a warmup"
              secondary="Three minutes to prevent injuries"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("Warmup")}
                checked={checked.indexOf("Warmup") !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-warmup" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-bluetooth"
              primary="Fitness Tools"
              secondary="Set up your fitness tools"
            />
          </ListItem>
          <Grid container spacing={3}>
            <Grid item xs={11} style={{ marginLeft: "auto" }}>
              <ListItem>
                <ListItemIcon
                  style={{ transform: "rotate(45deg)", marginTop: "20px" }}
                >
                  <FitnessCenterIcon />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-dumbbell"
                  primary="Dumbbell"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
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
                  <WifiTetheringIcon />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-kettlebell"
                  primary="Kettlebell"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
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
                  <WifiTetheringIcon />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-kettlebell"
                  primary="Kettlebell"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle("kettlebell")}
                    checked={checked.indexOf("kettlebell") !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-kettlebell",
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </div>
    </div>
  );
}