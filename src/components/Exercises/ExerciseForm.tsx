import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import "./ExerciseForm.css";

interface ExerciseFormProps {
  exercise?: any;
  onSubmit: any;
  action: string;
}
interface ExerciseFormState {
  title: string;
  description: string;
  level: string;
  url: string;
  videourl: string;
  error: string;
  equipment: string;
  mechanics: string;
  musclegroup: string;
  image: string;
  createdAt: Date;
}
export default class ExerciseForm extends React.Component<
  ExerciseFormProps,
  ExerciseFormState
> {
  constructor(props: ExerciseFormProps) {
    super(props);
    this.state = {
      title: props.exercise ? props.exercise.title : "",
      description: props.exercise ? props.exercise.description : "",
      level: props.exercise ? props.exercise.level : "",
      url: props.exercise ? props.exercise.url : "",
      videourl: props.exercise ? props.exercise.videourl : "",
      equipment: props.exercise ? props.exercise.equipment : "",
      mechanics: props.exercise ? props.exercise.mechanics : "",
      musclegroup: props.exercise ? props.exercise.musclegroup : "",
      image: props.exercise
        ? props.exercise.image
        : "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/defaultImage.jpg?alt=media&token=352cd091-29e7-4ba2-af89-ce9ff0094d97",
      createdAt: new Date(),
      error: "",
    };
  }
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
      this.setState(() => ({ error: "Vänligen ange ett namn." }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        id: this.state.title,
        title: this.state.title,
        description: this.state.description,
        level: this.state.level,
        image: this.state.image,
        url: this.state.url,
        videourl: this.state.videourl,
        equipment: this.state.equipment,
        mechanics: this.state.mechanics,
        musclegroup: this.state.musclegroup,
        createdAt: this.state.createdAt,
      });
    }
  };
  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className="form__error">{this.state.error}</p>
          )}
          <TextField
            required
            id="title"
            label="Title"
            onChange={this.handleOnChange}
            autoFocus
            value={this.state.title}
            name="title"
          />
          <TextField
            required
            id="url"
            label="Url"
            onChange={this.handleOnChange}
            value={this.state.url}
            name="url"
          />
          <TextField
            required
            id="videourl"
            label="Videourl"
            onChange={this.handleOnChange}
            value={this.state.videourl}
            name="videourl"
          />

          <TextareaAutosize
            placeholder="Add a description"
            rowsMax={10}
            aria-label="Description"
            value={this.state.description}
            name="description"
            onChange={this.handleOnChange}
          />

          <FormControl className="formselect">
            <InputLabel htmlFor="mechanics">Mechanics</InputLabel>
            <Select
              native
              value={this.state.mechanics}
              onChange={this.handleOnChange}
              inputProps={{
                name: "mechanics",
                id: "mechanics",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Compound">Compound</option>
              <option value="Isolation">Isolation</option>
            </Select>
          </FormControl>
          <FormControl className="formselect">
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
          <FormControl className="formselect">
            <InputLabel htmlFor="equipment">Equipment</InputLabel>
            <Select
              native
              value={this.state.equipment}
              onChange={this.handleOnChange}
              inputProps={{
                name: "equipment",
                id: "equipment",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Dumbbells">Dumbbells</option>
              <option value="Barbells">Barbells</option>
              <option value="Kettlebells">Kettlebells</option>
            </Select>
          </FormControl>
          <FormControl className="formselect">
            <InputLabel htmlFor="musclegroup">Musclegroup</InputLabel>
            <Select
              native
              value={this.state.musclegroup}
              onChange={this.handleOnChange}
              inputProps={{
                name: "musclegroup",
                id: "musclegroup",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Upperbody">Upperbody</option>
              <option value="Lowerbody">Lowerbody</option>
              <option value="Core">Core</option>
            </Select>
          </FormControl>
          {/**image upload, sets and reps */}
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

/**
createdAt: new Date(),
id: uid,
image: "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/jrp.jpg?alt=media&token=8ffe40ae-7f40-439f-85e6-2da8cd175368",
 */
