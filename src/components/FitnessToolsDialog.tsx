import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
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
import AddIcon from "@material-ui/icons/Add";
import {
  addFitnessTool,
  removeFitnessTool,
  getFitnessTools,
} from "../redux/actions";
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
  fitnessToolsState?: any;
  addFitnessTool?: (name: string) => void;
  removeFitnessTool?: (id: string, name: string) => void;
  getFitnessTools?: () => void;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class FitnessToolsDialog extends React.Component<FitnessToolsDialogProps> {
  state = {
    rerendered: false,
  };
  componentDidMount() {
    if (this.props.getFitnessTools !== undefined) {
      this.props.getFitnessTools();
    }
  }
  render() {
    const {
      buttonTitle,
      startIcon,
      handleClickOpen,
      handleClickClose,
      addFitnessTool,
      removeFitnessTool,
      fitnessToolsState,
      open,
    } = this.props;

    const state = fitnessToolsState.fitnessToolsState;

    //find the id of existing state object and send to removefitnesstool
    const removeFitnessToolHandler = (name: string) => {
      const toolObj = state.filter(function (item: any) {
        return item.name === name;
      });
      const id = toolObj[0].id;
      this.setState({ rerendered: true });
      this.forceUpdate(); //fix bug with reload
      if (removeFitnessTool) {
        removeFitnessTool(id, name);
      }
    };
    return (
      <div>
        <Button
          onClick={handleClickOpen}
          startIcon={
            startIcon && startIcon === "delete" ? <DeleteIcon /> : <AddIcon />
          }
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
            <Toolbar style={{ backgroundColor: "#2e2f52" }}>
              <IconButton
                edge="start"
                color="secondary"
                onClick={handleClickClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
                Exercises in category
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClickClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <div className="bp">
            {FitnessTools &&
              FitnessTools.map((prop: any, key: number) => (
                <List key={key}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={prop} />
                    <ListItemSecondaryAction>
                      {state.some((tool: any) => tool.name === prop) ? (
                        <IconButton edge="end" aria-label="delete">
                          <span onClick={() => removeFitnessToolHandler(prop)}>
                            <DeleteIcon />
                          </span>
                        </IconButton>
                      ) : (
                        <IconButton edge="end" aria-label="add">
                          <span
                            onClick={() =>
                              addFitnessTool && addFitnessTool(prop)
                            }
                          >
                            <GetAppIcon />
                          </span>
                        </IconButton>
                      )}
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

const mapStateToProps = (state: any) => ({
  fitnessToolsState: state.fitnessToolsState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addFitnessTool: (name: string) => dispatch<any>(addFitnessTool(name)),
  removeFitnessTool: (id: string, name: string) =>
    dispatch<any>(removeFitnessTool(id, name)),
  getFitnessTools: () => dispatch<any>(getFitnessTools()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FitnessToolsDialog);
