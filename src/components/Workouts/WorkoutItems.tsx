import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useProgressiveImg from "../useProgressiveImg ";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
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
      background: "#292b4f",
    },
    subtitle: {
      color: "#7677a3",
    },
    h2header: {
      textTransform: "uppercase",
      color: "#4f5391",
      marginBottom: "0.5rem",
      fontSize: "1rem",
      fontWeight: 100,
    },
  })
);

const WorkoutItems = ({ item, route }: { item: any; route: string }) => {
  const classes = useStyles();
  /* eslint-disable */
  // const [src, { blur }] = useProgressiveImg(
  //   "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
  //   "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  // );
  /* eslint-enable */
  const { title, id, imageUrl, category } = item;
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <h2 className={classes.h2header}> {category} </h2>
        <Link
          to={`/workoutsettings/${route}/${id}`}
          style={{ textDecoration: "none" }}
        >
          <Card style={{ display: "flex", cursor: "pointer" }}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  component="h5"
                  variant="h5"
                  className={classes.header}
                >
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.subtitle}
                >
                  {category}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="training"
              className={classes.media}
              // style={{
              //   filter: blur ? "blur(20px)" : "none",
              //   transition: blur ? "none" : "filter 0.3s ease-out",
              // }}
              image={`${process.env.PUBLIC_URL}/images/${imageUrl}`}
              title="training"
            />
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default WorkoutItems;
