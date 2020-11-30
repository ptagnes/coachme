import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import Box from "@material-ui/core/Box";
import ProfileContentItem1 from "./ProfileContentItem1";
import EqualizerIcon from "@material-ui/icons/Equalizer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    minHeight: "50px",
    padding: "6px 10px 3px",
  },
}));

export default function ProfileContent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Workout stats"
            icon={<EqualizerIcon style={{ marginBottom: "0px" }} />}
            {...a11yProps(0)}
            className={classes.tabs}
          />
          <Tab
            label="Item Two"
            className={classes.tabs}
            icon={<FavoriteIcon style={{ marginBottom: "0px" }} />}
            {...a11yProps(1)}
          />
          <Tab
            label="Item Three"
            className={classes.tabs}
            icon={<PersonPinIcon style={{ marginBottom: "0px" }} />}
            {...a11yProps(2)}
          />
          <Tab
            label="Item Four"
            className={classes.tabs}
            icon={<HelpIcon style={{ marginBottom: "0px" }} />}
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProfileContentItem1 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileContentItem1 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </div>
  );
}
