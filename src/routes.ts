import DashboardIcon from "@material-ui/icons/Dashboard";
// import LayersIcon from "@material-ui/icons/Layers";
// import PeopleIcon from "@material-ui/icons/People";
import DashboardExercises from "./components/DashboardExercises";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: { DashboardIcon },
    component: DashboardExercises,
    layout: "/index",
  },
  // {
  //   path: "/redux",
  //   name: "Redux",
  //   icon: { LayersIcon },
  //   component: Dashboard_Redux,
  //   layout: "/redux",
  // },
  // {
  //   path: "/api",
  //   name: "Dashboard with api.get",
  //   icon: { PeopleIcon },
  //   component: Dashboard_API,
  //   layout: "/api",
  // },
];
export default routes;
