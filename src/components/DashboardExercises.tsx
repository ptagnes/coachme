import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import getExercisesAction from "../redux/actions/getExercisesAction";
import { StoreState } from "../redux/reducers/index";

import Exercises from "./Exercises/Exercises";

interface ExercisesProps {
  exercisesState?: any;
  getExercisesAction?: () => void;
}

class DashboardExercises extends Component<ExercisesProps> {
  componentDidMount() {
    if (this.props.getExercisesAction !== undefined) {
      this.props.getExercisesAction();
    }
  }
  render() {
    const data =
      this.props.exercisesState && this.props.exercisesState.exercisesState;
    return (
      <div>
        <h2>Exercises</h2>
        <Exercises data={data} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  ...state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getExercisesAction: () => dispatch<any>(getExercisesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardExercises);
