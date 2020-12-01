import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForTopWorkoutCategories } from "../../redux/selectors/workoutSelectors";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { fetchWorkoutsStartAsync } from "../../redux/actions/workoutActions";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import useProgressiveImg from "../useProgressiveImg ";
interface WorkoutOverviewProps {
  fetchWorkoutsStartAsync?: () => void;
  collections?: any;
}
class WorkoutOverview extends React.Component<WorkoutOverviewProps> {
  componentDidMount() {
    const { fetchWorkoutsStartAsync } = this.props;
    if (fetchWorkoutsStartAsync) {
      fetchWorkoutsStartAsync();
    }
  }
  render() {
    return (
      <div className="bp">
        <h1>Workout routines</h1>
        <Grid container spacing={3}>
          {this.props.collections.map(
            ({
              id,
              title,
              imageUrl,
              routeName,
            }: {
              id: number;
              title: string;
              imageUrl: string;
              routeName: string;
            }) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={id}>
                <Card>
                  <Link
                    to={`/workouts/${routeName}`}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="training"
                        height="180"
                        // style={{
                        //   filter: blur ? "blur(20px)" : "none",
                        //   transition: blur ? "none" : "filter 0.3s ease-out",
                        // }}
                        image={`${process.env.PUBLIC_URL}/images/${imageUrl}`}
                        title={title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ArrowForwardIosIcon />
                          <span style={{ marginLeft: "0.6rem" }}>{title}</span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </div>
    );
  }
}

//   /* eslint-disable */
//   // const [src, { blur }] = useProgressiveImg(
//   //   "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
//   //   "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
//   // );
//   /* eslint-enable */

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForTopWorkoutCategories,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkoutsStartAsync: () => dispatch<any>(fetchWorkoutsStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutOverview);
