import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";
import { AuthContext } from "../../firebase/Authentication";
import { addUserActivity } from "../../redux/actions/usersActions";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";
import { useLocation } from "react-router-dom";

function Calendar(props: any) {
  const { userData, fetchUserStartAsync } = props;
  const location = useLocation();
  const params = location.state;
  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };
  /*** HOOKS ***/
  const [dateObject, setdateObject] = useState(moment());
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);
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
  };
  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const currentDay = () => dateObject.format("D");
  const actualMonth = () => moment().format("MMMM");
  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");
  /*** ADDING NOTIFICATIONS ***/
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  /*** ACTIVITY LIST ***/
  const [activities, setActivities] = useState<{}[]>([]);
  const [activeDays, setActiveDays] = useState([]);
  const { currentUser } = React.useContext(AuthContext);
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    setUid(currentUser.uid);
    fetchUserStartAsync(currentUser.uid);
  }, []); //fetchUserStartAsync

  useEffect(() => {
    if (userData.users) {
      if (userData.activities) {
        setActivities(userData.activities);
        retrieveActiveDays(userData.activities);
        //TODO clear params if no action was done
        //@ts-ignore
        const action = params ? params.action : "";
        if (action) {
          setNotifications(action);
        }
      }
    }
  }, [userData, params]);

  const retrieveActiveDays = (activities: any) => {
    const arr = activities.map((obj: any) => {
      return obj.date.length === 9
        ? obj.date.slice(0, 4)
        : obj.date.slice(0, 5);
    });
    setActiveDays(arr);
  };
  //TODO set setOpenSnackbar open and setSnackbarMsg
  const setNotifications = (action: any) => {
    let msg: string = "";
    switch (action) {
      case "added":
        msg = "Added activity.";
        break;
      case "edited":
        msg = "Updated activity.";
        break;
      case "deleted":
        msg = "Deleted activity.";
        break;
      default:
        msg = "Updated activity.";
    }
    setOpenSnackbar(true);
    setSnackbarMsg(msg);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 2000);
  };
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });

  return (
    <div className="calendarWrapper">
      <Grid container className="calendarGrid">
        <Grid item xs={12} md={12} lg={12}>
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
            weekdays={moment.weekdays(true)} //moment.weekdays(true)
            activeDays={activeDays}
            activities={activities}
            id={uid}
          />
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
    </div>
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
