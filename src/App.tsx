import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import clsx from "clsx";
import useAuth from "./Auth/useAuth";
import firebase from "./firebase";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./firebase/Authentication";
import ExercisesProvider from "./firebase/ExercisesProvider";
import ExercisesContext from "./context/exercises-context";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import DashboardExercises from "./components/DashboardExercises";
import DashboardExerciseCategories from "./components/DashboardExerciseCategories";
import Workouts from "./components/Workouts/Workouts";
import Workout from "./components/Workouts/Workout";
import WorkoutCategories from "./components/Workouts/WorkoutCategories";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Forgot from "./components/Auth/Forgot";
import Profile from "./components/Profile/Profile";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBarNav from "./components/AppBar/AppBarNav";
import EditExercise from "./components/Exercises/EditExercise";
import ExerciseDetail from "./components/Exercises/ExerciseDetail";
import AddExercise from "./components/Exercises/AddExercise";
import { mainListItems, secondaryListItems } from "./components/listItems";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { NavLink, Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ViewListIcon from "@material-ui/icons/ViewList";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListSubheader from "@material-ui/core/ListSubheader";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  bottomnav: {
    position: "fixed",
    bottom: "0",
    width: "100%",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    // [theme.breakpoints.up("md")]: {
    //   padding: "20px",
    // },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
// const muiTheme = getMuiTheme(DarkBaseTheme);
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#af00ff",
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
    },
    type: "dark",
  },
});
const exerciseListRef = firebase
  .firebaseDb()
  .collection("exerciselist")
  .orderBy("createdAt", "desc");

function App() {
  const [exercises, setExercises] = React.useState<{}[]>();
  const user = useAuth();
  const fetchData = async () => {
    exerciseListRef.onSnapshot((snapshot: any) => {
      const payload = snapshot.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() };
      });
      setExercises(payload);
    });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const FitnessTools = [
    "Bosu",
    "Barbell",
    "Dumbbell",
    "Kettlebell",
    "Medicine Ball",
    "Pull Up Bar",
    "Resistance Band",
  ];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const FirebaseContext = React.createContext<any | null>(null);
  let admin: boolean = false;
  if (user) {
    //@ts-ignore
    admin = user.uid === "2xT2T9CqfjgU5TQGn06VL920Tkp2";
  }
  const AppBarWithRouter = withRouter(({ location }) => (
    <AppBarNav
      location={location}
      handleDrawerOpen={handleDrawerOpen}
      isOpen={open}
    />
  ));
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExercisesProvider>
          <ExercisesContext.Provider value={{ exercises, FitnessTools }}>
            <FirebaseContext.Provider value={{ user, firebase }}>
              <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                  <CssBaseline />
                  <AppBarWithRouter />
                  <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                  >
                    <div className={classes.drawerHeader}>
                      <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                          <ChevronLeftIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </IconButton>
                    </div>
                    <Divider />

                    <List>{secondaryListItems}</List>
                    <Divider />
                    {admin && (
                      <>
                        <ListSubheader inset>Admin links</ListSubheader>
                        <List>
                          <ListItem>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Hi admin!" />
                          </ListItem>
                        </List>
                        <Divider />
                        <List>
                          <ListItem
                            button
                            component={NavLink}
                            to="/addexercise"
                          >
                            <ListItemIcon>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Exercise" />
                          </ListItem>
                        </List>
                      </>
                    )}
                    <Divider />
                    {user ? (
                      <>
                        <ListSubheader inset>User links</ListSubheader>
                        <List>{mainListItems}</List>
                        <Divider />
                        <List>
                          <ListItem button onClick={() => firebase.logout()}>
                            <ListItemIcon>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                          </ListItem>
                        </List>
                      </>
                    ) : (
                      <List>
                        <ListItem button component={NavLink} to="/login">
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary="Login" />
                        </ListItem>
                      </List>
                    )}

                    <Divider />
                  </Drawer>
                  <main
                    className={clsx(classes.content, {
                      [classes.contentShift]: open,
                    })}
                  >
                    {/* <div className={classes.drawerHeader} /> */}
                    <Switch>
                      <PrivateRoute
                        exact
                        path="/"
                        component={DashboardExercises}
                      />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <Route exact path="/forgot" component={Forgot} />
                      <Route
                        path="/exercisecategories"
                        component={DashboardExerciseCategories}
                        exact={true}
                      />
                      <Route
                        path="/workouts"
                        component={Workouts}
                        exact={true}
                      />
                      <Route
                        path="/workoutcategories"
                        component={WorkoutCategories}
                        exact={true}
                      />
                      <Route path="/workout" component={Workout} exact={true} />
                      <Route path="/profile" component={Profile} />
                      <Route
                        path="/editexercise/:id"
                        component={EditExercise}
                      />
                      <Route
                        path="/exercisedetail/:id"
                        component={ExerciseDetail}
                      />
                      <Route path="/addexercise" component={AddExercise} />
                    </Switch>

                    <BottomNavigation className={classes.bottomnav}>
                      <BottomNavigationAction
                        component={Link}
                        to="/signal"
                        label="Another"
                        icon={<RestoreIcon />}
                      />
                      <BottomNavigationAction
                        component={Link}
                        to="/lkj"
                        label="Something"
                        icon={<FavoriteIcon />}
                      />
                      <BottomNavigationAction
                        component={Link}
                        to="/workouts"
                        label="Workouts"
                        icon={<ViewListIcon />}
                      />
                      <BottomNavigationAction
                        component={Link}
                        to="/profile"
                        label="Profile"
                        icon={<AccountCircleIcon />}
                      />
                    </BottomNavigation>
                  </main>
                </div>
              </MuiThemeProvider>
            </FirebaseContext.Provider>
          </ExercisesContext.Provider>
        </ExercisesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
