import React, { Component } from "react";
import axios from "axios";
import moviesReducer from "../context/reducers/moviesReducer";
import MoviesContext from "../context/movies-context";
import MovieListContext from "./Movies/MoviesList/MovieListContext";

const BASE_URL = "https://api.themoviedb.org/3";
const api = axios.create({ baseURL: BASE_URL });
const api_key = "6ed83806084e4d4b99cd0a84f100bf52";

export class Dashboard_Context extends Component {
  state = {
    isLoading: true,
    movies: [],
    page: 1,
    dispatch: (action: any) =>
      this.setState((state) => moviesReducer(state, action)),
  };
  fetchData = async () => {
    const movies = await api.get(
      `movie/top_rated?api_key=${api_key}&page=${this.state.page}`
    );
    this.setState({
      products: movies.data,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h2>
          Movies <small>(Context API)</small>
        </h2>
        <MoviesContext.Provider value={this.state}>
          <MovieListContext />
        </MoviesContext.Provider>
      </div>
    );
  }
}

export default Dashboard_Context;
