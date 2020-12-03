import React from "react";
import "./calendar.css";
import nextId from "react-id-generator";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";

const CalendarBody = (props: any) => {
  const {
    firstDayOfMonth,
    daysInMonth,
    currentDay,
    currentMonth,
    currentMonthNum,
    selectedDay,
    activeDays,
    setSelectedDay,
    actualMonth,
    weekdays,
    activities,
    id,
  } = props;
  let history = useHistory();
  const handleClick = (d: any) => {
    setSelectedDay(d);
    const selectedDay = {
      day: d,
      month: currentMonthNum(),
    };
    let queryDate = `${selectedDay.day}-${selectedDay.month}-2020`; //${selectedDay.year}
    const filterByQueryDate = activities.filter(function (item: any) {
      return item.date === queryDate;
    });
    history.push({
      pathname: "/workouttrackeredit",
      state: {
        action: `${filterByQueryDate.length === 0 ? "add" : "edit"}`,
        date: queryDate,
        activity: filterByQueryDate,
        id: id,
      },
    });
  };
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<TableCell key={nextId()}>{""}</TableCell>);
  }
  let monthDays = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let currDay, selectDay, activeDay;
    // Check if day is today
    /* eslint eqeqeq: 0 */
    if (currentDay() == d && currentMonth() == actualMonth()) currDay = "today";
    // Check if day is selected day
    if (selectedDay.day == d && currentMonthNum() == selectedDay.month)
      selectDay = "selected-day";
    // Check if day found in this month active days
    let formattedDate = `${d}-${currentMonthNum()}`;
    if (activeDays.indexOf(formattedDate) !== -1) activeDay = "active"; //TODO check active
    monthDays.push(
      <TableCell
        key={d}
        className={`week-day ${currDay} ${selectDay}`}
        onClick={() => handleClick(d)}
      >
        <span className={activeDay}>{d}</span>
      </TableCell>
    );
  }
  if (firstDayOfMonth() == 0) {
    for (let i = 0; i < 7; i++) {
      blanks.push(<TableCell key={nextId()}>{""}</TableCell>);
    }
  }
  let totalSlots = [...blanks, ...monthDays];
  let rows: any[] = [];
  let cells: any[] = [];
  //1 was 0 (Sunday)
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 1) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });
  return (
    <TableContainer component={Paper}>
      <Table className="calendar">
        <TableHead>
          <TableRow>
            {weekdays.map((day: any, i: any) => (
              <TableCell key={i}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((day, i) => (
            <TableRow key={i}>{day}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CalendarBody;
