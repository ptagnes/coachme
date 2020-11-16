import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import "./Profile.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProfileSettingItemToEdit from "./ProfileSettingItemToEdit";

export default function ProfileSettingsItem({ text }: { text: string }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ListItem onClick={handleClickOpen} style={{ cursor: "pointer" }}>
        <ListItemAvatar>
          <Avatar>
            <EditIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={text} />
      </ListItem>
      <Divider />

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="dialogTitle"
      >
        <DialogTitle id="dialogTitle">
          <span className="backBtn">
            <span className="backLink" onClick={handleClose}>
              <ArrowBackIcon />
            </span>
            {"Edit Profile"}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Gender" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Birthday" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Units" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Height" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Weight" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Goal" />
            </ListItem>
            <Divider />
          </List>
          <ProfileSettingItemToEdit />
        </DialogContent>
      </Dialog>
    </>
  );
}
