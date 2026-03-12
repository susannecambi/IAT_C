const PCLOUD_USER = "Susanne.Cambi@unil.ch";
const PCLOUD_PASS = "gajfo1-bazvas-Tycbuk";
const PCLOUD_FOLDER_ID = 22842773391;
let pcloudUploadPromise = null;
const urlParams = new URLSearchParams(window.location.search);
let participantCode = (urlParams.get("participant_code") || "").trim();
const taskOrder = (urlParams.get("order") || "").trim() || "NA";
const returnUrl = (urlParams.get("return_url") || "").trim();

function uploadCsvToPcloud() {
  if (pcloudUploadPromise) {
    return pcloudUploadPromise;
  }
  pcloudUploadPromise = Promise.resolve().then(function () {
    const submittedAtIso = new Date().toISOString();
    const submittedAtSafe = submittedAtIso.replace(/[:.]/g, "-");
    const safeCode = participantCode
      ? participantCode.replace(/[^a-zA-Z0-9_-]/g, "")
      : "no_code";

    const taskData = jsPsych.data
      .get()
      .filterCustom(function (trial) {
        return typeof trial.block === "number";
      });
    const rowsForCsv =
      taskData.count() > 0 ? taskData.values() : jsPsych.data.get().values();

    let csv = "";
    if (rowsForCsv.length > 0) {
      const allKeys = Object.keys(rowsForCsv[0]);
      const remainingKeys = allKeys.filter(function (k) {
        return k !== "version_v";
      });
      const headers = ["version_v"].concat(remainingKeys);
      const esc = function (value) {
        if (value === null || value === undefined) return "";
        const s = String(value);
        if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
        return s;
      };

      const lines = [headers.map(esc).join(",")];
      rowsForCsv.forEach(function (row) {
        const ordered = [V].concat(
          remainingKeys.map(function (key) {
            return row[key];
          })
        );
        lines.push(ordered.map(esc).join(","));
      });
      csv = lines.join("\n");
    } else {
      csv = "version_v\n" + String(V);
    }

    const filename = "IATC_" + safeCode + "_" + submittedAtSafe + ".csv";

    return fetch(
      "https://eapi.pcloud.com/userinfo?getauth=1&logout=1" +
        "&username=" +
        encodeURIComponent(PCLOUD_USER) +
        "&password=" +
        encodeURIComponent(PCLOUD_PASS)
    )
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        var token = d.auth;
        if (!token) {
          console.error("pCloud login failed:", d);
          return Promise.reject("login failed");
        }

        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        var fd = new FormData();
        fd.append("file", blob, filename);

        return fetch(
          "https://eapi.pcloud.com/uploadfile?auth=" +
            token +
            "&folderid=" +
            PCLOUD_FOLDER_ID,
          { method: "POST", body: fd }
        );
      })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (d.result === 0) {
          console.log("pCloud upload succeeded:", filename);
        } else {
          console.error("pCloud upload failed:", d);
        }
      })
      .catch(function (e) {
        console.error("pCloud network/upload error:", e);
      });
  });

  return pcloudUploadPromise;
}

/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_finish: function () {
    // Keep a console view for quick debugging/filtering.
    console.log("All data:", jsPsych.data.get().values());
    uploadCsvToPcloud().finally(function () {
      if (returnUrl) {
        window.location.href = returnUrl;
      }
    });
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
jsPsych.data.addProperties({
  version_v: V,
  participant_code: participantCode,
  task_order: taskOrder,
});

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

// Split blocks 3 and 5 into training then main phase.
const bloc3TrainingLength = bloc3list_image.length;
const bloc5TrainingLength = bloc5list_image.length;

const bloc3trainingImages = bloc3listefinaleimage.slice(0, bloc3TrainingLength);
const bloc3trainingKeys = bloc3listefinaletouche.slice(0, bloc3TrainingLength);
const bloc3mainImages = bloc3listefinaleimage.slice(bloc3TrainingLength);
const bloc3mainKeys = bloc3listefinaletouche.slice(bloc3TrainingLength);

const bloc5trainingImages = bloc5listefinaleimage.slice(0, bloc5TrainingLength);
const bloc5trainingKeys = bloc5listefinaletouche.slice(0, bloc5TrainingLength);
const bloc5mainImages = bloc5listefinaleimage.slice(bloc5TrainingLength);
const bloc5mainKeys = bloc5listefinaletouche.slice(bloc5TrainingLength);

// --- Counters and current image placeholder ---
let CompteurBloc1 = 0,
  CompteurBloc2 = 0,
  CompteurBloc3 = 0,
  CompteurBloc4 = 0,
  CompteurBloc5 = 0;
let CurrentImage = "";

// Participant dialog at the beginning (participant code).
var participant_dialog = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "Code participant:",
      name: "participant_code",
      required: true,
      columns: 20,
    },
  ],
  button_label: "Continuer",
  on_finish: function (data) {
    participantCode = data.response.participant_code.trim();
    jsPsych.data.addProperties({
      participant_code: participantCode,
      task_order: taskOrder,
      version_v: V,
    });
  },
};

if (!participantCode) {
  timeline.push(participant_dialog);
}

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

function buildBlockLoop(blockNumber, blockImages, blockKeys) {
  let currentIndex = 0;
  let attemptOnImage = 1;

  const blockTrial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: () => blockImages[currentIndex],
    choices: ["a", "l"],
    trial_duration: null,
    data: () => ({
      block: blockNumber,
      image_index: currentIndex,
      attempt_on_image: attemptOnImage,
      image_name: blockImages[currentIndex],
      correct_key: blockKeys[currentIndex],
    }),
    on_finish: function (data) {
      data.rt_s = data.rt / 1000;
      data.correct = data.response === blockKeys[currentIndex];
      data.incorrect_rt_s = data.correct ? null : data.rt_s;
      data.correct_rt_s = data.correct ? data.rt_s : null;
    },
  };

  return {
    timeline: [blockTrial],
    loop_function: function (data) {
      const last = data.values()[0];

      if (last.correct) {
        currentIndex++;
        attemptOnImage = 1;

        if (currentIndex >= blockImages.length) {
          return false;
        }

        return true;
      }

      console.log("Wrong key, try again!");
      attemptOnImage++;
      return true;
    },
  };
}

const bloc1_loop = buildBlockLoop(1, bloc1listefinaleimage, bloc1listefinaletouche);
const bloc2_loop = buildBlockLoop(2, bloc2listefinaleimage, bloc2listefinaletouche);
const bloc3_training_loop = buildBlockLoop(3, bloc3trainingImages, bloc3trainingKeys);
const bloc3_main_loop = buildBlockLoop(3, bloc3mainImages, bloc3mainKeys);
const bloc4_loop = buildBlockLoop(4, bloc4listefinaleimage, bloc4listefinaletouche);
const bloc5_training_loop = buildBlockLoop(5, bloc5trainingImages, bloc5trainingKeys);
const bloc5_main_loop = buildBlockLoop(5, bloc5mainImages, bloc5mainKeys);
bloc5_main_loop.on_timeline_finish = function () {
  uploadCsvToPcloud();
};

var inst_bloc2 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: InstBloc2,
  choices: "ALL_KEYS",
};

var inst_bloc3 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: InstBloc3,
  choices: "ALL_KEYS",
};

var break_bloc3 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: Break3,
  choices: "ALL_KEYS",
};

var inst_bloc4 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: InstBloc4,
  choices: "ALL_KEYS",
};

var inst_bloc5 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: InstBloc5,
  choices: "ALL_KEYS",
};

var break_bloc5 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: Break5,
  choices: "ALL_KEYS",
};

var end_image = {
  type: jsPsychImageKeyboardResponse,
  stimulus: "img/end.jpg",
  choices: "ALL_KEYS",
};

timeline.push(bloc1_loop);
timeline.push(inst_bloc2);
timeline.push(bloc2_loop);
timeline.push(inst_bloc3);
timeline.push(bloc3_training_loop);
timeline.push(break_bloc3);
timeline.push(bloc3_main_loop);
timeline.push(inst_bloc4);
timeline.push(bloc4_loop);
timeline.push(inst_bloc5);
timeline.push(bloc5_training_loop);
timeline.push(break_bloc5);
timeline.push(bloc5_main_loop);
timeline.push(end_image);

/* start the experiment */
jsPsych.run(timeline);
