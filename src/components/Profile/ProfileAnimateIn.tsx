import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";

const settingsItems = [
  "Edit Profile",
  "Reminders",
  "Integrations",
  "About CoachMe",
];
class ProfileAnimateIn extends Component {
  render() {
    return (
      <div
        className="page-container page"
        style={{ height: "100vh", background: "#424242", padding: "2rem 1rem" }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Link to="/profile" style={{ color: "#fff", padding: "0 2rem 0 0" }}>
            <ArrowBackIcon />
          </Link>
          <Typography variant="h6">Settings</Typography>
        </div>
        <div style={{ paddingTop: "2rem" }}>
          <List>
            {settingsItems &&
              settingsItems.map((prop: any, key: number) => (
                <>
                  <ListItem
                    key={key}
                    onClick={() => console.log("item clicked")}
                    style={{ cursor: "pointer" }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <EditIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={prop} />
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </div>
      </div>
    );
  }
}

export default ProfileAnimateIn;
//background: #575757;
