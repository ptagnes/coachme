import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import clsx from "clsx";
import useAuth from "./Auth/useAuth";
import firebase from "./firebase";
import UserProvider from "./firebase/UserProvider";
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
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import EditExercise from "./components/Exercises/EditExercise";
import ExerciseDetail from "./components/Exercises/ExerciseDetail";
import AddExercise from "./components/Exercises/AddExercise";
// import { mainListItems, secondaryListItems } from "./components/listItems";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { NavLink, Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  const [isUser, setIsUser] = React.useState<object>();
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
    if (user) {
      setIsUser(user);
    }
    fetchData();
  }, [user]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const FirebaseContext = React.createContext<any | null>(null);
  return (
    <BrowserRouter>
      <UserProvider>
        <ExercisesProvider>
          <ExercisesContext.Provider value={{ exercises }}>
            <FirebaseContext.Provider value={{ user, firebase }}>
              <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                  <CssBaseline />
                  <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                      [classes.appBarShift]: open,
                    })}
                  >
                    <Toolbar>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                          classes.menuButton,
                          open && classes.hide
                        )}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" noWrap>
                        <Link to={`/`} style={{ color: "#fff", lineHeight: 1 }}>
                          CoachMe
                        </Link>
                      </Typography>
                    </Toolbar>
                  </AppBar>
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

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <NavLink
                          style={{ color: "white", textDecoration: "none" }}
                          to="/exercisecategories"
                        >
                          <ListItemText primary="Exercise categories" />
                        </NavLink>
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <NavLink
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/addexercise`}
                        >
                          <ListItemText primary="Add exercise" />
                        </NavLink>
                      </ListItem>
                    </List>
                    {/* <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List> */}
                  </Drawer>
                  <main
                    className={clsx(classes.content, {
                      [classes.contentShift]: open,
                    })}
                  >
                    {/* <div className={classes.drawerHeader} /> */}
                    <Switch>
                      <Route
                        path="/"
                        component={DashboardExercises}
                        exact={true}
                      />
                      <Route
                        path="/exercisecategories"
                        component={DashboardExerciseCategories}
                        exact={true}
                      />
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
                  </main>
                </div>
              </MuiThemeProvider>
            </FirebaseContext.Provider>
          </ExercisesContext.Provider>
        </ExercisesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
