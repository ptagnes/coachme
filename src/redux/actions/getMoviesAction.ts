import { Dispatch } from "redux";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const api = axios.create({ baseURL: BASE_URL });
const api_key = "6ed83806084e4d4b99cd0a84f100bf52";

const getMoviesAction = (page: number) => async (dispatch: Dispatch) => {
  const getUpcoming = api.get(
    `movie/top_rated?api_key=${api_key}&page=${page}`
  );
  getUpcoming
    .then((response) => {
      // console.log(response.data.results);
      const payload = response.data.results;
      dispatch({
        type: "GET_MOVIES",
        payload: payload,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export default getMoviesAction;
