import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import useProgressiveImg from "../useProgressiveImg ";
// import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

export default function Workouts() {
  const classes = useStyles();
  const theme = useTheme();
  const [src, { blur }] = useProgressiveImg(
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  );

  return (
    <div className="bp">
      <h2>Workout Categories</h2>
      <Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Full body</h2>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Full Body
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="training"
              height="230"
              style={{
                width: "40vw",
                filter: blur ? "blur(20px)" : "none",
                transition: blur ? "none" : "filter 0.3s ease-out",
              }}
              image={process.env.PUBLIC_URL + "/images/utfall.png"}
              title="training"
            />
            {/* <LazyLoadImage
              alt="training"
              src={process.env.PUBLIC_URL + "/images/utfall.png"}
            //   width={100}
              
            /> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Abs & Core: #1</h2>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Insane Six Pack
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="training"
              height="230"
              style={{
                width: "40vw",
                filter: blur ? "blur(20px)" : "none",
                transition: blur ? "none" : "filter 0.3s ease-out",
              }}
              image={process.env.PUBLIC_URL + "/images/img5.jpg"}
              title="training"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Abs & Core: #2</h2>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Complex Core
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="training"
              height="230"
              style={{
                width: "40vw",
                filter: blur ? "blur(20px)" : "none",
                transition: blur ? "none" : "filter 0.3s ease-out",
              }}
              image={process.env.PUBLIC_URL + "/images/img3.jpg"}
              title="training"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Abs & Core: #3</h2>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Strong Back
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="training"
              height="230"
              style={{
                width: "40vw",
                filter: blur ? "blur(20px)" : "none",
                transition: blur ? "none" : "filter 0.3s ease-out",
              }}
              image={process.env.PUBLIC_URL + "/images/img8.jpg"}
              title="training"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Lower Body: #1</h2>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Complex Lower Body
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="training"
              height="230"
              style={{
                width: "40vw",
                filter: blur ? "blur(20px)" : "none",
                transition: blur ? "none" : "filter 0.3s ease-out",
              }}
              image={process.env.PUBLIC_URL + "/images/img9.jpg"}
              title="training"
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
