import React, { useState, useContext } from "react";
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
  const {
    selectedDay,
    setOpenSnackbar,
    setSnackbarMsg,
    addUserActivity,
  } = props;
  const { currentUser } = useContext(AuthContext);
  let uid: string;
  if (currentUser) {
    uid = currentUser.uid;
  }
  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
  const defaultActivity = {
    name: "",
    type: 1,
    duration: 60,
    date: queryDate,
  };
  const [activity, setActivity] = useState(defaultActivity);
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
    setActivity({ ...activity, duration: duration });
  };
  const isValid = activity.name === "";
  const handleSubmit = () => {
    if (currentUser) {
      addUserActivity(uid, activity);
      setActivity(defaultActivity);
      setOpenSnackbar(true);
      setSnackbarMsg("Added activity");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 4000);
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
            <MenuItem value={2}>Running</MenuItem>
            <MenuItem value={3}>Cycling</MenuItem>
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
  //   fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddActivity);
