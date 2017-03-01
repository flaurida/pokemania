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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(2);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  const context = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, context).start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__human_player__ = __webpack_require__(3);


class Game {
  constructor() {
    this.humanPlayers = [];
    this.computerPlayers = [];
  }

  addPlayer(player) {
    this.humanPlayers.push(player);
  }

  addNewHumanPlayer() {
    const humanPlayer = new __WEBPACK_IMPORTED_MODULE_0__human_player__["a" /* default */]({
      pos: this.randomPos(),
      game: this
    });

    this.addPlayer(humanPlayer);
    return humanPlayer;
  }

  allPlayers() {
    return [].concat(this.humanPlayers, this.computerPlayers);
  }

  draw(context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allPlayers().forEach(player => {
      player.draw(context);
    });
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkCollisions();
  }

  moveObjects(timeDelta) {
    this.allPlayers().forEach(player => {
      player.move(timeDelta);
    });
  }

  checkCollisions() {

  }

  outOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  randomPos() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  removePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1);
  }
}

Game.BG_COLOR = "#c8eafb";
Game.DIM_X = 800;
Game.DIM_Y = 600;

/* harmony default export */ __webpack_exports__["a"] = Game;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, context) {
    this.context = context;
    this.game = game;
    this.currentPlayer = this.game.addNewHumanPlayer();
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    Object.keys(GameView.MOVES).forEach(key => {
      let move = GameView.MOVES[key];

      document.addEventListener('keydown', e => {
        if (e.key === key) {
          this.currentPlayer.power(move);
        }
      }, false);

      document.addEventListener('keyup', e => {
        if (e.key === key) {
          this.currentPlayer.slowDownVelocity(key);
        }
      }, false);
    });
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.context);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "ArrowLeft": [-0.5, 0],
  "ArrowUp": [0, -0.5],
  "ArrowRight": [0.5, 0],
  "ArrowDown": [0, 0.5]
};

/* harmony default export */ __webpack_exports__["a"] = GameView;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(10);



class HumanPlayer extends __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] {
  power(impulse) {
    this.velocity[0] += impulse[0];
    this.velocity[1] += impulse[1];

    this.capVelocities();
  }

  capVelocities() {
    if (this.velocity[0] > 4) this.velocity[0] = 4;
    if (this.velocity[1] > 4) this.velocity[1] = 4;
    if (this.velocity[0] < -4) this.velocity[0] = -4;
    if (this.velocity[1] < -4) this.velocity[1] = -4;
  }

  slowDownVelocity(direction) {
    if (direction === "ArrowLeft" || direction === "ArrowRight") {
      this.velocity[0] = 0;
    } else {
      this.velocity[1] = 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = HumanPlayer;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  }
};

/* harmony default export */ __webpack_exports__["a"] = Util;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(9);


class Player {
  constructor(options) {
    this.pos = options.pos;
    this.velocity = options.velocity || [0, 0];
    this.radius = 15;
    this.name = options.name || "Laura";
    this.color = options.color || "#ff00fc";
    this.game = options.game;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI
    );
    context.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      deltaX = this.velocity[0] * velocityScale,
      deltaY = this.velocity[1] * velocityScale;

    const newPos = [this.pos[0] + deltaX, this.pos[1] + deltaY];
    if (this.game.outOfBounds(newPos)) return;
    this.pos = newPos;
  }

  isCollidedWith(otherPlayer) {
    const centerDist = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist(this.pos, otherPlayer.pos);
    return centerDist < (this.radius + otherPlayer.radius);
  }

  remove() {
    this.game.removePlayer(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/* harmony default export */ __webpack_exports__["a"] = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map