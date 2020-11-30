import React from "react";
import ExerciseForm from "./ExerciseForm";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addExercise } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const AddExercise = (props: any) => {
  const handleClick = () => {
    history.goBack();
  };
  let history = useHistory();

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
            <h1 className="page-header__title">Add Exercise</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        <ExerciseForm
          action="add"
          onSubmit={(exercise: any) => {
            props.addExercise(exercise);
            history.push("/");
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
  fileUrl: string;
  level: string;
  equipment: string;
  mechanics: string;
  musclegroup: string;
  videourl: string;
  createdAt: Date;
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addExercise: (exercise: Exercise) => dispatch<any>(addExercise(exercise)),
});
export default connect(null, mapDispatchToProps)(AddExercise);
