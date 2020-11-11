import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Grid from "@material-ui/core/Grid";
import Movies from "./Movies";
import Typography from "@material-ui/core/Typography";
import getMoviesAction from "../../../redux/actions/getMoviesAction";
import { StoreState } from "../../../redux/reducers/index";
//////////////// Movies rendered via Redux ///////////////////////////////
interface MoviesListProps {
  moviesState?: any;
  getMoviesAction?: (page: number) => void;
}
interface MoviesListState {
  page: number;
  data: {}[];
}
const allpages = 5;

class MoviesList extends Component<MoviesListProps, MoviesListState> {
  constructor(props: MoviesListProps) {
    super(props);
    this.state = {
      page: 1,
      data: [],
    };
  }

  componentDidMount() {
    if (this.props.getMoviesAction !== undefined) {
      this.props.getMoviesAction(this.state.page);
    }
  }
  render() {
    const handleChangePage = (pageNr: number) => {
      this.setState({ page: pageNr + 1 });
      if (this.props.getMoviesAction !== undefined) {
        this.props.getMoviesAction(pageNr + 1);
      }
    };
    const doRender =
      this.props.moviesState && this.props.moviesState.moviesState;
    return (
      <div>
        <Grid container spacing={3}>
          {this.props.moviesState && this.props.moviesState.moviesState
            ? this.props.moviesState.moviesState.map(
                (prop: any, key: number) => <Movies key={key} data={prop} />
              )
            : "loading..."}
        </Grid>
        {doRender && (
          <>
            <Typography style={{ marginTop: "20px" }}>
              Page: {this.state.page}
            </Typography>
            <ul style={{ display: "flex" }}>
              {Array.from(Array(allpages), (e, i) => {
                return (
                  <li key={i} style={{ margin: "5px", listStyle: "none" }}>
                    <button type="button" onClick={() => handleChangePage(i)}>
                      {i + 1}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMoviesAction: (page: number) => dispatch<any>(getMoviesAction(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
