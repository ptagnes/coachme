import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import getExercisesAction from "../redux/actions/getExercisesAction";
import {
  filterExerciseByValue,
  clearFilters,
  getFitnessTools,
} from "../redux/actions";
import { StoreState } from "../redux/reducers/index";
import ExerciseCard from "./Exercises/ExerciseCard";
import ExerciseCardTopCategories from "./Exercises/ExerciseCardTopCategories";
import FitnessToolsDialog from "./FitnessToolsDialog";

const Musclegroups = [
  "Upper body",
  "Lower body",
  "Abs & Core",
  "Back",
  "Glutes",
  "Wholebody",
  "Cardio",
];
interface ExercisesProps {
  exercisesState: any;
  getExercisesAction: () => void;
  clearFilters: () => void;
  filterExerciseByValue: (query: string, filter: string) => void;
  fitnessToolsState?: any;
  getFitnessTools?: () => void;
}
class DashboardExerciseCategories extends Component<ExercisesProps> {
  state = {
    open: false,
  };
  componentDidMount() {
    if (this.props.getExercisesAction !== undefined) {
      this.props.getExercisesAction();
    }
    if (this.props.getFitnessTools !== undefined) {
      this.props.getFitnessTools();
    }
  }
  render() {
    const state =
      this.props.fitnessToolsState &&
      this.props.fitnessToolsState.fitnessToolsState;
    // console.log(state);
    // const data =
    //   this.props.exercisesState && this.props.exercisesState.exercisesState;
    return (
      <div className="bp">
        <h2>Exercise categories</h2>
        {Musclegroups.map((prop: any, key: number) => (
          <ExerciseCard
            key={key}
            title={prop}
            filter="musclegroup"
            filterExercise={this.props.filterExerciseByValue}
            clearFilters={this.props.clearFilters}
            data={this.props.exercisesState.filteredExercises}
          />
        ))}
        <p>Fitness Tools</p>
        {state.map((prop: any, key: number) => (
          <ExerciseCardTopCategories
            key={key}
            title={prop.name}
            filter="equipment"
            filterExercise={this.props.filterExerciseByValue}
            clearFilters={this.props.clearFilters}
            data={this.props.exercisesState.filteredExercises}
          />
        ))}

        <FitnessToolsDialog
          buttonTitle="Add Tools"
          title="Add Fitness Tools"
          startIcon="add"
          open={this.state.open}
          handleClickOpen={() => {
            this.setState({ open: true });
          }}
          handleClickClose={() => {
            this.setState({ open: false });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  ...state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getExercisesAction: () => dispatch<any>(getExercisesAction()),
  clearFilters: () => dispatch<any>(clearFilters()),
  filterExerciseByValue: (query: string, filter: string) =>
    dispatch<any>(filterExerciseByValue(query, filter)),
  getFitnessTools: () => dispatch<any>(getFitnessTools()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardExerciseCategories);
