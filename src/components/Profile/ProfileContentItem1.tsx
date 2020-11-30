import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import TimeAndDate from "./TimeAndDate";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
// import KitchenIcon from "@material-ui/icons/Kitchen";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background: "#28294ad9",
      height: "100%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    content: {
      // flex: "1 0 auto",
      display: "flex",
      flexDirection: "column",
    },
    cover: {
      // width: 238,
    },
    profileh5: {
      fontSize: "0.7rem",
    },
    subtitle1: {
      fontSize: "1.1rem",
      lineHeight: "1.2",
      marginBottom: "0.4rem",
    },
  })
);

export default function ProfileContentItem1() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <AccessibilityNewIcon
                    className="iconanimation"
                    style={{ color: "#5b5cc3" }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    Weights & Cardio
                  </Typography>
                </span>
                <span>
                  <Typography
                    className={classes.profileh5}
                    component="h5"
                    variant="h5"
                  >
                    Today's workout
                  </Typography>
                </span>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <TimeAndDate />
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon2.svg"}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    4
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  WO this week
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon.svg"}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    23
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  WO this month
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <DirectionsWalkIcon
                    style={{ color: "#5b5cc3" }}
                    className="iconanimation"
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    2500
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Steps today
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <TrendingDownIcon
                    style={{ color: "#5b5cc3" }}
                    className="iconanimation"
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    57.2kg
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Weight
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
      {/* <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.profileh5} component="h5" variant="h5">
              Today is Friday
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              27-11-2020, 16:31
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={`${process.env.PUBLIC_URL}/images/img5.jpg`}
          title="Second card"
        />
      </Card> */}
    </>
  );
}
