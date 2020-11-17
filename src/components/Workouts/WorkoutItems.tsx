import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Exercise from "../Exercises/Exercise";

const WorkoutItems = ({ item }: { item: any }) => {
  const { title, exerciseitems } = item;
  console.log("item from workoutitem");
  console.log(exerciseitems);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"exercise items"}
        </DialogTitle>
        <DialogContent>
          <div onClick={handleClose}>Go back</div>
          <DialogContentText>This is the routine description</DialogContentText>
          {exerciseitems.map((item: any) => (
            <Exercise
              key={item.id}
              id={item.id}
              title={item.name}
              image={item.imageUrl}
            />
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutItems;
