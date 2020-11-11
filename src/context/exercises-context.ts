import React from "react";

const initialState = {};

// const ExercisesContext = React.createContext(initialState);
const ExercisesContext = React.createContext<any | null>(null);

export { ExercisesContext as default };
