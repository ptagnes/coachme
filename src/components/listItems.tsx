import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Accessibility from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardExerciseCategories from "./DashboardExerciseCategories";
import AddExercise from "./Exercises/AddExercise";
import Workouts from "./Workouts/Workouts";
import Profile from "./Profile/Profile";
var routes = [
  {
    path: "/exercisecategories",
    name: "ExerciseCategories",
    icon: { PeopleIcon },
    component: DashboardExerciseCategories,
  },
  {
    path: "/addexercise",
    name: "Add exercise",
    icon: { Accessibility },
    component: AddExercise,
  },
  {
    path: "/workouts",
    name: "Workouts",
    icon: { PeopleIcon },
    component: Workouts,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: { PeopleIcon },
    component: Profile,
  },
];

const createLinks = (routes: any) => {
  return routes.map((prop: any, key: any) => {
    return (
      <ListItem key={key} button component={NavLink} to={prop.path}>
        <ListItemIcon>
          <DashboardIcon />
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
      <ListItemText primary="Lorem ipsum" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Public workouts" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="About this app" />
    </ListItem>
  </div>
);
