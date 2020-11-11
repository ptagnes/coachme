import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Movies from "./Movies";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
//////////////// Movies rendered with axios api.get  ///////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const BASE_URL = "https://api.themoviedb.org/3";
const api = axios.create({ baseURL: BASE_URL });
const api_key = "6ed83806084e4d4b99cd0a84f100bf52";

function MovieList() {
  const classes = useStyles();
  const allpages = 5;
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getUpcoming = api.get(
      `movie/top_rated?api_key=${api_key}&page=${page}`
    );
    getUpcoming.then((response: any) => {
      setData(response.data.results);
    });
  }, [page]);

  const handleChangePage = (pageNr: number) => {
    setPage(pageNr + 1);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.length
          ? data.map((prop: any, key: number) => (
              <Movies key={key} data={prop} />
            ))
          : "loading..."}
      </Grid>
      {data.length && (
        <>
          <Typography style={{ marginTop: "20px" }}>Page: {page}</Typography>
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

export default MovieList;
