import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import useProgressiveImg from "../useProgressiveImg ";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Workouts() {
  const classes = useStyles();
  /* eslint-disable */
  const [src, { blur }] = useProgressiveImg(
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  );
  /* eslint-enable */
  return (
    <div className="bp">
      <h2>Workouts</h2>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <Link
              to={`/workoutcategories/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="training"
                  height="180"
                  style={{
                    filter: blur ? "blur(20px)" : "none",
                    transition: blur ? "none" : "filter 0.3s ease-out",
                  }}
                  image={process.env.PUBLIC_URL + "/images/img10.jpg"}
                  title="training"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Strength
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <Link
              to={`/workoutcategories/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="HIIT"
                  height="180"
                  style={{
                    filter: blur ? "blur(20px)" : "none",
                    transition: blur ? "none" : "filter 0.3s ease-out",
                  }}
                  image={process.env.PUBLIC_URL + "/images/img1.jpg"}
                  title="HIIT"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    HIIT & Cardio
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <Link
              to={`/workoutcategories/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="training"
                  height="180"
                  style={{
                    filter: blur ? "blur(20px)" : "none",
                    transition: blur ? "none" : "filter 0.3s ease-out",
                  }}
                  image={process.env.PUBLIC_URL + "/images/img3.jpg"}
                  title="training"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Yoga & Stretching
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <Link
              to={`/workoutcategories/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="training"
                  height="180"
                  style={{
                    filter: blur ? "blur(20px)" : "none",
                    transition: blur ? "none" : "filter 0.3s ease-out",
                  }}
                  image={process.env.PUBLIC_URL + "/images/img8.jpg"}
                  title="training"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Special
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <Link
              to={`/workoutcategories/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="training"
                  height="180"
                  style={{
                    filter: blur ? "blur(20px)" : "none",
                    transition: blur ? "none" : "filter 0.3s ease-out",
                  }}
                  image={process.env.PUBLIC_URL + "/images/img11.jpg"}
                  title="training"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Custom Workouts
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
