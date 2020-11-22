import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// import { StoreState } from "../redux/reducers/index";
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
import { AuthContext } from "../../firebase/Authentication";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";

function ProfileSettingsItem({
  text,
  fetchUserStartAsync,
  userData,
}: {
  text: string;
  fetchUserStartAsync: (id: string) => void;
  userData: any;
}) {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    fetchUserStartAsync(currentUser.uid);
  }, []);

  const { users } = userData;
  console.log(users);
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
          <DialogContentText>Settings text...</DialogContentText>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" />
              <ProfileSettingItemToEdit
                itemToEdit="name"
                itemType="text"
                placeholderText="Update name"
              />
              {users && users.name}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Gender" />
              <ProfileSettingItemToEdit
                itemToEdit="gender"
                itemType="text"
                placeholderText="Update gender"
              />
              {users && users.gender}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Birthday" />
              {users && users.birthday}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Units" />
              {users && users.units}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Height" />
              <ProfileSettingItemToEdit
                itemToEdit="height"
                itemType="text"
                placeholderText="Update height"
              />
              {users && users.height}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Weight" />
              <ProfileSettingItemToEdit
                itemToEdit="weight"
                itemType="text"
                placeholderText={users && users.weight}
              />
              {users && users.weight}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Goal" />
              {users && users.goal}
            </ListItem>
            <Divider />
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  userData: state.usersState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettingsItem);
