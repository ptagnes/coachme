import React from "react";
import loader from "./loader.gif";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { editUserActivity } from "../../redux/actions/usersActions";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";

function ActivityList(props: any) {
  const {
    loading,
    activities,
    editActivity,
    setOpenSnackbar,
    setSnackbarMsg,
    setEditing,
    id,
    editUserActivity,
  } = props;
  const deleteActivity = (activity: any) => {
    const activityKey = activity.id;
    const emptyActivity = {
      date: null,
    };
    editUserActivity(id, emptyActivity, activityKey);
    // window.location.reload(false);
    setTimeout(function(){ window.location.reload(false); }, 1000);

    setOpenSnackbar(true);
    setSnackbarMsg("Deleted activity");
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3000);
    // stop editing
    setEditing(false);
  };
  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : ""}

      {activities === "not set" || activities === null ? (
        <p>No activities added yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(activities).map((activity: any, i) => {
                let { name, type, duration } = activity;
                switch (activity.type) {
                  case 1:
                    type = "Lifting weights";
                    break;
                  case 2:
                    type = "Cardio";
                    break;
                  case 3:
                    type = "Weights & Cardio";
                    break;
                  default:
                    type = "Not set";
                }
                return (
                  <TableRow key={i}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell>
                      <DeleteIcon onClick={(e) => deleteActivity(activity)} />
                      <EditIcon
                        onClick={(e: any) => editActivity(activity)}
                        style={{ marginLeft: "20px" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  userData: state.usersState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editUserActivity: (id: string, activities: any, activityKey: any) =>
    dispatch<any>(editUserActivity(id, activities, activityKey)),
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
