import UsersActionTypes from "../types/usersTypes";

const INITIAL_STATE = {
  users: null,
  isFetching: false,
  errorMessage: undefined,
  activities: []
};

const usersReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload,
        activities: action.payload.activities
      };
    case UsersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case UsersActionTypes.EDIT_USERS:
      return state;
    case UsersActionTypes.ADD_USER_ACTIVITY:
      return {
        ...state,
        activities: action.activities
      }
    case UsersActionTypes.EDIT_USER_ACTIVITY:
      return {
        ...state,
        activities: action.activities
      }
    default:
      return state;
  }
};

export default usersReducer;
