let initialState = {
  exercisesState: [],
  filteredExercises: [],
  nFilteredExercises: [],
};
const exercisesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SORT_EXERCISES":
      return state;

    // case "SORT_COLLECTION":
    //   return state.slice().sort(function (a, b) {
    //     var nameA = a.name.toLowerCase(),
    //       nameB = b.name.toLowerCase();
    //     if (nameA < nameB) return -1;
    //     if (nameA > nameB) return 1;
    //     return 0;
    //   });

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
      return {
        ...state,
        filteredExercises: matchedExercises,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filteredExercises: [],
      };

    case "FILTER_FILTERED_EXERCISES_BY_VALUE":
      const filteredQuery = action.query.toLowerCase();
      const newfilter = action.filter.toLowerCase();
      let dataToFilter;
      if (state.nFilteredExercises.length > 0) {
        dataToFilter = state.nFilteredExercises;
      } else {
        dataToFilter = state.filteredExercises;
      }
      const nMatchedExercises = dataToFilter.filter((exercise: any) => {
        return exercise[newfilter].toLowerCase().includes(filteredQuery);
      });
      return {
        ...state,
        nFilteredExercises: nMatchedExercises,
      };

    case "CLEAR_FILTERED_FILTERS":
      return {
        ...state,
        nFilteredExercises: [],
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
