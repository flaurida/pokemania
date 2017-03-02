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
  canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].CANVAS_X;
  canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].CANVAS_Y;

  const context = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  const gameView = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, context);
  gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__human_player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__computer_player__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(9);




class Game {
  constructor() {
    this.humanPlayers = [];
    this.computerPlayers = [];

    this.addComputerPlayers(40);
  }

  addPlayer(player) {
    if (player instanceof __WEBPACK_IMPORTED_MODULE_0__human_player__["a" /* default */]) {
      this.humanPlayers.push(player);
    } else if (player instanceof __WEBPACK_IMPORTED_MODULE_1__computer_player__["a" /* default */]) {
      this.computerPlayers.push(player);
    } else {
      throw "unknown type of player :(";
    }
  }

  addNewHumanPlayer(name) {
    const humanPlayer = new __WEBPACK_IMPORTED_MODULE_0__human_player__["a" /* default */]({
      pos: this.randomPos(),
      game: this,
      name: name
    });

    this.addPlayer(humanPlayer);
    return humanPlayer;
  }

  addNewComputerPlayer() {
    const computerPlayer = new __WEBPACK_IMPORTED_MODULE_1__computer_player__["a" /* default */]({
      pos: this.randomPos(),
      game: this,
      velocity: __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].randomVelocity(),
      radius: __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].randomRadius(),
      name: __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].randomPlayerName(),
      color: "#293283"
    });

    this.addPlayer(computerPlayer);
    return computerPlayer;
  }

  addComputerPlayers(n) {
    for (let i = 0; i < n; i++) {
      this.addNewComputerPlayer();
    }
  }

  allPlayers() {
    return [].concat(this.humanPlayers, this.computerPlayers);
  }

  draw(context, offset) {
    context.clearRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);
    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);

    this.allPlayers().forEach(player => {
      if (!this.outOfCanvasBounds(player, offset)) {
        player.draw(context, offset);
      }
    });

    this.drawBorder(context, offset);
  }

  drawBorder(context, offset) {
    context.strokeStyle = "#000";
    context.lineWidth = Game.BORDER_WIDTH;
    context.strokeRect(offset[0], offset[1], Game.DIM_X, Game.DIM_Y);
    context.stroke();
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkCollisions();
  }

  moveObjects(timeDelta) {
    this.allPlayers().forEach(player => {
      if (player instanceof __WEBPACK_IMPORTED_MODULE_0__human_player__["a" /* default */]) {
        player.velocity[0] *= 0.9;
        player.velocity[1] *= 0.9;
      }

      player.move(timeDelta);
    });
  }

  checkCollisions() {
    const allPlayers = this.allPlayers();

    for (let i = 0; i < allPlayers.length; i++) {
      for (let j = i + 1; j < allPlayers.length; j++) {
        const player1 = allPlayers[i];
        const player2 = allPlayers[j];

        if (player1.isCollidedWith(player2)) {
          player1.handleCollision(player2);
        }
      }
    }
  }

  outOfBounds(player) {
    const pos = player.pos,
      radius = player.radius;

    return (pos[0] - radius < 0) || (pos[1] - radius < 0) ||
      (pos[0] > Game.DIM_X - radius) || (pos[1] > Game.DIM_Y - radius);
  }

  outOfCanvasBounds(player, offset) {
    const pos = player.pos,
      radius = player.radius;

    return (pos[0] + offset[0] + radius < 0 ||
    pos[0] + offset[0] - radius > Game.CANVAS_X ||
    pos[1] + offset[1] + radius < 0 ||
    pos[1] + offset[1] - radius > Game.CANVAS_Y);
  }

  randomPos() {
    return [
      (Game.DIM_X - 50) * Math.random() + 25,
      (Game.DIM_Y - 50) * Math.random() + 25
    ];
  }

  removePlayer(player) {
    if (player instanceof __WEBPACK_IMPORTED_MODULE_0__human_player__["a" /* default */]) {
      this.humanPlayers.splice(this.humanPlayers.indexOf(player), 1);
    } else if (player instanceof __WEBPACK_IMPORTED_MODULE_1__computer_player__["a" /* default */]) {
      this.computerPlayers.splice(this.computerPlayers.indexOf(player), 1);
    } else {
      throw "unknown type of player :(";
    }
  }
}

Game.BG_COLOR = "#c8eafb";
Game.BORDER_WIDTH = 7;
Game.DIM_X = 2000;
Game.DIM_Y = 2000;
Game.CANVAS_X = 700;
Game.CANVAS_Y = 450;

/* harmony default export */ __webpack_exports__["a"] = Game;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, context) {
    this.context = context;
    this.game = game;
    this.playing = false;

    this.addStartClickListener();
  }

  start(name) {
    this.bindKeyHandlers();
    this.currentPlayer = this.game.addNewHumanPlayer(name);
    this.setGameStartScreen(name);
    this.lastTime = 0;
    this.playing = true;
    requestAnimationFrame(this.animate.bind(this));
  }

  addStartClickListener() {
    const startButton = document.getElementById("start-button");
    startButton.onclick = () => {
      const nameInput = document.getElementById("name-input");
      this.start(nameInput.value);
    };
  }

  setGameStartScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");

    canvas.className = "";
    startScreen.className = "hidden";
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
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    const offset = this.getCurrentPlayerOffset();

    this.powerCurrentPlayer();
    this.game.step(timeDelta);
    this.game.draw(this.context, offset);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  getCurrentPlayerOffset() {
    return [
      this.game.constructor.CANVAS_X / 2 - this.currentPlayer.pos[0],
      this.game.constructor.CANVAS_Y / 2 - this.currentPlayer.pos[1]
    ];
  }

  powerCurrentPlayer() {
    const impulse = 0.5;

    if (GameView.KEYS.up) this.currentPlayer.power([0, -impulse]);
    if (GameView.KEYS.down) this.currentPlayer.power([0, impulse]);
    if (GameView.KEYS.left) this.currentPlayer.power([-impulse, 0]);
    if (GameView.KEYS.right) this.currentPlayer.power([impulse, 0]);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(10);



class HumanPlayer extends __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] {
  power(impulse) {
    this.velocity[0] += impulse[0];
    this.velocity[1] += impulse[1];
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
  }
};

const POKEMON_IDS = [
  1, 4, 7, 24, 29, 34, 147, 155, 220, 304
];

const POKEMON_CHARACTER_NAMES = [
  "Misty",
  "Lass",
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
    this.radius = options.radius || DEFAULT_RADIUS;
    this.name = options.name || "Misty";
    this.color = options.color || "#ff00fc";
    this.pokemonId = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].randomPokemonId() || 7;
    this.game = options.game;
    this.evolution = 0;
  }

  draw(context, offset) {
    if (!this.img) {
      this.img = new Image();
      this.img.onload = () => {
        this.drawPlayerImage(context, offset);
      };
      this.img.src = "assets/img/egg.png";
    }

    this.evolve();
    this.drawPlayerImage(context, offset);

    context.fillStyle = PLAYER_NAME_COLOR;
    context.font = "bold 14px Arial";
    context.fillText(
      this.name,
      this.pos[0] + offset[0] + this.radius,
      this.pos[1] + offset[1]
    );
  }

  evolve() {
    if (this.radius < 30 || this.evolution === 3) {
      return;
    } else if (this.radius > 30 && this.evolution <= 0) {
      this.evolution++;
      this.img.src = `assets/img/pokemon-${this.pokemonId}.png`;
    } else if (this.radius > 60 && this.evolution <= 1) {
      this.pokemonId++;
      this.evolution++;
      this.img.src = `assets/img/pokemon-${this.pokemonId}.png`;
    } else if (this.radius > 90 && this.evolution <= 2) {
      this.pokemonId++;
      this.evolution++;
      this.img.src = `assets/img/pokemon-${this.pokemonId}.png`;
    }
  }

  drawPlayerImage(context, offset) {
    context.drawImage(
      this.img,
      this.pos[0] + offset[0] - this.radius,
      this.pos[1] + offset[1] - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      sizeScale = (DEFAULT_RADIUS / this.radius - 1) / 4,
      deltaX = this.velocity[0] * velocityScale * (1 + sizeScale),
      deltaY = this.velocity[1] * velocityScale * (1 + sizeScale),
      oldPos = this.pos;

    this.pos = [this.pos[0] + deltaX, this.pos[1] + deltaY];
    if (this.game.outOfBounds(this)) {
      this.adjustOutOfBounds();
    }
  }

  adjustOutOfBounds() {
    if (this.pos[0] > this.game.constructor.DIM_X - this.radius || this.pos[0] < this.radius) {
      this.velocity[0] = -this.velocity[0];

      if (this.pos[0] < this.radius) {
        this.pos[0] = this.radius;
      } else {
        this.pos[0] = this.game.constructor.DIM_X - this.radius;
      }
    }

    if (this.pos[1] > this.game.constructor.DIM_Y - this.radius || this.pos[1] < this.radius) {
      this.velocity[1] = -this.velocity[1];

      if (this.pos[1] < this.radius) {
        this.pos[1] = this.radius;
      } else {
        this.pos[1] = this.game.constructor.DIM_Y - this.radius;
      }
    }
  }

  isCollidedWith(otherPlayer) {
    const centerDist = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist(this.pos, otherPlayer.pos);
    return centerDist < (this.radius + otherPlayer.radius);
  }

  handleCollision(otherPlayer) {
    if (this.radius > otherPlayer.radius) {
      this.radius += otherPlayer.radius / 2;
      otherPlayer.remove();
    } else {
      otherPlayer.radius += this.radius / 2;
      this.remove();
    }
  }

  remove() {
    this.game.removePlayer(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
const PLAYER_NAME_COLOR = "#000";
const DEFAULT_RADIUS = 15;

/* harmony default export */ __webpack_exports__["a"] = Player;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(10);



class ComputerPlayer extends __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] {

}

/* harmony default export */ __webpack_exports__["a"] = ComputerPlayer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map