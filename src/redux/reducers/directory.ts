const INITIAL_STATE = {
  sections: [
    {
      title: "strength",
      imageUrl: "img10.jpg",
      id: 1,
      linkUrl: "workouts/strength",
    },
    {
      title: "hiit",
      imageUrl: "img1.jpg",
      id: 2,
      linkUrl: "workouts/hiit",
    },
    {
      title: "stretching",
      imageUrl: "img3.jpg",
      id: 3,
      linkUrl: "workouts/stretching",
    },
    {
      title: "special",
      imageUrl: "img8.jpg",
      size: "large",
      id: 4,
      linkUrl: "workouts/special",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
