import React, { Component } from "react";
import Exercises from "./Exercises/Exercises";

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h2>
          Exercises <small>(Redux)</small>
        </h2>
        <Exercises />
      </div>
    );
  }
}
