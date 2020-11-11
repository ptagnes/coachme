import React from "react";
import ExercisesContext from "../../context/exercises-context";
import { ExercisesContext2 } from "../../firebase/ExercisesProvider";
import Button from "@material-ui/core/Button";

const ExerciseDetail = (props: any) => {
  const id = props.match.params.id;
  const [exercises, setExercises] = React.useState<{}[] | undefined>();
  let exercise: {} | undefined;
  if (exercises) {
    exercise = exercises.find(
      (exercise: any) => exercise.id === props.match.params.id
    );
  }
  const context = React.useContext(ExercisesContext);
  const context2 = React.useContext(ExercisesContext2);
  React.useEffect(() => {
    //@ts-ignore
    setExercises(context.exercises);
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
      <div className="content-container">More details</div>
    </div>
  );
};

export default ExerciseDetail;
