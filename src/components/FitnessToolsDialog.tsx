import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
// import ExercisesContext from "../context/exercises-context";
// const context = React.useContext(ExercisesContext);
// React.useEffect(() => {
//   //@ts-ignore
//   setExercises(context.exercises);
// }, [context]);

const FitnessTools = [
  "Bosu",
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Medicine Ball",
  "Pull Up Bar",
  "Resistance Band",
];

interface FitnessToolsDialogProps {
  buttonTitle: string;
  title: string;
  startIcon: string;
  handleClickOpen: () => void;
  handleClickClose: () => void;
  open: boolean;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class FitnessToolsDialog extends React.Component<FitnessToolsDialogProps> {
  render() {
    const {
      title,
      buttonTitle,
      startIcon,
      handleClickOpen,
      handleClickClose,
      open,
    } = this.props;

    return (
      <div>
        <Button
          onClick={handleClickOpen}
          startIcon={startIcon && startIcon === "delete" ? <DeleteIcon /> : ""}
        >
          {buttonTitle}
        </Button>
        <Dialog
          fullScreen
          open={open} //open
          onClose={handleClickClose}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClickClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">Exercises in category</Typography>
              <Button autoFocus color="inherit" onClick={handleClickClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <div className="bp">
            {FitnessTools &&
              FitnessTools.map((prop: any, key: number) => (
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={prop} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ))}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default FitnessToolsDialog;
