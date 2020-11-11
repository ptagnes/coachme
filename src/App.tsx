import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import clsx from "clsx";
import useAuth from "./Auth/useAuth";
import firebase from "./firebase";
import UserProvider from "./firebase/UserProvider";
import ExercisesProvider from "./firebase/ExercisesProvider";
import ExercisesContext from "./context/exercises-context";
import exercisesReducer from "./context/reducers/exercisesReducer";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightGreen from "@material-ui/core/colors/lightGreen";
// import Dashboard_Context from "./components/Dashboard_Context";
// import Dashboard_API from "./components/Dashboard_API";
import DashboardExercises from "./components/DashboardExercises";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditExercise from "./components/Exercises/EditExercise";
import AddExercise from "./components/Exercises/AddExercise";
import { mainListItems, secondaryListItems } from "./components/listItems";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
    padding: "20px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.up("md")]: {
      padding: "20px",
    },
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
      // light: lightGreen[300],
      main: "#af00ff",
      // dark: lightGreen[700],
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
  console.log(user);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
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
                        Persistent drawer
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
                      {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text, index) => (
                          <ListItem button key={text}>
                            <ListItemIcon>
                              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItem>
                        )
                      )}
                    </List>
                    <Divider />
                    <List>
                      {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))}
                    </List>
                  </Drawer>
                  <main
                    className={clsx(classes.content, {
                      [classes.contentShift]: open,
                    })}
                  >
                    <div className={classes.drawerHeader} />
                    <Switch>
                      <Route
                        path="/"
                        component={DashboardExercises}
                        exact={true}
                      />
                      <Route
                        path="/editexercise/:id"
                        component={EditExercise}
                      />
                      <Route path="/addexercise" component={AddExercise} />
                      {/* <Route path="/help" component={DashboardExercises} />
              <Route component={DashboardExercises} /> */}
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
