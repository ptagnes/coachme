import React from "react";
import { useLocation } from "react-router-dom";
import AddActivity from "../AddActivity";
import EditActivity from "../EditActivity";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

function WorkoutTrackerEdit(props: any) {
  const location = useLocation();
  let history = useHistory();
  const params = location.state;
  console.log(params);
  //@ts-ignore
  const { action, date, activity } = location.state;
  //@ts-ignore
  const { id } = location.state;
  const activityKey = activity[0] ? activity[0].id : "";
  const handleClick = () => {
    history.goBack();
  };
  //TODO 1 update delay fix
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
          <h3>Edit activity on {date}</h3>
          <EditActivity
            activity={activity[0]}
            activityKey={activityKey}
            activities={activity}
            selectedDay={date}
            id={id}
          />
        </>
      ) : (
        <>
          <h3>Add activity on {date}</h3>
          <AddActivity selectedDay={date} queryDate={date} />
        </>
      )}
    </div>
  );
}

export default WorkoutTrackerEdit;
