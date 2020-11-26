import firebase from "./../../firebase";
import UsersActionTypes from "../types/usersTypes";
import { Dispatch } from "redux";

const usersRef = firebase.firebaseDb().collection("users");

export const fetchUserStart = () => ({
  type: UsersActionTypes.FETCH_USERS_START,
});
export const fetchUserSuccess = (workoutsMap: any) => ({
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: workoutsMap,
});
export const fetchUserFailure = (errorMessage: any) => ({
  type: UsersActionTypes.FETCH_USERS_FAILURE,
  payload: errorMessage,
});
export const fetchUserStartAsync = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUserStart());
    const user = usersRef.doc(id);
    user
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          dispatch(fetchUserSuccess(doc.data()));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        dispatch(fetchUserFailure(error));
        console.log("Error getting document:", error);
      });
  };
};
export const editUser = (id: string, updates: any) => async (
  dispatch: Dispatch
) => {
  var executed = false;
  usersRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    const [userParam] = Object.keys(updates);
    const userVal = updates[Object.keys(updates)[0]];
    const user = usersRef.doc(id);
    if (!executed) {
      executed = true;
      user.update({
        [userParam]: userVal,
      });
    }
    dispatch({
      type: UsersActionTypes.EDIT_USERS,
      payload: payload,
    });
  });
};
export const addUserActivity = (id: string, activities: any) => async (
  dispatch: Dispatch
) => {
  var executed = false;
  usersRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    const user = usersRef.doc(id);
    if (!executed) {
      executed = true;
      user.update({
        activities: activities,
      });
    }
    dispatch({
      type: UsersActionTypes.ADD_USER_ACTIVITY,
      payload: payload,
    });
  });
};
export const editUserActivity = (
  id: string,
  activities: any,
  activityKey: any
) => async (dispatch: Dispatch) => {
  var executed = false;
  usersRef.onSnapshot((snapshot: any) => {
    const users = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    const user = usersRef.doc(id); //the user in firestore
    const userdata = users.find((x: any) => x.id === id); //the user
    const userActivities = userdata.activities; //the activities of the user
    //index of updated activity
    const objIndex = userActivities.findIndex(
      (obj: any) => obj.id == activityKey
    );
    if (activities.date === null) {
      const removedArray = userActivities.splice(objIndex, 1);
      console.log(removedArray);
      if (!executed) {
        executed = true;
        user.update({
          activities: userActivities,
        });
      }
    } else {
      userActivities[objIndex] = activities; //updating activities array at the index position of the activityKey
      if (!executed) {
        executed = true;
        user.update({
          activities: userActivities,
        });
      }
    }
    dispatch({
      type: UsersActionTypes.EDIT_USER_ACTIVITY,
      payload: users,
    });
  });
};
