import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { BrowserRouter as Router } from "react-router-dom";
import ProfileAction from "../Profile/ProfileAction";
import ProfileSettings from "../Profile/ProfileSettings";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#292b4f",
    boxShadow: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarTools: {
    marginLeft: "auto",
    justifyContent: "space-between",
    display: "flex",
  },
  transparentBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
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
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
}));
function AppBarNav({
  location,
  handleDrawerOpen,
  isOpen,
}: {
  location: any;
  handleDrawerOpen: () => void;
  isOpen: boolean;
}) {
  const classes = useStyles();
  const handleDrawerOpenAppBar = () => {
    handleDrawerOpen();
  };
  const [transparent, setTransparent] = React.useState(false);
  const route = location.pathname;
  React.useEffect(() => {
    if (route === "/profile") {
      setTransparent(true);
    } else {
      setTransparent(false);
    }
  }, [route]);
  const getHeaderext = () => {
    switch (route) {
      case "/":
        return "Welcome!";
      case "/profile":
        return "CoachMe";
      case "/exercisecategories":
        return "CoachMe";
      default:
        return "CoachMe";
    }
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen,
        [classes.transparentBar]: transparent,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpenAppBar()}
          edge="start"
          className={clsx(classes.menuButton, isOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          <Link
            to={`/`}
            style={{
              color: "#fff",
              lineHeight: 1,
              textDecoration: "none",
              fontFamily: "Lobster",
              fontSize: "2rem",
            }}
          >
            {getHeaderext()}
          </Link>
        </Typography>
        {route === "/exercisecategories" && (
          <div className={classes.appBarTools}>
            <SearchIcon style={{ width: "50px", cursor: "pointer" }} />
            <FilterListIcon style={{ width: "50px", cursor: "pointer" }} />
          </div>
        )}
        {route === "/profile" && (
          <div className={classes.appBarTools}>
            <Router>
              <ProfileAction />
              <ProfileSettings />
            </Router>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarNav;
