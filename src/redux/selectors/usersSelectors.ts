import { createSelector } from "reselect";
import moment from "moment";
const selectUser = (state: any) => state.usersState;

var today = new Date();
var dd = String(today.getDate()).padStart(2);
var mm = String(today.getMonth()).padStart(2, "0");
var yyyy = today.getFullYear();
const todaysDate = dd + "-" + mm + "-" + yyyy;

// const getDaysInMonth = (month:any, year:any) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)
// console.log(getDaysInMonth(10, 2020))

var startOfWeek = moment().startOf("isoWeek");
var endOfWeek = moment().endOf("isoWeek");
var days: any = [];
var day = startOfWeek;
while (day <= endOfWeek) {
  days.push(day.toDate());
  day = day.clone().add(1, "d");
}
let TheWeekDays = days.map(function (num: any) {
  let day = num.getDate();
  let dd;
  if (day >= 10) {
    dd = day;
  } else {
    dd = `0${day}`;
  }
  let month = num.getMonth() + 1;
  let year = num.getFullYear();
  return year + "-" + month + "-" + dd;
});
export const selectUsers = createSelector([selectUser], (usersState) =>
  usersState ? usersState.users : ""
);
export const selectUserActivities = createSelector([selectUser], (usersState) =>
  usersState.users ? usersState.users.activities : ""
);
export const selectUserActivitiesThisMWeek = createSelector(
  [selectUser],
  (usersState) => {
    if (usersState.users && usersState.users.activities) {
      const act = usersState.users.activities;
      var result = act.filter(function (ac: any) {
        return TheWeekDays.some(function (weekday: any) {
          return ac.actualDate === weekday;
        });
      });
    }
    return usersState.users && result ? result.length : "";
  }
);
export const selectUserActivitiesThisMonth = createSelector(
  [selectUser],
  (usersState) =>
    usersState.users && usersState.users.activities
      ? usersState.users.activities.length
      : ""
);
export const selectTodayActivity = createSelector(
  [selectUsers],
  (usersState) => {
    const todaysAct =
      usersState && usersState.activities
        ? usersState.activities.find((activity: any) => {
            return (
              activity.date.replace(/ /g, "") === todaysDate.replace(/ /g, "")
            );
          })
        : "";
    return todaysAct;
  }
);
