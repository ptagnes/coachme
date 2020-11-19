import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import getExercisesAction from "../redux/actions/getExercisesAction";
import {
  filterExerciseByValue,
  filterFilteredExerciseByValue,
  clearFilters,
  clearFilteredFilters,
  getFitnessTools,
} from "../redux/actions";
import { StoreState } from "../redux/reducers/index";
import ExerciseCard from "./Exercises/ExerciseCard";
import ExerciseCardTopCategories from "./Exercises/ExerciseCardTopCategories";
import FitnessToolsDialog from "./FitnessToolsDialog";

// import { selectCollection } from "../redux/selectors/exerciseSelectors";

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
  clearFilteredFilters: () => void;
  filterExerciseByValue: (query: string, filter: string) => void;
  filterFilteredExerciseByValue: (query: string, filter: string) => void;
  fitnessToolsState?: any;
  getFitnessTools?: () => void;
  collections?: any;
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
    return (
      <div className="bp">
        <h2>Exercise categories by musclegroup</h2>
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
        <p>Filter By Fitness Tools</p>
        {state.map((prop: any, key: number) => (
          <ExerciseCardTopCategories
            key={key}
            title={prop.name}
            filter="equipment"
            filterExercise={this.props.filterExerciseByValue}
            filterFilteredExercise={this.props.filterFilteredExerciseByValue}
            clearFilters={this.props.clearFilters}
            clearFilteredFilters={this.props.clearFilteredFilters}
            data={this.props.exercisesState.filteredExercises}
            filteredData={this.props.exercisesState.nFilteredExercises}
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
  exercisesState: state.exercisesState,
  fitnessToolsState: state.fitnessToolsState,
  // collection: selectCollection("musclegroup")(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getExercisesAction: () => dispatch<any>(getExercisesAction()),
  clearFilters: () => dispatch<any>(clearFilters()),
  clearFilteredFilters: () => dispatch<any>(clearFilteredFilters()),
  filterExerciseByValue: (query: string, filter: string) =>
    dispatch<any>(filterExerciseByValue(query, filter)),
  filterFilteredExerciseByValue: (query: string, filter: string) =>
    dispatch<any>(filterFilteredExerciseByValue(query, filter)),
  getFitnessTools: () => dispatch<any>(getFitnessTools()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardExerciseCategories);
