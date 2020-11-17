import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Exercise from "../Exercises/Exercise";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import useProgressiveImg from "../useProgressiveImg ";

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

const WorkoutItems = ({ item }: { item: any }) => {
  const classes = useStyles();
  /* eslint-disable */
  const [src, { blur }] = useProgressiveImg(
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  );
  /* eslint-enable */
  const { title, id, exerciseitems } = item;
  console.log("item from workoutitem");
  console.log(item);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <h2> {title}</h2>
        <Card
          onClick={handleClickOpen}
          style={{ display: "flex", cursor: "pointer" }}
        >
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.header}
              >
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {id}
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
        </Card>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"exercise items"}
        </DialogTitle>
        <DialogContent>
          <div onClick={handleClose}>Go back</div>
          <DialogContentText>This is the routine description</DialogContentText>
          {exerciseitems.map((item: any) => (
            <Exercise
              key={item.id}
              id={item.id}
              title={item.name}
              image={item.imageUrl}
            />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkoutItems;
