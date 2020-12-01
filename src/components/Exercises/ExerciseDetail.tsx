import React from "react";
import { useHistory } from "react-router";
import ExercisesContext from "../../context/exercises-context";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ExerciseDetail = (props: any) => {
  const classes = useStyles();
  const id = props.match.params.id;
  const [exercise, setExercise] = React.useState<{} | undefined>();
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [musclegroup, setMusclegroup] = React.useState<string>();
  const [level, setLevel] = React.useState<string>();
  const [equipment, setEquipment] = React.useState<string>();
  const [mechanics, setMechanics] = React.useState<string>();
  const [fileUrl, setFileUrl] = React.useState<string>();
  const [videourl, setVideoUrl] = React.useState<string>();
  const context = React.useContext(ExercisesContext);

  let history = useHistory();

  React.useEffect(() => {
    if (context.exercises) {
      const allExerc = context.exercises;
      const exer = allExerc.find((exercise: any) => exercise.id === id);
      setExercise(exer);
      setTitle(exer.title);
      setDescription(exer.description);
      setMusclegroup(exer.musclegroup);
      setLevel(exer.level);
      setEquipment(exer.equipment);
      setMechanics(exer.mechanics);
      setFileUrl(exer.fileUrl);
      setVideoUrl(exer.videourl);
    }
  }, [context, id]);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="bp">
      <div className="page-header">
        <div className="content-container">
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Button
              style={{ marginRight: "10px", paddingLeft: "0" }}
              color="primary"
              onClick={handleClick}
            >
              <ArrowBackIcon />
            </Button>
            <h1 className="page-header__title">Exercise details</h1>
          </div>
        </div>
      </div>
      <div className="content-container video-container">
        {exercise ? (
          <div>
            {title && <p>{title}</p>}
            {videourl ? (
              <>
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${videourl}?autoplay=1&loop=1&showinfo=0&controls=0`} //Lcb9ItIvkt8
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              </>
            ) : (
              <div>
                {fileUrl && (
                  <img style={{ width: "100%" }} src={fileUrl} alt={fileUrl} />
                )}
                {/* <img
                  style={{ width: "100%" }}
                  src="https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/video.jpg?alt=media&token=e7b46793-8ced-4478-9025-5a0b8fd49f02"
                  alt="videourl"
                /> */}
              </div>
            )}
            {/* {fileUrl && <img style={{ width: "100%" }} src={fileUrl} alt={fileUrl} />} */}
            {description && <p>{description}</p>}

            {musclegroup && (
              <List
                component="nav"
                className={classes.root}
                aria-label="contacts"
              >
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={musclegroup} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={equipment} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={mechanics} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={level} />
                </ListItem>
              </List>
            )}
          </div>
        ) : (
          <div
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;
