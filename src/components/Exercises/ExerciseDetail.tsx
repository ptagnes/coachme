import React from "react";
import ExercisesContext from "../../context/exercises-context";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ExerciseDetail = (props: any) => {
  const id = props.match.params.id;
  const [exercise, setExercise] = React.useState<{} | undefined>();
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [image, setImage] = React.useState<string>();
  const context = React.useContext(ExercisesContext);

  React.useEffect(() => {
    if (context.exercises) {
      const allExerc = context.exercises;
      const exer = allExerc.find((exercise: any) => exercise.id === id);
      console.log(exer);
      setExercise(exer);
      setTitle(exer.title);
      setDescription(exer.description);
      setImage(exer.image);
    }
  }, [context]);

  const handleClick = () => {
    props.history.push("/");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Exercise details</h1>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Go Back
          </Button>
        </div>
      </div>
      <div className="content-container">
        {exercise ? (
          <div>
            {title && <p>{title}</p>}
            {image && <img style={{ width: "100%" }} src={image} alt={image} />}
            {description && <p>{description}</p>}
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
