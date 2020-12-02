import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: "#af00ff",
      backgroundColor: "#75757512",
    },
    editVal: {
      marginLeft: "2rem",
    },
    listItem: {
      paddingLeft: "0",
      cursor: "pointer",
    },
  })
);
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
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (currentUser) {
      fetchUserStartAsync(currentUser.uid);
    }
  }, [currentUser, fetchUserStartAsync]);

  const { users } = userData;

  return (
    <>
      <ListItem onClick={handleClickOpen} className={classes.listItem}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
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
          <DialogContentText>Update your settings bellow.</DialogContentText>
          <List>
            <ListItem className={classes.listItem}>
              <ProfileSettingItemToEdit
                itemToEdit="displayName"
                itemType="text"
                placeholderText="Update display name"
              />
              {users && (
                <span className={classes.editVal}>{users.displayName}</span>
              )}
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <ProfileSettingItemToEdit
                itemToEdit="gender"
                itemType="radio"
                placeholderText="Update gender"
              />
              {users && users.gender}
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <ProfileSettingItemToEdit
                itemToEdit="birthday"
                itemType="timePicker"
                placeholderText="Update birthday"
              />
              {users && users.birthday}
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <ProfileSettingItemToEdit
                itemToEdit="height"
                itemType="text"
                placeholderText="Update height"
              />
              {users && users.height}
              <span>cm</span>
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <ProfileSettingItemToEdit
                itemToEdit="weight"
                itemType="text"
                placeholderText="Update weight"
              />
              {users && users.weight}
              <span>kg</span>
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <ProfileSettingItemToEdit
                itemToEdit="goal"
                itemType="radio"
                placeholderText={users && users.goal}
              />
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
