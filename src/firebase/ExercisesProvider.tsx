import React, { Component, createContext } from "react";
import "firebase/auth";
import firebase from "./firebase";
import exercisesReducer from "../context/reducers/exercisesReducer";

export const ExercisesContext2 = React.createContext<any | null>(null);

const exerciseListRef = firebase
  .firebaseDb()
  .collection("exerciselist")
  .orderBy("createdAt", "desc");

class ExercisesProvider extends Component {
  state = {
    isLoading: true,
    exercises: [],
    page: 1,
    dispatch: (action: any) =>
      this.setState((state) => exercisesReducer(state, action)),
  };

  fetchData = async () => {
    exerciseListRef.onSnapshot((snapshot: any) => {
      const payload = snapshot.docs.map((doc: any) => {
        console.log(doc.id, doc.data());
        return { id: doc.id, ...doc.data() };
      });
      this.setState({
        exercises: payload,
      });
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    console.log("state from ExercisesProvider");
    console.log(this.state);
    return (
      <ExercisesContext2.Provider value={this.state}>
        {this.props.children}
      </ExercisesContext2.Provider>
    );
  }
}
export default ExercisesProvider;
