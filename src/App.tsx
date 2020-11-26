import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import clsx from "clsx";
import useAuth from "./Auth/useAuth";
import firebase from "./firebase";
import { AuthProvider } from "./firebase/Authentication";
import ExercisesProvider from "./firebase/ExercisesProvider";
import ExercisesContext from "./context/exercises-context";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import PrivateRoute from "./Auth/PrivateRoute";
import blueGrey from "@material-ui/core/colors/blueGrey";
import DashboardExercises from "./components/DashboardExercises";
import DashboardExerciseCategories from "./components/DashboardExerciseCategories";
import WorkoutSettings from "./components/Workouts/WorkoutSettings";
import WorkoutDetails from "./components/Workouts/WorkoutDetails";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Forgot from "./components/Auth/Forgot";
import Profile from "./components/Profile/Profile";
import ProfileSettings from "./components/Profile/ProfileSettings";
import ProfileAnimateIn from "./components/Profile/ProfileAnimateIn";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBarNav from "./components/AppBar/AppBarNav";
import EditExercise from "./components/Exercises/EditExercise";
import ExerciseDetail from "./components/Exercises/ExerciseDetail";
import AddExercise from "./components/Exercises/AddExercise";
import {
  mainListItems,
  adminListItems,
  logoutListItems,
  loginListItems,
} from "./components/listItems";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import EventIcon from '@material-ui/icons/Event';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ViewListIcon from "@material-ui/icons/ViewList";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListSubheader from "@material-ui/core/ListSubheader";
import WorkoutsOverview from "./components/Workouts/WorkoutsOverview";
import WorkoutPageCollection from "./components/Workouts/workoutPageCollection";
// import WorkoutsPage from "./components/Workouts/WorkoutsPage";
import WorkoutTracker from "./components/WorkoutTracker/WorkoutTracker";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#af00ff",
    },
    secondary: {
      light: blueGrey[300],
      // main: blueGrey[500],
      main: "#28294a",
      dark: blueGrey[700],
    },
    background: {
      paper: "#32335b",
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
  const [value, setValue] = React.useState("recents");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
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
                    {admin && (
                      <>
                        <Divider />
                        <ListSubheader inset>Admin links</ListSubheader>
                        <List>{adminListItems}</List>
                      </>
                    )}
                    <Divider />
                    {user ? (
                      <>
                        <ListSubheader inset>User links</ListSubheader>
                        <List>{mainListItems}</List>
                        <Divider />
                        <List>{logoutListItems}</List>
                      </>
                    ) : (
                      <List>{loginListItems}</List>
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
                        exact
                        path="/profile"
                        render={() =>
                          user ? <Profile /> : <Redirect to="/" />
                        }
                      />
                      <Route
                        exact
                        path="/profilesettings"
                        render={() =>
                          user ? <ProfileSettings /> : <Redirect to="/" />
                        }
                      />
                      <Route
                        exact
                        path="/workouttracker"
                        render={() =>
                          user ? <WorkoutTracker /> : <Redirect to="/" />
                        }
                      />
                      <Route
                        exact
                        path="/profiletoanimatein"
                        render={() =>
                          user ? <ProfileAnimateIn /> : <Redirect to="/" />
                        }
                      />
                      <Route
                        exact={true}
                        path="/exercisecategories"
                        render={() =>
                          user ? (
                            <DashboardExerciseCategories />
                          ) : (
                            <Redirect to="/" />
                          )
                        }
                      />
                      <Route
                        path="/exercisedetail/:id"
                        component={ExerciseDetail}
                      />
                      <Route
                        path="/workouttracker"
                        component={WorkoutTracker}
                      />
                      <Route
                        exact
                        path="/workoutpage"
                        render={() =>
                          user ? (
                            <WorkoutsOverview /> //WorkoutsPage
                          ) : (
                            <Redirect to="/" />
                          )
                        }
                      />
                      <Route
                        path="/workouts/:collectionId"
                        component={WorkoutPageCollection}
                      />
                      <Route
                        exact={true}
                        path="/workoutsettings/:route/:id"
                        component={WorkoutSettings}
                      />
                      <Route
                        exact={true}
                        path="/workoutdetails/:route/:id"
                        component={WorkoutDetails}
                      />
                      <Route
                        exakt
                        path="/addexercise"
                        render={() =>
                          admin ? <AddExercise /> : <Redirect to="/" />
                        }
                      />
                      {admin && (
                        <>
                          <Route
                            exakt
                            path="/editexercise/:id"
                            component={EditExercise}
                          />
                        </>
                      )}
                    </Switch>

                    {user ? (
                      <BottomNavigation
                        className={classes.bottomnav}
                        value={value}
                        onChange={handleChange}
                      >
                        <BottomNavigationAction
                          component={Link}
                          value="tracker"
                          to="/workouttracker"
                          label="Tracker"
                          icon={<EventIcon />}
                        />
                        <BottomNavigationAction
                          component={Link}
                          value="exercisecategories"
                          to="/exercisecategories"
                          label="Exercises"
                          icon={<FavoriteIcon />}
                        />
                        <BottomNavigationAction
                          component={Link}
                          value="workoutpage"
                          to="/workoutpage"
                          label="Workouts"
                          icon={<ViewListIcon />}
                        />
                        <BottomNavigationAction
                          component={Link}
                          value="profile"
                          to="/profile"
                          label="Profile"
                          icon={<AccountCircleIcon />}
                        />
                      </BottomNavigation>
                    ) : (
                      <div></div>
                    )}
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
