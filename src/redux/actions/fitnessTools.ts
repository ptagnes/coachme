import firebase from "../../firebase";
import { Dispatch } from "redux";

const fitnessToolsRef = firebase.firebaseDb().collection("fitnesstools");

export const getFitnessTools = () => async (dispatch: Dispatch) => {
  fitnessToolsRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    dispatch({
      type: "GET_FITNESS_TOOLS",
      payload: payload,
    });
  });
};

export const addFitnessTool = ({ name = "" } = {}) => async (
  dispatch: Dispatch
) => {
  fitnessToolsRef
    .add({
      name: name,
    })
    .then(() => {
      dispatch({
        type: "ADD_FITNESS_TOOL",
      });
    });
};

export const removeExercise = (id: string) => async (dispatch: Dispatch) => {
  fitnessToolsRef.onSnapshot((snapshot: any) => {
    const data = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    const payload = data.filter((exercises: any) => exercises.id !== id);
    fitnessToolsRef
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs[0] !== undefined) {
          querySnapshot.docs[0].ref
            .delete()
            .then(function () {
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              console.error("Error updating document: ", error);
            });
        }
      });
    dispatch({
      type: "REMOVE_FITNESS_TOOL",
      payload: payload,
    });
  }); //onSnapshot end
};
