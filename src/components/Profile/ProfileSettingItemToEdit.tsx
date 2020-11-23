import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";

import { AuthContext } from "../../firebase/Authentication";
import { editUser } from "../../redux/actions/usersActions";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";

function ProfileSettingItemToEdit({
  editUser,
  itemToEdit,
  itemType,
  placeholderText,
  userData,
  fetchUserStartAsync,
}: {
  editUser: (id: string, updates: any) => void;
  itemToEdit: string;
  itemType: string;
  placeholderText: string;
  userData: any;
  fetchUserStartAsync: (id: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const id = currentUser.uid;
  const [update, setUpdate] = React.useState<{}>();
  const { users } = userData;
  const [value, setValue] = React.useState(users[itemToEdit]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!update) {
      setError("Please fill in required field or select value");
    } else {
      setError("");
      editUser(id, update);
      setOpen(false);
      fetchUserStartAsync(id);
    }
  };
  //text input
  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement | any
    >
  ) => {
    const {
      target: { name, value },
    } = e;
    setUpdate({
      [name]: value,
    });
  };
  //radio buttons or date picker
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setUpdate({
      [itemToEdit]: (event.target as HTMLInputElement).value,
    });
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar>
          <EditIcon style={{ cursor: "pointer" }} onClick={handleClickOpen} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={itemToEdit}
        onClick={handleClickOpen}
        style={{ cursor: "pointer", textTransform: "capitalize" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {itemType === "text" && (
          <form onSubmit={onSubmit}>
            <DialogContent>
              <DialogContentText>Edit: {itemToEdit}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                required
                label={placeholderText}
                id={itemToEdit}
                name={itemToEdit}
                type={itemType}
                onChange={handleOnChange}
                defaultValue={users[itemToEdit]}
              />
              {error && <p className="form__error">{error}</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        )}

        {itemType === "timePicker" && (
          <form noValidate>
            <DialogContent>
              <DialogContentText>Edit: {itemToEdit}</DialogContentText>
              <TextField
                onChange={handleChange}
                id="date"
                label="Birthday"
                type="date"
                defaultValue={users.birthday}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        )}

        {itemType === "radio" && (
          <>
            <DialogContent>
              <DialogContentText>Edit: {itemToEdit}</DialogContentText>
              <FormControl component="fieldset">
                {itemToEdit === "gender" && (
                  <>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </>
                )}
                {itemToEdit === "goal" && (
                  <>
                    <FormLabel component="legend">Goal</FormLabel>
                    <RadioGroup
                      aria-label="goal"
                      name="goal1"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Lose Weight"
                        control={<Radio />}
                        label="Lose Weight"
                      />
                      <FormControlLabel
                        value="Build muscles"
                        control={<Radio />}
                        label="Build muscles"
                      />
                      <FormControlLabel
                        value="Get fitter"
                        control={<Radio />}
                        label="Get fitter"
                      />
                    </RadioGroup>
                  </>
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary">
                Update
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  userData: state.usersState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editUser: (id: string, updates: any) => dispatch<any>(editUser(id, updates)),
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettingItemToEdit);
