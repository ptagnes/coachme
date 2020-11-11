import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function Movies(props: any) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  const { data } = props;
  const { title, overview, poster_path: img, vote_average: avg } = data;
  const size = "w500";
  const BASE_URL = "https://image.tmdb.org/t/p/";
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${BASE_URL}/${size}${img}`}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant="body1" component="span">
            Rating: {avg}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Overview:</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {overview}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
