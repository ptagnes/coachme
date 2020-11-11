import React from "react";
import ExerciseForm from "./ExerciseForm";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addExercise } from "../../redux/actions";

const AddExercise = (props: any) => {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Add Exercise</h1>
        </div>
      </div>
      <div className="content-container">
        <ExerciseForm
          onSubmit={(exercise: any) => {
            props.addExercise(exercise);
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
  addExercise: (exercise: Exercise) => dispatch<any>(addExercise(exercise)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddExercise);
