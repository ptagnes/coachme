const WORKOUT_DATA = {
  strength: {
    id: 17,
    title: "Strength",
    routeName: "strength",
    imageUrl: "img10.jpg",
    items: [
      {
        id: 1341,
        title: "Iron back workout",
        routeName: "ironback",
        imageUrl: "img18.jpg",
        category: "Upper body",
        exerciseitems: [
          {
            id: 100008,
            name: "Lat pull down",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "3x12",
          },
          {
            id: 1143986,
            name: "Dumbbell rows",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "3x12",
          },
        ],
      },
      {
        id: 19422,
        title: "Chest workout",
        routeName: "chestworkout",
        imageUrl: "img13.jpg",
        category: "Upper body",
        exerciseitems: [
          {
            id: 15840,
            name: "Push ups",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "3x12",
          },
          {
            id: 115555,
            name: "Bench press",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "3x12",
          },
        ],
      },
      {
        id: 136641,
        title: "Iron butt workout",
        routeName: "ironbutt",
        imageUrl: "img6.jpg",
        category: "Lower body",
        exerciseitems: [
          {
            id: 18540008,
            name: "Sumo deadlifts",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "3x12",
          },
          {
            id: 778143986,
            name: "Hip thrusts",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "3x12",
          },
        ],
      },
      {
        id: 2359422,
        title: "Leg workout",
        routeName: "legworkout",
        imageUrl: "img9.jpg",
        category: "Lower body",
        exerciseitems: [
          {
            id: 1558740,
            name: "Lunges with dumbbells",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "3x12",
          },
          {
            id: 104815555,
            name: "Step ups",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "3x12",
          },
        ],
      },
      {
        id: 239995122122,
        title: "Intense Six Pack",
        routeName: "sixpack",
        imageUrl: "img7.jpg",
        category: "Abs & Core",
        exerciseitems: [
          {
            id: 1558740,
            name: "Elevated crunches",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "3x12",
          },
          {
            id: 104815555,
            name: "Alternating Plank",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "3x12",
          },
        ],
      },
    ],
  },
  hiit: {
    id: 11241,
    title: "HIIT",
    routeName: "hiit",
    imageUrl: "img1.jpg",
    items: [
      {
        id: 112,
        title: "Light cardio",
        routeName: "lightcardio",
        imageUrl: "img2.jpg",
        category: "HIIT & Cardio",
        exerciseitems: [
          {
            id: 1012,
            name: "Jump in place",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "1min",
          },
          {
            id: 12321,
            name: "Elliptical",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "2min",
          },
        ],
      },
      {
        id: 1213,
        title: "Tabata",
        routeName: "tabata",
        imageUrl: "img12.jpg",
        category: "HIIT & Cardio",
        exerciseitems: [
          {
            id: 112120,
            name: "High knees",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "2min",
          },
          {
            id: 11434,
            name: "Butt kickers",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "4min",
          },
        ],
      },
    ],
  },
  stretching: {
    id: 2323546,
    title: "Stretching",
    routeName: "stretching",
    imageUrl: "img3.jpg",
    items: [
      {
        id: 938484747,
        title: "Rehab routine",
        routeName: "rehabroutine",
        imageUrl: "img4.jpg",
        category: "For runners",
        exerciseitems: [
          {
            id: 62957270,
            name: "Stretch gummi band",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "1min",
          },
          {
            id: 87658399998,
            name: "Roll on ball",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "2min",
          },
        ],
      },
      {
        id: 83838311,
        title: "Loosen hamstrings",
        routeName: "hamstringroutine",
        imageUrl: "img3.jpg",
        category: "Healthy legs",
        exerciseitems: [
          {
            id: 999944444,
            name: "Foam roller exercise",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "2min",
          },
          {
            id: 7774488833,
            name: "Some other exercise",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "4min",
          },
        ],
      },
    ],
  },
  special: {
    id: 342342734,
    title: "Special",
    routeName: "special",
    imageUrl: "img8.jpg",
    items: [
      {
        id: 111572212,
        title: "Warm up",
        routeName: "warmup",
        imageUrl: "img8.jpg",
        category: "Warm up",
        exerciseitems: [
          {
            id: 1839240012,
            name: "Lorem ipsum",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "1min",
          },
          {
            id: 12634658321,
            name: "Roll...",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "2min",
          },
        ],
      },
      {
        id: 129979555413,
        title: "Cool down",
        routeName: "cooldown",
        imageUrl: "img8.jpg",
        category: "Cool down",
        exerciseitems: [
          {
            id: 1172859120,
            name: "Foam roller exercise",
            imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
            setsReps: "2min",
          },
          {
            id: 115434,
            name: "Some other exercise",
            imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
            setsReps: "4min",
          },
        ],
      },
    ],
  },
};

export default WORKOUT_DATA;
