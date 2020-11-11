import React, { Component } from "react";
import MovieList from "./Movies/MoviesList/MovieList";

export default class DashboardAdmin extends Component {
  render() {
    return (
      <div>
        <h2>
          Movies <small>(Api call)</small>
        </h2>
        <MovieList />
      </div>
    );
  }
}
