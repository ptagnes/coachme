import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ExerciseForm from "./ExerciseForm";
import { editExercise, removeExercise } from "../../redux/actions";
import ExercisesContext from "../../context/exercises-context";
// import { ExercisesContext2 } from "../../firebase/ExercisesProvider";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AlertDialog from "../AlertDialog";

const EditExercise = (props: any) => {
  const id = props.match.params.id;
  const [exercises, setExercises] = React.useState<{}[] | undefined>();
  let exercise: {} | undefined;
  let history = useHistory();
  if (exercises) {
    exercise = exercises.find((exercise: any) => exercise.id === id);
  }
  const context = React.useContext(ExercisesContext);
  // const context2 = React.useContext(ExercisesContext2);
  React.useEffect(() => {
    //@ts-ignore
    setExercises(context.exercises);
  }, [context]);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="bp">
      <div className="page-header">
        <div className="content-container">
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Button
              style={{ marginRight: "10px", paddingLeft: "0", color: "#fff" }}
              color="primary"
              onClick={handleClick}
            >
              <ArrowBackIcon />
            </Button>
            <h1 className="page-header__title">Edit Exercise</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        {exercise && (
          <ExerciseForm
            action="edit"
            exercise={exercise}
            onSubmit={(exercise: any) => {
              props.editExercise(id, exercise);
              props.history.push("/");
            }}
          />
        )}
        <AlertDialog
          buttonTitle="Delete"
          title="Delete exercise..."
          startIcon="delete"
          confirmFunction={() => {
            props.removeExercise(id);
            //context2.dispatch(removeExercise(props.match.params.id)); //{ id: exercise.id }
            props.history.push("/");
          }}
        />
      </div>
    </div>
  );
};
export interface Exercise {
  id?: string;
  title: string;
  description: string;
  url: string;
  image: string;
  level: string;
  equipment: string;
  mechanics: string;
  musclegroup: string;
  videourl: string;
  createdAt: Date;
}
const mapStateToProps = (state: any) => ({
  ...state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeExercise: (id: string) => dispatch<any>(removeExercise(id)),
  editExercise: (id: string, updates: Exercise) =>
    dispatch<any>(editExercise(id, updates)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditExercise);
