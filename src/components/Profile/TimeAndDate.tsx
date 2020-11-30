import React from "react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
import ReactDOM from "react-dom";

export default function TimeAndDate() {
  function date() {
    const element = <span>{new Date().toLocaleDateString()}</span>;
    ReactDOM.render(element, document.getElementById("date"));
  }
  function time() {
    const element = <span>{new Date().toLocaleTimeString()}</span>;
    ReactDOM.render(element, document.getElementById("time"));
  }
  setInterval(date, 1000);
  setInterval(time, 1000);
  return (
    <div>
      <span>
        <ScheduleIcon style={{ color: "#5b5cc3" }} />
        <Typography
          id="time"
          component="h5"
          variant="h5"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.2",
            marginBottom: "0.4rem",
          }}
        ></Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          id="date"
        ></Typography>
      </span>
    </div>
  );
}
