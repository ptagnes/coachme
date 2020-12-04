import React from "react";
import { useLocation } from "react-router-dom";
import AddActivity from "../AddActivity";
import EditActivity from "../EditActivity";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

function WorkoutTrackerEdit() {
  const location = useLocation();
  let history = useHistory();
  //@ts-ignore
  const { action, actualDate, date, activity } = location.state;
  //@ts-ignore
  const { id } = location.state;
  const activityKey = activity[0] ? activity[0].id : "";
  const handleClick = () => {
    history.goBack();
  };
  return (
    <div className="bp">
      <Button
        style={{ marginRight: "10px", paddingLeft: "0", color: "#fff" }}
        color="primary"
        onClick={handleClick}
      >
        <ArrowBackIcon />
      </Button>

      {action === "edit" ? (
        <>
          <h3>Edit activity on {activity[0].actualDate}</h3>
          <EditActivity
            activity={activity[0]}
            activityKey={activityKey}
            activities={activity}
            selectedDay={date}
            actualDate={actualDate}
            id={id}
          />
        </>
      ) : (
        <>
          <h3>Add activity on {actualDate}</h3>
          <AddActivity
            selectedDay={date}
            queryDate={date}
            actualDate={actualDate}
          />
        </>
      )}
    </div>
  );
}

export default WorkoutTrackerEdit;
