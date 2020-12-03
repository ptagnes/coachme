import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import getExercisesAction from "../../redux/actions/getExercisesAction";
import { StoreState } from "../../redux/reducers/index";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import nextId from "react-id-generator";
// import "./WorkoutForm.css";
import ImageUpload from "../ImageUpload";
const exerciseList = [
  {
    title: "Bent over shoulder raise",
    fileUrl:
      "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/backr.jpg?alt=media&token=8e686f23-28f8-4f93-8d98-077ada5c6934",
    id: "0YmMGlICAeovYE7PnzpV",
  },
  {
    title: "Sumo deadlifts",
    fileUrl:
      "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/sumodlift.jpg?alt=media&token=49c4c497-dbcd-4371-a749-bc40019cf797",
    id: "0uQvji8qFAO6kw9oBHE3",
  },
  {
    title: "Barbell Bent-Over Row",
    fileUrl:
      "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/3-2a-barbell-bent-over-row.jpg?alt=media&token=4e10565f-a878-4ee9-a12e-ba7f774af092",
    id: "2A4AwhWLqcJbVrdTmoRw",
  },
  { title: "The Dark Knight", fileUrl: "", id: "" },
  { title: "12 Angry Men", fileUrl: "", id: "" },
  { title: "Schindler's List", fileUrl: "", id: "" },
  { title: "Pulp Fiction", fileUrl: "", id: "" },
  {
    title: "The Lord of the Rings: The Return of the King",
    fileUrl: "",
    id: 2003,
  },
  { title: "The Good, the Bad and the Ugly", fileUrl: "", id: 1966 },
  { title: "Fight Club", fileUrl: "", id: 1999 },
];
const equipmentList = [
  "Bosu",
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Medicine Ball",
  "Pull Up Bar",
  "Resistance Band",
  "Body Weight",
  "Machine",
];
interface WorkoutFormProps {
  workout?: any;
  onSubmit: any;
  action: string;
  exercisesState?: any;
  getExercisesAction?: () => void;
}
interface WorkoutFormState {
  title: string;
  description: string;
  level: string;
  equipment: string[];
  exerciseitems: {}[];
  // exerciseListFromFirestore: {}[];
  category: string;
  workoutCategory: string;
  imageUrl: string;
  routeName: string;
  error: string;
  fileUrl: string;
}
class WorkoutForm extends React.Component<WorkoutFormProps, WorkoutFormState> {
  constructor(props: WorkoutFormProps) {
    super(props);
    this.state = {
      title: props.workout ? props.workout.title : "",
      description: props.workout ? props.workout.description : "",
      level: props.workout ? props.workout.level : "",
      equipment: props.workout ? props.workout.equipment : [],
      exerciseitems: props.workout ? props.workout.exerciseitems : [],
      category: props.workout ? props.workout.category : "",
      workoutCategory: props.workout ? props.workout.workoutCategory : "",
      imageUrl: props.workout
        ? props.workout.imageUrl
        : "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/defaultImage.jpg?alt=media&token=352cd091-29e7-4ba2-af89-ce9ff0094d97",
      routeName: props.workout ? props.workout.routeName : "",
      // exerciseListFromFirestore: [],
      fileUrl: "",
      error: "",
    };
  }
  componentDidMount() {
    if (this.props.getExercisesAction !== undefined) {
      this.props.getExercisesAction();
      // const data =
      //   this.props.exercisesState && this.props.exercisesState.exercisesState;
      // if (data) {
      //   this.setState((previousValues) => ({
      //     ...previousValues,
      //     exerciseListFromFirestore: data,
      //   }));
      // }
    }
  }
  options = exerciseList.map((option: any) => {
    const firstLetter = option.title[0].toUpperCase();
    const exerciseId = option.id;
    const fileUrl = option.fileUrl;
    const title = option.title;
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      exerciseId: exerciseId,
      fileUrl: fileUrl,
      name: title,
      setsReps: "3x10",
      ...option,
    };
  });
  handleOnChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement | any
    >
  ) => {
    const {
      target: { name, value },
    } = e;
    this.setState((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };
  onSubmit = (e: any) => {
    e.preventDefault();
    if (!this.state.title) {
      this.setState(() => ({ error: "Please insert a title." }));
    } else {
      this.setState(() => ({ error: "" }));
      console.log(this.state);
      this.props.onSubmit({
        id: nextId(),
        title: this.state.title,
        description: this.state.description,
        level: this.state.level,
        equipment: this.state.equipment,
        exerciseitems: this.state.exerciseitems,
        category: this.state.category,
        workoutCategory: this.state.workoutCategory,
        imageUrl: this.state.fileUrl ? this.state.fileUrl : this.state.imageUrl,
        routeName: this.state.title,
      });
    }
  };
  setFileUrl = () => {
    console.log("set file url");
  };
  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState((previousValues) => ({
      ...previousValues,
      equipment: event.target.value as string[],
    }));
  };
  handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ equipment: value });
  };
  onTagsChange = (event: any, values: any) => {
    if (values !== null) {
      this.setState(
        (previousValues) => ({
          ...previousValues,
          exerciseitems: [...previousValues.exerciseitems, values],
        }),
        () => {
          // This will output an array of objects
          // given by Autocompelte options property.
          console.log(this.state.exerciseitems);
        }
      );
    }
  };
  //TODO
  // exerciseitems  setsReps
  // ability to remove exercises
  // validation - all fields
  // editing, removing workout / exercises
  /**
   * rxjrRA9PD6BvzzGueST5 - strength, id: 17
   * irwxy8GZWMfU62Svs59t - hiit, id: 11241
   * Ph3C70ESOzY0C7aHkO6F - stretching, id: 2323546
   * euQ2Csm7Zf5ooPndPItY - special, id: 342342734
   */
  render() {
    const data =
      this.props.exercisesState && this.props.exercisesState.exercisesState;
    console.log("data lskdflsjdflsjldfjskldjflksjdlfj");
    console.log(data);

    const options = data.map((option: any) => {
      const firstLetter = option.title[0].toUpperCase();
      const exerciseId = option.id;
      const fileUrl = option.fileUrl;
      const title = option.title;
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        exerciseId: exerciseId,
        fileUrl: fileUrl,
        name: title,
        setsReps: "3x10",
        ...option,
      };
    });
    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ position: "relative" }}>
          {this.state.error && (
            <p className="form__error">{this.state.error}</p>
          )}
          <ImageUpload setFileUrl={this.setFileUrl} exForm={this} />
          {/* {this.state.imageUrl && (
            <div>
              <img
                src={this.state.imageUrl}
                alt={this.state.imageUrl}
                style={{ width: "100%", marginTop: "1rem" }}
              />
            </div>
          )} */}
          {this.state.fileUrl ? (
            <div>
              <img
                src={this.state.fileUrl}
                alt={this.state.fileUrl}
                style={{ width: "100%", marginTop: "1rem" }}
              />
            </div>
          ) : (
            this.state.imageUrl && (
              <div>
                <img
                  src={this.state.imageUrl}
                  alt={this.state.imageUrl}
                  style={{ width: "100%", marginTop: "1rem" }}
                />
              </div>
            )
          )}
          <span>Upload image</span>
          <TextField
            required
            id="title"
            label="Title"
            onChange={this.handleOnChange}
            value={this.state.title}
            name="title"
            className="formelem"
          />
          <TextareaAutosize
            placeholder="Add a description"
            rowsMax={10}
            aria-label="Description"
            value={this.state.description}
            name="description"
            onChange={this.handleOnChange}
            className="formelem"
          />
          <FormControl className="formelem">
            <InputLabel htmlFor="level">Level</InputLabel>
            <Select
              native
              value={this.state.level}
              onChange={this.handleOnChange}
              inputProps={{
                name: "level",
                id: "level",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="equipment">Equipment</InputLabel>
            <Select
              labelId="equipment"
              id="equipment-checkbox"
              multiple
              value={this.state.equipment}
              onChange={this.handleChange}
              input={<Input />}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {equipmentList.map((name: string) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={this.state.equipment.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="formelem">
            <InputLabel htmlFor="category">
              Parent Category (type of workout)
            </InputLabel>
            <Select
              native
              value={this.state.category}
              onChange={this.handleOnChange}
              inputProps={{
                name: "category",
                id: "category",
              }}
            >
              <option aria-label="None" value="" />
              <option value="rxjrRA9PD6BvzzGueST5">Strength</option>
              <option value="irwxy8GZWMfU62Svs59t">HIIT</option>
              <option value="Ph3C70ESOzY0C7aHkO6F">Stretching</option>
              <option value="euQ2Csm7Zf5ooPndPItY">Special</option>
            </Select>
          </FormControl>
          <FormControl className="formelem">
            <InputLabel htmlFor="workoutCategory">Workout Category</InputLabel>
            <Select
              native
              value={this.state.workoutCategory}
              onChange={this.handleOnChange}
              inputProps={{
                name: "workoutCategory",
                id: "workoutCategory",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Upper body">Upper body</option>
              <option value="Lower body">Lower body</option>
              <option value="Abs">Abs & Core</option>
              <option value="Cardio">Cardio</option>
              <option value="Warmup">Warmup</option>
              <option value="Rehab">Rehab</option>
            </Select>
          </FormControl>
          <span style={{ margin: "1rem 0", display: "block" }}>
            Select exercise
          </span>
          <Autocomplete
            id="grouped-exercises"
            options={options.sort(
              (a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            onChange={this.onTagsChange}
            renderInput={(params) => (
              <TextField {...params} label="Exercise bank" variant="outlined" />
            )}
          />
          {Object.values(this.state.exerciseitems).map((activity: any, i) => {
            return (
              <div style={{ paddingTop: "0.5rem", color: "#ddd" }} key={i}>
                <span>{activity.name}</span>
              </div>
            );
          })}
          <Button
            style={{ marginTop: "20px", display: "flex", marginLeft: "auto" }}
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
          >
            {this.props.action}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  exercisesState: state.exercisesState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getExercisesAction: () => dispatch<any>(getExercisesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm);
