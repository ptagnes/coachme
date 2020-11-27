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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background: "#32335bad",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    content: {
      // flex: "1 0 auto",
      display: "flex",
      flexDirection: "column-reverse",
    },
    cover: {
      // width: 238,
    },
    profileh5: {
      fontSize: "0.7rem",
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
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Today's workout
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Cardio
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Friday, 27-11-2020
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  17:35
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  WO this week
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  3
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  WO this month
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  22
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Steps today
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  2500
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Weight
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  57.2kg
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
