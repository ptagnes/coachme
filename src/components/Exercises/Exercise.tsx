import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../firebase/Authentication";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
      width: "100%",
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
  fileUrl,
  id,
}: {
  title: string;
  fileUrl: string;
  id: string;
}) => {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        // wrap="nowrap"
        spacing={2}
        style={{ backgroundColor: "#3a3c6d" }}
      >
        <Grid item>
          <Avatar className={classes.avatar}>
            <LazyLoadImage alt={fileUrl} src={fileUrl} width={100} />
          </Avatar>
        </Grid>
        <Grid item xs zeroMinWidth className={classes.details}>
          <Typography noWrap className={classes.detailsp}>
            <Link
              to={`/exercisedetail/${id}`}
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "18px 0",
                width: "95%",
                overflow: "hidden",
              }}
            >
              <span>{title}</span>
            </Link>
            {currentUser && currentUser.uid === "2xT2T9CqfjgU5TQGn06VL920Tkp2" && (
              <IconButton aria-label="edit" style={{ padding: "7px" }}>
                <Link to={`/editexercise/${id}`} style={{ color: "#fff" }}>
                  <MoreVertIcon />
                </Link>
              </IconButton>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Exercise;
