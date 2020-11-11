import React, { Component, createContext } from "react";
import "firebase/auth";
import firebase from "./firebase";

export const UserContext = createContext<any>({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    firebase.firebaseAuth().onAuthStateChanged((userAuth: any) => {
      this.setState({ user: userAuth });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
