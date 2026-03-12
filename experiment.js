/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_finish: function () {

    // Keep a console view for quick debugging/filtering.
    console.log("All data:", jsPsych.data.get().values());
  },
});

// Keep all image stimuli inside the viewport on any screen size.
const responsiveImageStyle = document.createElement("style");
responsiveImageStyle.textContent = `
  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .jspsych-display-element,
  .jspsych-content-wrapper,
  .jspsych-content {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
    padding: 0;
  }

  #jspsych-image-keyboard-response-stimulus,
  .jspsych-image-keyboard-response-stimulus {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    object-fit: contain;
  }
`;
document.head.appendChild(responsiveImageStyle);

/* create timeline */
var timeline = [];

/* preload images */

var preload = {
  type: jsPsychPreload,
  images: [
    "img/bloc1a.jpg",
    "img/bloc1b.jpg",
    "img/bloc2a.jpg",
    "img/bloc1b.jpg",
    "img/bloc2b.jpg",
    "img/bloc3a.jpg",
    "img/bloc3aa.jpg",
    "img/bloc3b.jpg",
    "img/bloc3bb.jpg",
    "img/bloc4a.jpg",
    "img/bloc4b.jpg",
    "img/bloc5a.jpg",
    "img/bloc5aa.jpg",
    "img/bloc5b.jpg",
    "img/bloc5bb.jpg",
    "img/ee1expressif.jpg",
    "img/ee2emotionnel.jpg",
    "img/ee3reveler.jpg",
    "img/ee4montrer.jpg",
    "img/ee5exprimer.jpg",
    "img/end.jpg",
    "img/er1controler.jpg",
    "img/er2calme.jpg",
    "img/er3controle.jpg",
    "img/er4contenir.jpg",
    "img/er5inhiber.jpg",
    "img/neg1desagreable.jpg",
    "img/neg2mauvais.jpg",
    "img/neg3sombre.jpg",
    "img/neg4grossier.jpg",
    "img/neg5pourri.jpg",
    "img/pos1agreable.jpg",
    "img/pos2bon.jpg",
    "img/pos3bien.jpg",
    "img/pos4honneur.jpg",
    "img/pos5chanceux.jpg",
    "img/start.jpg",
  ],
};

timeline.unshift(preload);

let V = Math.floor(Math.random() * 16) + 1;
console.log("Version:", V);

const conditions = {
  1: {
    b1: "bloc1a.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  2: {
    b1: "bloc1a.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  3: {
    b1: "bloc1a.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  4: {
    b1: "bloc1a.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  5: {
    b1: "bloc1a.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  6: {
    b1: "bloc1a.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  7: {
    b1: "bloc1a.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  8: {
    b1: "bloc1a.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4a.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  9: {
    b1: "bloc1b.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  10: {
    b1: "bloc1b.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  11: {
    b1: "bloc1b.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  12: {
    b1: "bloc1b.jpg",
    b2: "bloc2a.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  13: {
    b1: "bloc1b.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  14: {
    b1: "bloc1b.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3a.jpg",
    br3: "bloc3aa.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
  15: {
    b1: "bloc1b.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5a.jpg",
    br5: "bloc5aa.jpg",
  },
  16: {
    b1: "bloc1b.jpg",
    b2: "bloc2b.jpg",
    b3: "bloc3b.jpg",
    br3: "bloc3bb.jpg",
    b4: "bloc4b.jpg",
    b5: "bloc5b.jpg",
    br5: "bloc5bb.jpg",
  },
};

let condition = conditions[V];

let InstBloc1 = "img/" + condition.b1;
let InstBloc2 = "img/" + condition.b2;
let InstBloc3 = "img/" + condition.b3;
let Break3 = "img/" + condition.br3;
let InstBloc4 = "img/" + condition.b4;
let InstBloc5 = "img/" + condition.b5;
let Break5 = "img/" + condition.br5;

// from: PrepaExpeVersion code:

// Initialize all lists
let bloc1list_image = [],
  bloc1list_touche = [];
let bloc2list_image = [],
  bloc2list_touche = [];
let bloc3list_image = [],
  bloc3list_touche = [];
let bloc4list_image = [],
  bloc4list_touche = [];
let bloc5list_image = [],
  bloc5list_touche = [];

let bloc1listefinaleimage = [],
  bloc1listefinaletouche = [];
let bloc2listefinaleimage = [],
  bloc2listefinaletouche = [];
let bloc3listefinaleimage = [],
  bloc3listefinaletouche = [];
let bloc4listefinaleimage = [],
  bloc4listefinaletouche = [];
let bloc5listefinaleimage = [],
  bloc5listefinaletouche = [];

// Create index arrays
let shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

let listshuffle1premierpassage = shuffle([...Array(10).keys()]);
let listshuffle1deuxiemepassage = shuffle([...Array(10).keys()]);
let listshuffle2premierpassage = shuffle([...Array(10).keys()]);
let listshuffle2deuxiemepassage = shuffle([...Array(10).keys()]);
let listshuffle3premierpassage = shuffle([...Array(20).keys()]);
let listshuffle3deuxiemepassage = shuffle([...Array(20).keys()]);
let listshuffle3troisiemepassage = shuffle([...Array(20).keys()]);
let listshuffle4premierpassage = shuffle([...Array(10).keys()]);
let listshuffle4deuxiemepassage = shuffle([...Array(10).keys()]);
let listshuffle5premierpassage = shuffle([...Array(20).keys()]);
let listshuffle5deuxiemepassage = shuffle([...Array(20).keys()]);
let listshuffle5troisiemepassage = shuffle([...Array(20).keys()]);

// --- Bloc 1 ---
let bloc1_base_images = [
  "img/ee1expressif.jpg",
  "img/ee2emotionnel.jpg",
  "img/ee3reveler.jpg",
  "img/ee4montrer.jpg",
  "img/ee5exprimer.jpg",
  "img/er1controler.jpg",
  "img/er2calme.jpg",
  "img/er3controle.jpg",
  "img/er4contenir.jpg",
  "img/er5inhiber.jpg",
];
if (V < 9) {
  bloc1list_image = [...bloc1_base_images];
  bloc1list_touche = ["l", "l", "l", "l", "l", "a", "a", "a", "a", "a"];
} else {
  bloc1list_image = [...bloc1_base_images];
  bloc1list_touche = ["a", "a", "a", "a", "a", "l", "l", "l", "l", "l"];
}

// --- Bloc 2 ---
let bloc2_base_images = [
  "img/neg1desagreable.jpg",
  "img/neg2mauvais.jpg",
  "img/neg3sombre.jpg",
  "img/neg4grossier.jpg",
  "img/neg5pourri.jpg",
  "img/pos1agreable.jpg",
  "img/pos2bon.jpg",
  "img/pos3bien.jpg",
  "img/pos4honneur.jpg",
  "img/pos5chanceux.jpg",
];
if (V < 5 || (V >= 9 && V <= 12)) {
  bloc2list_image = [...bloc2_base_images];
  bloc2list_touche = ["l", "l", "l", "l", "l", "a", "a", "a", "a", "a"];
} else {
  bloc2list_image = [...bloc2_base_images];
  bloc2list_touche = ["a", "a", "a", "a", "a", "l", "l", "l", "l", "l"];
}

// --- Bloc 3 ---
let bloc3_base_images = [...bloc1_base_images, ...bloc2_base_images];
if ([1, 2, 5, 6, 9, 10, 13, 14].includes(V)) {
  bloc3list_image = [...bloc3_base_images];
  bloc3list_touche = [
    "l",
    "l",
    "l",
    "l",
    "l",
    "a",
    "a",
    "a",
    "a",
    "a",
    "l",
    "l",
    "l",
    "l",
    "l",
    "a",
    "a",
    "a",
    "a",
    "a",
  ];
} else {
  bloc3list_image = [...bloc3_base_images];
  bloc3list_touche = [
    "a",
    "a",
    "a",
    "a",
    "a",
    "l",
    "l",
    "l",
    "l",
    "l",
    "a",
    "a",
    "a",
    "a",
    "a",
    "l",
    "l",
    "l",
    "l",
    "l",
  ];
}

// --- Bloc 4 ---
let bloc4_base_images = [...bloc1_base_images];
if (V < 9) {
  bloc4list_image = [...bloc4_base_images];
  bloc4list_touche = ["a", "a", "a", "a", "a", "l", "l", "l", "l", "l"];
} else {
  bloc4list_image = [...bloc4_base_images];
  bloc4list_touche = ["l", "l", "l", "l", "l", "a", "a", "a", "a", "a"];
}

// --- Bloc 5 ---
let bloc5_base_images = [...bloc1_base_images, ...bloc2_base_images];
if (V % 2 === 0) {
  bloc5list_image = [...bloc5_base_images];
  bloc5list_touche = [
    "l",
    "l",
    "l",
    "l",
    "l",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "l",
    "l",
    "l",
    "l",
    "l",
  ];
} else {
  bloc5list_image = [...bloc5_base_images];
  bloc5list_touche = [
    "a",
    "a",
    "a",
    "a",
    "a",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "a",
    "a",
    "a",
    "a",
    "a",
  ];
}

// --- Create final lists by passages ---
let createFinalList = (base_images, base_keys, shuffle_arrays) => {
  let finalImages = [],
    finalKeys = [];
  shuffle_arrays.forEach((shuffle_arr) => {
    shuffle_arr.forEach((idx) => {
      finalImages.push(base_images[idx]);
      finalKeys.push(base_keys[idx]);
    });
  });
  return { finalImages, finalKeys };
};

({ finalImages: bloc1listefinaleimage, finalKeys: bloc1listefinaletouche } =
  createFinalList(bloc1list_image, bloc1list_touche, [
    listshuffle1premierpassage,
    listshuffle1deuxiemepassage,
  ]));
({ finalImages: bloc2listefinaleimage, finalKeys: bloc2listefinaletouche } =
  createFinalList(bloc2list_image, bloc2list_touche, [
    listshuffle2premierpassage,
    listshuffle2deuxiemepassage,
  ]));
({ finalImages: bloc3listefinaleimage, finalKeys: bloc3listefinaletouche } =
  createFinalList(bloc3list_image, bloc3list_touche, [
    listshuffle3premierpassage,
    listshuffle3deuxiemepassage,
    listshuffle3troisiemepassage,
  ]));
({ finalImages: bloc4listefinaleimage, finalKeys: bloc4listefinaletouche } =
  createFinalList(bloc4list_image, bloc4list_touche, [
    listshuffle4premierpassage,
    listshuffle4deuxiemepassage,
  ]));
({ finalImages: bloc5listefinaleimage, finalKeys: bloc5listefinaletouche } =
  createFinalList(bloc5list_image, bloc5list_touche, [
    listshuffle5premierpassage,
    listshuffle5deuxiemepassage,
    listshuffle5troisiemepassage,
  ]));

// --- Counters and current image placeholder ---
let CompteurBloc1 = 0,
  CompteurBloc2 = 0,
  CompteurBloc3 = 0,
  CompteurBloc4 = 0,
  CompteurBloc5 = 0;
let CurrentImage = "";

/* here i will need to show the experiment dialog (to put participant code)

  /* show start image */
var showImage = {
  type: jsPsychImageKeyboardResponse,
  stimulus: "img/start.jpg",
  choices: "ALL_KEYS",
};

timeline.push(showImage);

/* show initial instructions image */
var beginning_bloc = {
  type: jsPsychImageKeyboardResponse,
  stimulus: InstBloc1,
  choices: "ALL_KEYS",
};
timeline.push(beginning_bloc);

let currentIndex = 0;
let bloc1AttemptOnImage = 1;

const bloc1_trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: () => bloc1listefinaleimage[currentIndex],
  choices: ["a", "l"],
  trial_duration: null,

  data: () => ({
    block: 1,
    image_index: currentIndex,
    attempt_on_image: bloc1AttemptOnImage,
    image_name: bloc1listefinaleimage[currentIndex], // store image filename
    correct_key: bloc1listefinaletouche[currentIndex],
  }),

  on_finish: function (data) {
    // reaction time (seconds)
    data.rt_s = data.rt / 1000;

    // check correctness
    data.correct = data.response === bloc1listefinaletouche[currentIndex];
    data.incorrect_rt_s = data.correct ? null : data.rt_s;
    data.correct_rt_s = data.correct ? data.rt_s : null;
  },
};

const bloc1_loop = {
  timeline: [bloc1_trial],

  loop_function: function (data) {
    const last = data.values()[0];

    if (last.correct) {
      currentIndex++;
      bloc1AttemptOnImage = 1;

      if (currentIndex >= bloc1listefinaleimage.length) {
        return false; // end block
      }

      return true; // next image
    }

    console.log("Wrong key, try again!");
    bloc1AttemptOnImage++;
    return true; // repeat same image
  },
};

timeline.push(bloc1_loop);

/* start the experiment */
jsPsych.run(timeline);
