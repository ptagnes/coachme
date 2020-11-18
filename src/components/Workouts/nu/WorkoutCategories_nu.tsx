import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import useProgressiveImg from "../../useProgressiveImg ";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "88%",
    },
    content: {
      flex: "1 0 auto",
    },
    header: {
      fontSize: "1.2rem",
    },
    media: {
      width: "120px",
      height: "auto",
      alignSelf: "center",
      marginRight: "0.7rem",
    },
    divider: {
      height: "5px",
      background: "#303030",
    },
  })
);

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
      <h2>Workout Categories</h2>
      <Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Full body</h2>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/utfall.png"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Abs & Core: #1</h2>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/img5.jpg"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/img3.jpg"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/img8.jpg"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Lower Body: #1</h2>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/img9.jpg"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/img9.jpg"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <Link
              className={classes.root}
              to={`/workout/`} //${id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.header}
                  >
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
                className={classes.media}
                style={{
                  filter: blur ? "blur(20px)" : "none",
                  transition: blur ? "none" : "filter 0.3s ease-out",
                }}
                image={process.env.PUBLIC_URL + "/images/img9.jpg"}
                title="training"
              />
            </Link>
          </Card>
        </Grid>
        <Divider className={classes.divider} />
      </Grid>
    </div>
  );
}
