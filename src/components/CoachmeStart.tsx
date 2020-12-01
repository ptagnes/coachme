import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  fixedBg: {
    backgroundImage:
      "url(https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agnespt.jpg?alt=media&token=bbaf9c93-9631-4dcf-96ae-bdcd579ac3c4)",
    backgroundSize: "cover",
    opacity: "0.1",
    position: "fixed",
    height: "100vh",
    width: "100vw",
    left: "0",
    top: "0",
  },
  paper: {
    padding: "16px",
    backgroundColor: "#3f4376",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
    <div className="bp">
      <div className={classes.fixedBg}></div>
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              9:30 am
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <FastfoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography
                variant="h6"
                component="h1"
                style={{
                  fontFamily: "Lobster",
                }}
              >
                Eat
              </Typography>
              <Typography style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                Because you need strength
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              10:00 am
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography
                variant="h6"
                component="h1"
                style={{
                  fontFamily: "Lobster",
                }}
              >
                Code
              </Typography>
              <Typography style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                Because it&apos;s awesome!
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <HotelIcon />
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography
                variant="h6"
                component="h1"
                style={{
                  fontFamily: "Lobster",
                }}
              >
                Sleep
              </Typography>
              <Typography style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                Because you need rest
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography
                variant="h6"
                component="h1"
                style={{
                  fontFamily: "Lobster",
                }}
              >
                Repeat
              </Typography>
              <Typography style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                Because this is the life you love!
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
