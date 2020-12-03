import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import DashboardExerciseCategories from "./DashboardExerciseCategories";
import WorkoutsOverview from "./Workouts/WorkoutsOverview";
import Profile from "./Profile/Profile";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import firebase from "../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import WorkoutTracker from "./WorkoutTracker/WorkoutTracker";
import DashboardExercises from "./DashboardExercises";
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
  {
    path: "/workouttracker",
    name: "Workout Tracker",
    icon: { PeopleIcon },
    component: WorkoutTracker,
  },
  {
    path: "/exercisebank",
    name: "Exercise bank",
    icon: { PeopleIcon },
    component: DashboardExercises,
  },
];

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
    <ListItem button component={NavLink} to="/addworkout">
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Workout" />
    </ListItem>
    <ListItem button component={NavLink} to="/exercisebank">
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText primary="Exercise bank" />
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
