import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import getExercisesAction from "../redux/actions/getExercisesAction";
import { filterExerciseByValue, clearFilters } from "../redux/actions";
import { StoreState } from "../redux/reducers/index";
import ExerciseCard from "./Exercises/ExerciseCard";
import ExerciseCardTopCategories from "./Exercises/ExerciseCardTopCategories";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const Musclegroups = [
  "Upper body",
  "Lower body",
  "Abs & Core",
  "Back",
  "Glutes",
  "Wholebody",
  "Cardio",
];
const Equipment = ["Barbell", "Dumbbell", "Kettlebell"];
interface ExercisesProps {
  exercisesState: any;
  getExercisesAction: () => void;
  clearFilters: () => void;
  filterExerciseByValue: (query: string, filter: string) => void;
}
class DashboardExerciseCategories extends Component<ExercisesProps> {
  componentDidMount() {
    if (this.props.getExercisesAction !== undefined) {
      this.props.getExercisesAction();
    }
  }
  render() {
    const data =
      this.props.exercisesState && this.props.exercisesState.exercisesState;
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
        {Equipment.map((prop: any, key: number) => (
          <ExerciseCardTopCategories
            key={key}
            title={prop}
            filter="equipment"
            filterExercise={this.props.filterExerciseByValue}
            clearFilters={this.props.clearFilters}
            data={this.props.exercisesState.filteredExercises}
          />
        ))}
        <Button
          onClick={() => {
            // props.removeExercise(props.match.params.id);
            // //context2.dispatch(removeExercise(props.match.params.id)); //{ id: exercise.id }
            // props.history.push("/");
          }}
          startIcon={<AddIcon />}
        >
          Add Tools
        </Button>
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardExerciseCategories);
