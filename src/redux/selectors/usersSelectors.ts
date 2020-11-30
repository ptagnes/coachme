import { createSelector } from "reselect";
const selectUser = (state: any) => state.usersState;

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth()).padStart(2, "0");
var yyyy = today.getFullYear();
const todaysDate = dd + "-" + mm + "-" + yyyy;

let curr = new Date 
let week:any = []
for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    // const newDay = '30' + "-" + "10" + "-" + yyyy
  week.push(day)
}
// console.log(week) //the days of the week

// const getDaysInMonth = (month:any, year:any) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)
// console.log(getDaysInMonth(10, 2020))

const thisWeek = ["30-10-2020", "1-11-2020", "2-11-2020", "3-11-2020", "4-11-2020", "5-11-2020", "6-11-2020"]
export const selectUsers = createSelector([selectUser], (usersState) =>
  usersState ? usersState.users : ""
);

export const selectUserActivities = createSelector([selectUser], (usersState) =>
  usersState.users ? usersState.users.activities : ""
);

export const selectUserActivitiesThisMWeek = createSelector([selectUser], (usersState) => {
    if (usersState.users && usersState.users.activities) {
        const act = usersState.users.activities;
        console.log(act)
        var result = act.filter(function (ac: any) {
            return thisWeek.some(function (weekday: any) {
                // let weekdayDate = new Date(weekday)
                // var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
                // var dt = new Date(ac.date.replace(pattern,'$3-$2-$1'));
                // console.log( dt.toISOString().slice(0, 10) )
                // console.log( weekdayDate.toISOString().slice(0, 10)  )
                // console.log(ac.date)
                // console.log(weekday)
                return ac.date === weekday;          
            });
        })
        console.log('result')
        console.log(result)
    }
    return (usersState.users && result) ? result.length : ""
});

export const selectUserActivitiesThisMonth = createSelector([selectUser], (usersState) =>
  (usersState.users && usersState.users.activities) ? usersState.users.activities.length : ""
);

export const selectTodayActivity = createSelector([selectUsers], (usersState) => {
    const todaysAct = (usersState && usersState.activities) ? usersState.activities.find((activity: any) => {
      return activity.date === todaysDate;
    }) : '';
    return (usersState && usersState.activities)
      ? usersState.activities.find(
          (activity: any) => activity.date === todaysDate
        )
      : null;
  });
