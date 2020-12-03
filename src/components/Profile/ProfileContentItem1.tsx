import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createStructuredSelector } from "reselect";
import {
  selectUsers,
  // selectUserActivities,
  selectTodayActivity,
  selectUserActivitiesThisMWeek,
  selectUserActivitiesThisMonth,
} from "../../redux/selectors/usersSelectors";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import TimeAndDate from "./TimeAndDate";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { AuthContext } from "../../firebase/Authentication";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background: "#28294ad9",
      height: "100%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    content: {
      // flex: "1 0 auto",
      display: "flex",
      flexDirection: "column",
    },
    cover: {
      // width: 238,
    },
    profileh5: {
      fontSize: "0.7rem",
    },
    subtitle1: {
      fontSize: "0.9rem",
      lineHeight: "1.2",
      marginBottom: "0.4rem",
    },
  })
);

function ProfileContentItem1({
  users,
  // activities,
  todaysactivity,
  allActivities,
  activitiesThisWeek,
}: {
  users: any;
  // activities: any;
  todaysactivity: any;
  allActivities: any;
  activitiesThisWeek: any;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser } = React.useContext(AuthContext);
  let id: string;
  if (currentUser) {
    id = currentUser.uid;
  }
  React.useEffect(() => {
    fetchUserStartAsync(id);
  }, [fetchUserStartAsync]);
  console.log(todaysactivity);
  console.log(allActivities);
  let type: string = "";
  if (todaysactivity) {
    switch (todaysactivity.type) {
      case 1:
        type = "Lifting weights";
        break;
      case 2:
        type = "Cardio";
        break;
      case 3:
        type = "Weights & Cardio";
        break;
      default:
        type = "Not set";
    }
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <AccessibilityNewIcon
                    className="iconanimation"
                    style={{ color: "#5b5cc3" }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    {todaysactivity ? todaysactivity.name : "Restday"}
                    <small
                      style={{
                        fontSize: "0.7rem",
                        display: "block",
                        color: "#bdbdbd94",
                        marginTop: "5px",
                      }}
                    >
                      {todaysactivity ? type : "Restday"}
                    </small>
                  </Typography>
                </span>
                <span>
                  <Typography
                    className={classes.profileh5}
                    component="h5"
                    variant="h5"
                  >
                    Today's workout
                  </Typography>
                </span>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <TimeAndDate />
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon2.svg"}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    {activitiesThisWeek}
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  WO this week
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon.svg"}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    {allActivities}
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  All WOs so far
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <DirectionsWalkIcon
                    style={{ color: "#5b5cc3" }}
                    className="iconanimation"
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    2500
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Steps today
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <span>
                  <TrendingDownIcon
                    style={{ color: "#5b5cc3" }}
                    className="iconanimation"
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.subtitle1}
                  >
                    {users && users.weight && <span>{users.weight}kg</span>}
                  </Typography>
                </span>
                <Typography
                  className={classes.profileh5}
                  component="h5"
                  variant="h5"
                >
                  Weight
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  users: selectUsers(state),
  // activities: selectUserActivities(state),
  todaysactivity: selectTodayActivity(state),
  allActivities: selectUserActivitiesThisMonth(state),
  activitiesThisWeek: selectUserActivitiesThisMWeek(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContentItem1);
