import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Movies from "./Movies";
import Typography from "@material-ui/core/Typography";
import MoviesContext from "../../../context/movies-context";
//////////////// Movies rendered with Context API  ///////////////////////////////

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

function MovieListContext() {
  const classes = useStyles();
  const allpages = 5;
  const [page, setPage] = React.useState<number>(1);
  const [movieItems, setMovieITems] = React.useState<{}[]>();

  const handleChangePage = (pageNr: number) => {
    setPage(pageNr + 1);
  };
  const context = useContext(MoviesContext);
  React.useEffect(() => {
    for (const [key] of Object.entries(context)) {
      if (key === "products") {
        //@ts-ignore
        const moviesItems = context[key].results;
        setMovieITems(moviesItems);
      }
    }
  }, [context]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {movieItems
          ? movieItems.map((prop: any, key: number) => (
              <Movies key={key} data={prop} />
            ))
          : "loading..."}
      </Grid>
      {movieItems && movieItems.length && (
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

export default MovieListContext;
