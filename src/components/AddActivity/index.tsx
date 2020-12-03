import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { addUserActivity } from "../../redux/actions/usersActions";
import { AuthContext } from "../../firebase/Authentication";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";
import { useHistory } from "react-router";
import AddEventToGoogleCalendar from "../WorkoutTracker/AddEventToGoogleCalendar";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function AddActivity(props: any) {
  const classes = useStyles();
  let history = useHistory();
  const { queryDate, addUserActivity, userData, fetchUserStartAsync } = props;
  const { currentUser } = useContext(AuthContext);
  let uid: string;
  if (currentUser) {
    uid = currentUser.uid;
  }
  const defaultActivity = {
    name: "",
    type: 1,
    duration: 60,
    date: queryDate,
    id: "nid" + Math.random().toString(36).substr(2, 9),
  };
  const [activity, setActivity] = useState(defaultActivity);
  const [activitiesState, setActivitiesState] = useState<{}[]>([]);

  useEffect(() => {
    if (currentUser) {
      const user = userData.users;
      if (user) {
        if (user.activities) {
          const ac = userData.activities;
          let activities = Array.isArray(ac) ? ac : [ac];
          setActivitiesState(activities);
        }
      }
    }
  }, [currentUser, queryDate, userData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      date: queryDate,
      [name]: value,
    });
  };
  const handleSlider = (e: any) => {
    const duration = e.target.getAttribute("aria-valuenow");
    if (duration !== null) {
      setActivity({ ...activity, duration: duration });
    } else {
      setActivity({ ...activity, duration: 60 }); //TODO: fix null values
    }
  };
  const isValid = activity.name === "";

  const handleSubmit = () => {
    const mergedActivities = [...activitiesState, activity];
    addUserActivity(uid, mergedActivities);
    setActivity(defaultActivity);
    history.push({
      pathname: "/workouttracker",
      state: {
        action: "added",
      },
    });
  };

  let calDate = new Date(activity.date);
  const calEvent = {
    name: activity.name,
    details: "Workout",
    location: "Friskis",
    startsAt: calDate.toISOString(),
    endsAt: calDate.toISOString(),
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Activity name"
          value={activity.name}
          name="name"
          onChange={handleChange}
        />
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Type
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activity.type}
            style={{ minWidth: "100%" }}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Lifting Weights</MenuItem>
            <MenuItem value={2}>Cardio</MenuItem>
            <MenuItem value={3}>Weights/Cardio</MenuItem>
          </Select>
        </div>
        <Typography id="discrete-slider" gutterBottom>
          Duration
        </Typography>
        <Slider
          defaultValue={activity.duration}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={120}
          name="duration"
          onChange={handleSlider}
          style={{ marginBottom: "20px" }}
        />
      </FormControl>

      <AddEventToGoogleCalendar event={calEvent} />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isValid}
      >
        Add activity
      </Button>
    </form>
  );
}
const mapStateToProps = (state: any) => ({
  userData: state.usersState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addUserActivity: (id: string, activities: any) =>
    dispatch<any>(addUserActivity(id, activities)),
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddActivity);
