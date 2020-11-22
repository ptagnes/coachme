import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AuthContext } from "../../firebase/Authentication";
import { editUser } from "../../redux/actions/usersActions";

function ProfileSettingItemToEdit({
  editUser,
  itemToEdit,
  itemType,
  placeholderText,
}: {
  editUser: (id: string, updates: any) => void;
  itemToEdit: string;
  itemType: string;
  placeholderText: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const id = currentUser.uid;
  const [update, setUpdate] = React.useState<{}>();
  //title: props.exercise ? props.exercise.title : "",
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!update) {
      setError("Please fill in required field");
    } else {
      console.log("update from onSubmit----------------");
      console.log(update);
      setError("");
      editUser(id, update);
      setOpen(false);
    }
  };
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

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit {itemToEdit}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
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
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editUser: (id: string, updates: any) => dispatch<any>(editUser(id, updates)),
});
export default connect(null, mapDispatchToProps)(ProfileSettingItemToEdit);
