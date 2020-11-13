import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
interface AlertDialogProps {
  buttonTitle: string;
  title: string;
  startIcon: string;
  confirmFunction: () => void;
}
class AlertDialog extends React.Component<AlertDialogProps> {
  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleAgree = () => {
    this.handleClose();
    this.props.confirmFunction();
  };
  handleDisagree = () => {
    this.handleClose();
  };
  render() {
    const { title, buttonTitle, startIcon } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          startIcon={startIcon && startIcon === "delete" ? <DeleteIcon /> : ""}
        >
          {buttonTitle}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDisagree} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
