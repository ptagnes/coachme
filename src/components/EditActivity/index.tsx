import React, { useState } from "react";
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

import { editUserActivity } from "../../redux/actions/usersActions";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditActivity(props: any) {
  const classes = useStyles();
  const {
    authUser,
    activity,
    activityKey,
    setEditing,
    setOpenSnackbar,
    setSnackbarMsg,
    id,
    editUserActivity,
    updateActivities,
  } = props;

  // Set default activity object
  const defaultActivity = {
    name: activity.name,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
    id: activity.id,
  };

  const [newActivity, setNewActivity] = useState(defaultActivity);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const handleSlider = (e: any) => {
    const duration = e.target.getAttribute("aria-valuenow");
    setNewActivity({ ...newActivity, duration: duration });
  };

  const isValid = newActivity.name === "";

  // Add the activity to firebase via the API made in this app
  const handleSubmit = (action: any) => {
    if (authUser) {
      editUserActivity(id, newActivity, activityKey);
      // const updatedActivities = 
      // setTimeout(function () {
      //   window.location.reload(false);
      //   updateActivities(updatedActivities)
      //   updateActivities()
      // }, 1000);

      setEditing(false);
      // Show alert and hide after 3sec
      setOpenSnackbar(true);
      setSnackbarMsg("Updated activity");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
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
          value={newActivity.name}
          label="Activity name"
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
            value={newActivity.type}
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
          defaultValue={parseInt(newActivity.duration)}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleSubmit("add")}
        disabled={isValid}
      >
        Save activity
      </Button>
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  userData: state.usersState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editUserActivity: (id: string, activities: any, activityKey: any) =>
    dispatch<any>(editUserActivity(id, activities, activityKey)),
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditActivity);
