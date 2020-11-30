import React, { useState, useEffect } from "react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";

export default function TimeAndDate() {
  const [time, setTime] = useState<any>();
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        >
          {new Date().toLocaleTimeString()}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" id="date">
          {new Date().toLocaleDateString()}
        </Typography>
      </span>
    </div>
  );
}
