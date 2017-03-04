/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const drawPlayer = (context, offset, data) => {
  drawPlayerOutline(context, offset, data);
  drawPlayerName(context, offset, data);

  const img = new Image();
  img.onload = () => {
    drawPlayerImage(context, offset, data, img);
  };
  img.src = data.img;

  drawPlayerImage(context, offset, data, img);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = drawPlayer;


const drawPlayerName = (context, offset, data) => {
  context.fillStyle = PLAYER_INFO_COLOR;
  context.font = "bold 14px Arial";
  context.fillText(
    data.name,
    data.pos[0] + offset[0] + data.radius + 3,
    data.pos[1] + offset[1]
  );
};

const drawPlayerImage = (context, offset, data, img) => {
  context.drawImage(
    img,
    data.pos[0] + offset[0] - data.radius,
    data.pos[1] + offset[1] - data.radius,
    data.radius * 2,
    data.radius * 2
  );
};

const drawPlayerOutline = (context, offset, data) => {
  context.beginPath();
  context.arc(
    data.pos[0] + offset[0],
    data.pos[1] + offset[1],
    data.radius,
    0,
    2 * Math.PI
  );

  context.lineWidth = data.direHit ? DIRE_HIT_OUTLINE_WIDTH : NORMAL_OUTLINE_WIDTH;
  context.strokeStyle = data.direHit ? DIRE_HIT_COLOR : PLAYER_INFO_COLOR;
  context.stroke();
};

const PLAYER_INFO_COLOR = "#000";
const DIRE_HIT_COLOR = "#ff3d00";
const NORMAL_OUTLINE_WIDTH = 5;
const DIRE_HIT_OUTLINE_WIDTH = 10;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);


const drawGame = (context, offset, players) => {
  context.clearRect(0, 0, CANVAS_X, CANVAS_Y);
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, CANVAS_X, CANVAS_Y);

  drawBorder(context, offset);

  Object.values(players).forEach(player => {
    if (!outOfCanvasBounds(player, offset)) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__player__["a" /* drawPlayer */])(context, offset, player);
    }
  });
};
/* harmony export (immutable) */ __webpack_exports__["c"] = drawGame;


const drawBorder = (context, offset) => {
  context.strokeStyle = BORDER_COLOR;
  context.lineWidth = BORDER_WIDTH;
  context.strokeRect(offset[0], offset[1], DIM_X, DIM_Y);
  context.stroke();

  const gradient = context.createLinearGradient(offset[0], offset[1], DIM_X / 2, DIM_Y / 2);
  gradient.addColorStop(0, GRADIENT_COLOR_ONE);
  gradient.addColorStop(1, GRADIENT_COLOR_TWO);
  context.fillStyle = gradient;
  context.fillRect(offset[0], offset[1], DIM_X, DIM_Y);
};

const outOfCanvasBounds = (player, offset) => {
  const pos = player.pos,
    radius = player.radius;

  return (pos[0] + offset[0] + radius < 0 ||
  pos[0] + offset[0] - radius > CANVAS_X ||
  pos[1] + offset[1] + radius < 0 ||
  pos[1] + offset[1] - radius > CANVAS_Y);
};

const drawCountdown = (context, time) => {
  context.beginPath();
  context.rect(20, 20, 100, 40);
  context.fillStyle = 'white';
  context.fill();
  context.lineWidth = COUNTDOWN_WIDTH;
  context.strokeStyle = BORDER_COLOR;
  // context.stroke();

  context.fillStyle = BORDER_COLOR;
  context.font = "bold 24px Arial";

  context.fillText(Math.floor(time) / 1000, 25, 45);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = drawCountdown;


const BG_COLOR = "#8bf1ff";
const BORDER_WIDTH = 15;
const COUNTDOWN_WIDTH = 5;
const BORDER_COLOR = "#001f95";
const GRADIENT_COLOR_ONE = "#11e80d";
const GRADIENT_COLOR_TWO = "#0468ff";
const DIM_X = 2000;
const DIM_Y = 2000;
const CANVAS_X = 800;
/* harmony export (immutable) */ __webpack_exports__["a"] = CANVAS_X;

const CANVAS_Y = 550;
/* harmony export (immutable) */ __webpack_exports__["b"] = CANVAS_Y;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__server_util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__server_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__server_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(2);



class GameView {
  constructor(context, socket) {
    this.context = context;
    this.socket = socket;
    this.currentPlayerId = null;
    this.playStatus = "startScreen";

    this.setEventHandlers();
  }

  start(name) {
    this.bindKeyHandlers();
    this.setGameStartScreen(name);
    this.currentPlayerId = __WEBPACK_IMPORTED_MODULE_0__server_util___default.a.randomId();
    this.activateDireHitTime = null;
    this.playStatus = "playing";
    this.initialData = false;
    this.lastActivityTime = Date.now();

    this.socket.emit("new player", { name: this.name, id: this.currentPlayerId });
  }

  setEventHandlers() {
    this.addStartClickListener();
    this.addInstructionsClickListener();
    this.addRestartClickListener();

    this.socket.on("draw game", this.drawGame.bind(this));
    this.socket.on("activate dire hit", this.startCountdown.bind(this));
  }

  startCountdown(data) {
    if (data.id === this.currentPlayerId) {
      this.activateDireHitTime = Date.now() + data.lag;
    }
  }

  drawGame(data) {
    if (this.playStatus === "restartScreen") return;

    if (this.playStatus === "playing") {
      if (this.resetIfLost(data)) return;
      this.powerCurrentPlayer();

      if (this.initialData) {
        const offset = this.getCurrentPlayerOffset(data);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__game__["c" /* drawGame */])(this.context, offset, data);
        this.handleDireHitCountdown();
        this.handleInactivity();
      } else {
        this.checkInitialData(data);
      }
    }
  }

  handleInactivity() {
    if (this.isInactive()) {
      this.socket.emit("inactive player", { id: this.currentPlayerId });
      this.currentPlayerId = null;
      this.setInactiveScreen();
      this.playStatus = "restartScreen";
    }
  }

  isInactive() {
    return (Date.now() > this.lastActivityTime + 30000);
  }

  handleDireHitCountdown() {
    if (this.activateDireHitTime) {
      const currentTime = Date.now();

      if (this.activateDireHitTime < currentTime) {
        this.activateDireHitTime = null;
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__game__["d" /* drawCountdown */])(this.context, this.activateDireHitTime - currentTime);
      }
    }
  }

  checkInitialData(data) {
    if (data[this.currentPlayerId]) {
      this.initialData = true;
    }
  }

  resetIfLost(data) {
    if (!data[this.currentPlayerId] && this.initialData) {
      this.currentPlayerId = null;
      this.setGameRestartScreen();
      this.playStatus = "restartScreen";
      return true;
    }

    return false;
  }

  addStartClickListener() {
    const startButton = document.getElementById("start-button");

    startButton.onclick = () => {
      this.name = document.getElementById("name-input").value;
      if (this.name.length > 25) this.name = "";
      this.start(this.name);
    };
  }

  addRestartClickListener() {
    const restartButtons = document.getElementsByClassName("restart-button");

    for (let i = 0; i < restartButtons.length; i++) {
      let restartButton = restartButtons[i];

      restartButton.onclick = () => {
        this.start(this.name);
      };
    }
  }

  setGameStartScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");
    const inactiveScreen = document.getElementById("inactive-screen");

    canvas.className = "";
    startScreen.className = "hidden";
    restartScreen.className = "hidden";
    instructions.className = "hidden";
    inactiveScreen.className = "hidden";
  }

  setGameRestartScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");
    const inactiveScreen = document.getElementById("inactive-screen");

    canvas.className = "hidden";
    startScreen.className = "hidden";
    restartScreen.className = "";
    instructions.className= "hidden";
    inactiveScreen.className = "hidden";
  }

  setInstructionsScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");
    const inactiveScreen = document.getElementById("inactive-screen");

    canvas.className = "hidden";
    startScreen.className = "";
    restartScreen.className = "hidden";
    instructions.classList.toggle("hidden");
    inactiveScreen.className = "hidden";
  }

  setInactiveScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");
    const inactiveScreen = document.getElementById("inactive-screen");

    canvas.className = "hidden";
    startScreen.className = "hidden";
    restartScreen.className = "hidden";
    instructions.className = "hidden";
    inactiveScreen.className = "";
  }

  addInstructionsClickListener() {
    const instructionsButton = document.getElementById("instructions-button");
    instructionsButton.onclick = () => {
      this.setInstructionsScreen();
    };

    const instructions = document.getElementById("instructions");
    instructions.onclick = () => {
      this.setInstructionsScreen();
    };

    const instructionsBody = document.getElementById("instructions-body");
    instructionsBody.onclick = e => {
      e.stopPropagation();
    };
  }

  bindKeyHandlers() {
    Object.keys(GameView.MOVES).forEach(key => {
      let move = GameView.MOVES[key];

      document.addEventListener('keydown', e => {
        if (e.key === key) {
          GameView.KEYS[GameView.MOVES[key]] = true;
        }
      }, false);

      document.addEventListener('keyup', e => {
        if (e.key === key) {
          GameView.KEYS[GameView.MOVES[key]] = false;
        }
      }, false);
    });

    document.addEventListener('keydown', e => {
      if (e.key === " ") {
        this.activateDireHit();
        this.lastActivityTime = Date.now();
      }
    });
  }

  getCurrentPlayerOffset(data) {
    return [
      __WEBPACK_IMPORTED_MODULE_1__game__["a" /* CANVAS_X */] / 2 - data[this.currentPlayerId].pos[0],
      __WEBPACK_IMPORTED_MODULE_1__game__["b" /* CANVAS_Y */] / 2 - data[this.currentPlayerId].pos[1]
    ];
  }

  powerCurrentPlayer() {
    const impulse = 0.5;
    const allImpulses = [];

    if (GameView.KEYS.up) allImpulses.push([0, -impulse]);
    if (GameView.KEYS.down) allImpulses.push([0, impulse]);
    if (GameView.KEYS.left) allImpulses.push([-impulse, 0]);
    if (GameView.KEYS.right) allImpulses.push([impulse, 0]);

    if (allImpulses.length > 0) this.lastActivityTime = Date.now();
    this.socket.emit("move player", { id: this.currentPlayerId, impulses: allImpulses });
  }

  activateDireHit() {
    this.socket.emit("dire hit player", { id: this.currentPlayerId });
  }
}

GameView.MOVES = {
  "ArrowLeft": "left",
  "ArrowUp": "up",
  "ArrowRight": "right",
  "ArrowDown": "down"
};

GameView.KEYS = {
  up: false,
  down: false,
  left: false,
  right: false
};

/* harmony default export */ __webpack_exports__["a"] = GameView;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(3);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* CANVAS_X */];
  canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["b" /* CANVAS_Y */];

  const context = canvas.getContext("2d");
  const socket = io();

  const gameView = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](context, socket);
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  randomRadius() {
    return Math.floor(Math.random() * (20 - 5)) + 5;
  },

  randomVelocity() {
    return [
      this.randomVelocityPiece(),
      this.randomVelocityPiece()
    ];
  },

  randomVelocityPiece() {
    return Math.floor(Math.random() * (1.2 + 1.2)) - 1.2;
  },

  randomPokemonId() {
    return POKEMON_IDS[Math.floor(Math.random() * POKEMON_IDS.length)];
  },

  randomPlayerName() {
    return POKEMON_CHARACTER_NAMES[Math.floor(Math.random() * POKEMON_CHARACTER_NAMES.length)];
  },

  randomId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },

  DEFAULT_RADIUS: 15
};

const POKEMON_IDS = [
  1, 4, 7, 24, 29, 34, 112, 147, 152, 155, 158, 220, 304
];

const POKEMON_CHARACTER_NAMES = [
  "Misty",
  "Lass",
  "Beauty",
  "Serena",
  "Bonnie",
  "Iris",
  "Jessie",
  "Lillie",
  "May",
  "Dawn",
  "Moon",
  "Mallow",
  "Sakura",
  "Shauna",
  "Candela",
  "Officer Jenny",
  "Aria",
  "Olivia",
  "Lusamine",
  "Lana",
  "Professor Ivy",
  "Mom",
  "Sabrina",
  "Viola",
  "Daisy",
  "Bianca",
  "Sumomo",
  "Blanche",
  "Agatha",
  "Georgia",
  "Grace",
  "Malva",
  "Karen"
];

module.exports = Util;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map