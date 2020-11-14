let initialState = {
  fitnessToolsState: [],
};
const fitnessToolsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_FITNESS_TOOL":
      return state;

    case "REMOVE_FITNESS_TOOL":
      return state;

    case "GET_FITNESS_TOOLS":
      return {
        ...state,
        fitnessToolsState: Object.values(action.payload),
      };
    default:
      return state;
  }
};
export default fitnessToolsReducer;
