import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import ProfileSettingItem from "./ProfileSettingItem";
import "./Profile.css";

const settingsItems = [
  "Edit Profile",
  // "Reminders",
  // "Integrations",
  // "About CoachMe",
];
class ProfileAnimateIn extends Component {
  render() {
    return (
      <div
        className="page-container page"
        style={{ height: "100vh", background: "#33345d", padding: "1rem" }}
      >
        <div className="backBtn">
          <Link
            to="/profile"
            className="backLink"
            style={{ paddingLeft: "10px" }}
          >
            <ArrowBackIcon />
          </Link>
          <Typography variant="h6">Settings</Typography>
        </div>
        <div style={{ paddingTop: "2rem" }}>
          <List>
            {settingsItems &&
              settingsItems.map((prop: any, key: number) => (
                <ProfileSettingItem key={key} text={prop} />
              ))}
          </List>
        </div>
      </div>
    );
  }
}

export default ProfileAnimateIn;
