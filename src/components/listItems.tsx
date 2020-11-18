import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardExerciseCategories from "./DashboardExerciseCategories";
import WorkoutsOverview from "./Workouts/WorkoutsOverview";
import Profile from "./Profile/Profile";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import firebase from "../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
var routes = [
  {
    path: "/exercisecategories",
    name: "Exercises",
    icon: { PeopleIcon },
    component: DashboardExerciseCategories,
  },
  {
    path: "/workoutpage",
    name: "Workouts",
    icon: { PeopleIcon },
    component: WorkoutsOverview,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: { PeopleIcon },
    component: Profile,
  },
]; //workoutpage

const createLinks = (routes: any) => {
  return routes.map((prop: any, key: any) => {
    return (
      <ListItem key={key} button component={NavLink} to={prop.path}>
        <ListItemIcon>
          <ArrowForwardIosIcon />
        </ListItemIcon>
        <ListItemText primary={prop.name} />
      </ListItem>
    );
  });
};
export const mainListItems = <div>{createLinks(routes)}</div>;

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Public links</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="About this app" />
    </ListItem>
  </div>
);

export const adminListItems = (
  <>
    <ListItem>
      <ListItemIcon></ListItemIcon>
      <ListItemText primary="Hi admin!" />
    </ListItem>
    <ListItem button component={NavLink} to="/addexercise">
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Exercise" />
    </ListItem>
  </>
);

export const logoutListItems = (
  <div>
    <ListItem button onClick={() => firebase.logout()}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

export const loginListItems = (
  <div>
    <ListItem button component={NavLink} to="/login">
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
  </div>
);
