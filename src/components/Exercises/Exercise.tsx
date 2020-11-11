import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 500,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
    },
    avatar: {
      width: "90px",
      height: "60px",
      borderRadius: "5px",
    },
    details: {
      alignSelf: "center",
      display: "flex",
    },
    detailsp: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  })
);

const Exercise = ({
  title,
  image,
  id,
}: {
  title: string;
  image: string;
  id: string;
}) => {
  const classes = useStyles();
  // const trimmedId = id.replace(/\s/g, "");
  return (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar className={classes.avatar}>
            <img style={{ width: "100%" }} src={image} alt={image} />
          </Avatar>
        </Grid>
        <Grid item xs zeroMinWidth className={classes.details}>
          <Typography noWrap className={classes.detailsp}>
            <Link
              to={`/exercisedetail/${id}`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <span>{title}</span>
            </Link>
            <IconButton aria-label="edit">
              <Link to={`/editexercise/${id}`} style={{ color: "#fff" }}>
                <MoreVertIcon />
              </Link>
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Exercise;
