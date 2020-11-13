let initialState = {
  exercisesState: [],
  filteredExercises: [],
};
const exercisesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SORT_EXERCISES":
      return state;

    case "FILTER_EXERCISES_BY_VALUE":
      const query = action.query.toLowerCase();
      const filter = action.filter.toLowerCase();
      let filterTarget;
      if (state.filteredExercises.length > 0) {
        filterTarget = state.filteredExercises;
      } else {
        filterTarget = state.exercisesState;
      }
      const matchedExercises = filterTarget.filter((exercise: any) => {
        return exercise[filter].toLowerCase().includes(query);
      });
      console.log(matchedExercises);
      return {
        ...state,
        filteredExercises: matchedExercises,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filteredExercises: [],
      };

    case "ADD_EXERCISE":
      return state;

    case "REMOVE_EXERCISE":
      return state;

    case "EDIT_EXERCISE":
      return state;

    case "GET_EXERCISES":
      return {
        ...state,
        exercisesState: Object.values(action.payload),
      };
    default:
      return state;
  }
};
export default exercisesReducer;
