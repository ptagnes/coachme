import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchWorkoutsStartAsync } from "../../redux/actions/workoutActions";
import WorkoutPageCollection from "./WorkoutPageCollection";
import WorkoutsOverview from "./WorkoutsOverview";
interface WorkoutsPageProps {
  fetchWorkoutsStartAsync?: () => void;
  match?: any;
}
class WorkoutsPage extends React.Component<WorkoutsPageProps> {
  componentDidMount() {
    const { fetchWorkoutsStartAsync } = this.props;
    if (fetchWorkoutsStartAsync) {
      fetchWorkoutsStartAsync();
    }
  }
  render() {
    // const { match } = this.props;
    console.log(window.location.pathname);
    console.log(this.props);
    const match = window.location.pathname;
    return (
      <div className="bp">
        <h1>Workout routines</h1>
        <Route exact path={`${match}`} component={WorkoutsOverview} />
        <Route
          path={`${match}/:collectionId`}
          component={WorkoutPageCollection}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWorkoutsStartAsync: () => dispatch<any>(fetchWorkoutsStartAsync()),
});
export default connect(null, mapDispatchToProps)(WorkoutsPage);
