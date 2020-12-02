import React from "react";
// import ExerciseForm from "./ExerciseForm";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addWorkout } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const AddWorkout = (props: any) => {
  const handleClick = () => {
    history.goBack();
  };
  let history = useHistory();

  return (
    <div className="bp">
      <div className="page-header">
        <div className="content-container">
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Button
              style={{ marginRight: "10px", paddingLeft: "0", color: "#fff" }}
              color="primary"
              onClick={handleClick}
            >
              <ArrowBackIcon />
            </Button>
            <h1 className="page-header__title">Add Workout</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        {/* <ExerciseForm
          action="add"
          onSubmit={(exercise: any) => {
            props.addWorkout(exercise);
            history.push("/");
          }}
        /> */}
      </div>
    </div>
  );
};
export interface Workout {
  id?: string;
  title: string;
  imageUrl: string;
  description: string;
  routeName: string;
  level: string;
  category: string;
  equipment: [];
  items: [];
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWorkout: (exercise: Workout) => dispatch<any>(addWorkout(exercise)),
});
export default connect(null, mapDispatchToProps)(AddWorkout);
