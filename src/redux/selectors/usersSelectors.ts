import { createSelector } from "reselect";
const selectUser = (state: any) => state.usersState;

var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth()).padStart(2, "0");
  var yyyy = today.getFullYear();
const todaysDate = dd + "-" + mm + "-" + yyyy;

let curr = new Date 
let week = []
for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}
// console.log(week) //the days of the week

// const getDaysInMonth = (month:any, year:any) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)
// console.log(getDaysInMonth(10, 2020))

export const selectUsers = createSelector([selectUser], (usersState) =>
  usersState ? usersState.users : ""
);

export const selectUserActivities = createSelector([selectUser], (usersState) =>
  usersState.users ? usersState.users.activities : ""
);

export const selectUserActivitiesThisMWeek = createSelector([selectUser], (usersState) =>
  usersState.users ? usersState.users.activities.length : ""
);

export const selectUserActivitiesThisMonth = createSelector([selectUser], (usersState) =>
  usersState.users ? usersState.users.activities.length : ""
);

export const selectTodayActivity = createSelector([selectUsers], (usersState) => {
    const todaysAct = usersState && usersState.activities.find((activity: any) => {
      return activity.date === todaysDate;
    });
    return usersState
      ? usersState.activities.find(
          (activity: any) => activity.date === todaysDate
        )
      : null;
  });
