import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";
import AddActivity from "../AddActivity";
import EditActivity from "../EditActivity";
import ActivityList from "../ActivityList";

import { AuthContext } from "../../firebase/Authentication";
import { addUserActivity } from "../../redux/actions/usersActions";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";

function Calendar(props: any) {
  const { userData, fetchUserStartAsync } = props;
  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };
  /*** HOOKS ***/
  const [dateObject, setdateObject] = useState(moment());
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);
  // Later add hook for active days from database
  /*** CALENDAR HEAD ***/
  const allMonths = moment.months();
  const currentMonth = () => dateObject.format("MMMM");
  const currentYear = () => dateObject.format("YYYY");
  const setMonth = (month: any) => {
    let monthNo = allMonths.indexOf(month);
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(dateObject).set("month", monthNo);
    setdateObject(newDateObject);
    setShowMonthTable(false);
  };
  const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);
  /*** CALENDAR BODY ***/
  const setSelectedDay = (day: any) => {
    setSelected({
      day,
      month: currentMonthNum(),
    });
    // Later refresh data
  };
  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const currentDay = () => dateObject.format("D");
  const actualMonth = () => moment().format("MMMM");
  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");
  /*** ADDING AN ACTIVITY ***/
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  /*** ACTIVITY LIST ***/
  const [activities, setActivities] = useState<{}[]>([]); //true
  const [loading, setLoading] = useState<boolean>(); //[]
  const [activeDays, setActiveDays] = useState([]);
  const { currentUser } = React.useContext(AuthContext);
  let queryDate = `${selectedDay.day}-${selectedDay.month}-2020`; //${selectedDay.year}
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid);
      fetchUserStartAsync(currentUser.uid);
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      const user = userData.users;
      if (user) {
        if (user.activities) {
          const ac = userData.users.activities;
          let activities = Array.isArray(ac) ? ac : [ac];
          const filterByQueryDate = activities.filter(function (item: any) {
            return item.date === queryDate;
          });
          setActivities(filterByQueryDate);
          setLoading(false);
          // setEditing(false); Add later
          // Update active days
          retrieveActiveDays(activities);
        }
      }
    }
  }, [currentUser, queryDate, userData]);

  const retrieveActiveDays = (activities: any) => {
    console.log("activities from retrieveActiveDays");
    console.log(activities);
    const arr = activities.map((obj: any) => {
      return obj.date.length === 8
        ? obj.date.slice(0, 3)
        : obj.date.slice(0, 4);
    });
    console.log(arr);
    setActiveDays(arr);
  };

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);
  const [activity, setActivity] = useState(null);
  const [activityKey, setActivityKey] = useState<string>();

  const editActivity = (activity: any, i: any) => {
    setActivityKey(Object.keys(activities)[i]);
    setEditing(true);
    setActivity(activity);
  };

  return (
    <Grid container spacing={0} style={{ paddingTop: "4rem" }}>
      <Grid item xs={12} md={8} lg={9}>
        <CalendarHead
          allMonths={allMonths}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setMonth={setMonth}
          showMonthTable={showMonthTable}
          toggleMonthSelect={toggleMonthSelect}
        />
        <CalendarBody
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentMonthNum={currentMonthNum}
          actualMonth={actualMonth}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          weekdays={moment.weekdays()}
          activeDays={activeDays}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className="paper">
          {editing ? (
            <>
              <h3>
                Edit activity on {selectedDay.day}-{selectedDay.month + 1}{" "}
              </h3>
              <EditActivity
                activity={activity}
                activityKey={activityKey}
                selectedDay={selectedDay}
                authUser={props.authUser}
                setEditing={setEditing}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
                id={uid}
              />
            </>
          ) : (
            <>
              <h3>
                Add activity on {selectedDay.day}-{selectedDay.month + 1}{" "}
              </h3>
              <AddActivity
                selectedDay={selectedDay}
                authUser={props.authUser}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={7} style={{ paddingBottom: "4rem" }}>
        <Paper className="paper">
          <h3>
            Activities on {selectedDay.day}-{selectedDay.month + 1}
          </h3>
          <ActivityList
            loading={loading}
            activities={activities}
            authUser={props.authUser}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMsg={setSnackbarMsg}
            editActivity={editActivity}
            setEditing={setEditing}
            id={uid}
          />
        </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        message={snackbarMsg}
      />
    </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
