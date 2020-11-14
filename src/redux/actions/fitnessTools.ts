import firebase from "../../firebase";
import { Dispatch } from "redux";

const fitnessToolsRef = firebase.firebaseDb().collection("fitnesstools");

export const getFitnessTools = () => async (dispatch: Dispatch) => {
  fitnessToolsRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log("getting fitnesstools");
    console.log(payload);
    dispatch({
      type: "GET_FITNESS_TOOLS",
      payload: payload,
    });
  });
};

export const addFitnessTool = (name: string) => async (dispatch: Dispatch) => {
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

export const removeFitnessTool = (id: string, name: string) => async (
  dispatch: Dispatch
) => {
  fitnessToolsRef.onSnapshot((snapshot: any) => {
    const data = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    // console.log("data");
    // console.log(data);
    const payload = data.filter((fitnesstools: any) => fitnesstools.id !== id);
    // console.log(payload);
    fitnessToolsRef
      .where("name", "==", name)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.size);
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
