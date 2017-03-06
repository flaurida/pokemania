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
/******/ 	return __webpack_require__(__webpack_require__.s = 495);
/******/ })
/************************************************************************/
/******/ ({

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CANVAS_Y = exports.CANVAS_X = exports.drawCountdown = exports.drawGame = undefined;

var _player = __webpack_require__(240);

var drawGame = exports.drawGame = function drawGame(context, offset, players) {
  var loading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  context.clearRect(0, 0, CANVAS_X, CANVAS_Y);
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, CANVAS_X, CANVAS_Y);

  if (loading) {
    drawLoadingScreen(context);
  } else {
    drawGameBoard(context, offset);
    drawPlayers(context, offset, players);
  }
};

var drawPlayers = function drawPlayers(context, offset, players) {
  Object.keys(players).forEach(function (playerId) {
    if (!outOfCanvasBounds(players[playerId], offset)) {
      (0, _player.drawPlayer)(context, offset, players[playerId]);
    }
  });
};

var drawLoadingScreen = function drawLoadingScreen(context) {
  context.fillStyle = BORDER_COLOR;
  context.font = "bold 50px Arial";

  context.fillText("Loading...", CANVAS_X / 2 - 110, CANVAS_Y / 2);
};

var drawGameBoard = function drawGameBoard(context, offset) {
  context.strokeStyle = BORDER_COLOR;
  context.lineWidth = BORDER_WIDTH;
  context.strokeRect(offset[0], offset[1], DIM_X, DIM_Y);
  context.stroke();

  var gradient = context.createLinearGradient(offset[0], offset[1], DIM_X / 2, DIM_Y / 2);
  gradient.addColorStop(0, GRADIENT_COLOR_ONE);
  gradient.addColorStop(1, GRADIENT_COLOR_TWO);
  context.fillStyle = gradient;
  context.fillRect(offset[0], offset[1], DIM_X, DIM_Y);
};

var outOfCanvasBounds = function outOfCanvasBounds(player, offset) {
  var pos = player.pos,
      radius = player.radius;

  return pos[0] + offset[0] + radius < 0 || pos[0] + offset[0] - radius > CANVAS_X || pos[1] + offset[1] + radius < 0 || pos[1] + offset[1] - radius > CANVAS_Y;
};

var drawCountdown = exports.drawCountdown = function drawCountdown(context, time) {
  context.beginPath();
  context.rect(20, 20, 100, 40);
  context.fillStyle = 'white';
  context.fill();
  context.lineWidth = COUNTDOWN_WIDTH;
  context.strokeStyle = BORDER_COLOR;

  context.fillStyle = BORDER_COLOR;
  context.font = "bold 24px Arial";

  context.fillText(Math.floor(time) / 1000, 25, 45);
};

var BG_COLOR = "#8bf1ff";
var BORDER_WIDTH = 15;
var COUNTDOWN_WIDTH = 5;
var BORDER_COLOR = "#001f95";
var GRADIENT_COLOR_ONE = "#11e80d";
var GRADIENT_COLOR_TWO = "#0468ff";
var DIM_X = 2000;
var DIM_Y = 2000;
var CANVAS_X = exports.CANVAS_X = 800;
var CANVAS_Y = exports.CANVAS_Y = 500;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(241);

var _util2 = _interopRequireDefault(_util);

var _game = __webpack_require__(131);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(context, socket) {
    _classCallCheck(this, GameView);

    this.context = context;
    this.socket = socket;
    this.currentPlayerId = null;
    this.playStatus = "startScreen";

    this.setEventHandlers();
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      this.bindKeyHandlers();
      this.activateScreen("playGame");
      this.currentPlayerId = _util2.default.randomId();
      this.activateDireHitTime = null;
      this.playStatus = "playing";
      this.initialData = false;

      var pokemonId = this.selectedPokemonImage ? parseInt(this.selectedPokemonImage.getAttribute("value")) : null;

      this.socket.emit("new player", {
        name: this.name,
        pokemonId: pokemonId,
        id: this.currentPlayerId
      });
    }
  }, {
    key: 'setEventHandlers',
    value: function setEventHandlers() {
      this.addStartClickListener();
      this.addSelectPokemonClickListener();
      this.addInstructionsClickListener();
      this.addRestartClickListener();

      this.socket.on("draw game", this.drawGame.bind(this));
      this.socket.on("activate dire hit", this.startCountdown.bind(this));
      this.socket.on("inactive player", this.handleInactivity.bind(this));
    }
  }, {
    key: 'startCountdown',
    value: function startCountdown(data) {
      if (data.id === this.currentPlayerId) {
        this.activateDireHitTime = Date.now() + data.lag;
      }
    }
  }, {
    key: 'drawGame',
    value: function drawGame(data) {
      if (this.playStatus === "restart") return;

      if (this.playStatus === "playing") {
        if (this.resetIfLost(data)) return;
        this.powerCurrentPlayer();

        if (this.initialData) {
          var offset = this.getCurrentPlayerOffset(data);
          (0, _game.drawGame)(this.context, offset, data);
          this.handleDireHitCountdown();
        } else {
          (0, _game.drawGame)(this.context, null, data, true);
          this.checkInitialData(data);
        }
      }
    }
  }, {
    key: 'handleDireHitCountdown',
    value: function handleDireHitCountdown() {
      if (this.activateDireHitTime) {
        var currentTime = Date.now();

        if (this.activateDireHitTime < currentTime) {
          this.activateDireHitTime = null;
        } else {
          (0, _game.drawCountdown)(this.context, this.activateDireHitTime - currentTime);
        }
      }
    }
  }, {
    key: 'checkInitialData',
    value: function checkInitialData(data) {
      if (data[this.currentPlayerId]) {
        this.initialData = true;
      }
    }
  }, {
    key: 'resetIfLost',
    value: function resetIfLost(data) {
      if (!data[this.currentPlayerId] && this.initialData) {
        this.currentPlayerId = null;
        this.activateScreen("restart");
        this.playStatus = "restart";
        return true;
      }

      return false;
    }
  }, {
    key: 'addStartClickListener',
    value: function addStartClickListener() {
      var _this = this;

      var startButton = document.getElementById("start-button");

      startButton.onclick = function () {
        _this.start();
      };
    }
  }, {
    key: 'addSelectPokemonClickListener',
    value: function addSelectPokemonClickListener() {
      var _this2 = this;

      var selectPokemonButton = document.getElementById("select-pokemon-button");

      selectPokemonButton.onclick = function () {
        _this2.name = document.getElementById("name-input").value;
        if (_this2.name.length > 25) _this2.name = "";
        _this2.addPokemonToSelectList();
        _this2.activateScreen("selectPokemon");
      };

      var selectPokemon = document.getElementById("select-pokemon");
      selectPokemon.onclick = function () {
        _this2.activateScreen("selectPokemon");
      };

      var selectPokemonBody = document.getElementById("select-pokemon-body");
      selectPokemonBody.onclick = function (e) {
        e.stopPropagation();
      };
    }
  }, {
    key: 'addPokemonToSelectList',
    value: function addPokemonToSelectList() {
      var _this3 = this;

      var pokemonList = document.getElementById("pokemon-list");

      if (!pokemonList.firstChild) {
        _util2.default.POKEMON_IDS.forEach(function (pokemonId) {
          var pokemonListItem = document.createElement("li");
          var pokemonImage = document.createElement("img");

          pokemonImage.src = 'assets/img/pokemon-' + pokemonId + '.png';
          pokemonImage.className = "select-pokemon-img";
          pokemonImage.setAttribute("value", pokemonId);
          pokemonListItem.appendChild(pokemonImage);
          _this3.bindPokemonSelectClickListener(pokemonImage);

          pokemonList.appendChild(pokemonListItem);
        });
      }
    }
  }, {
    key: 'bindPokemonSelectClickListener',
    value: function bindPokemonSelectClickListener(pokemonImage) {
      var _this4 = this;

      pokemonImage.onclick = function () {
        pokemonImage.classList.toggle("select-pokemon-img-focus");

        if (_this4.selectedPokemonImage) {
          _this4.selectedPokemonImage.classList.toggle("select-pokemon-img-focus");
        }

        _this4.selectedPokemonImage = pokemonImage;
      };
    }
  }, {
    key: 'addRestartClickListener',
    value: function addRestartClickListener() {
      var _this5 = this;

      var restartButtons = document.getElementsByClassName("restart-button");

      for (var i = 0; i < restartButtons.length; i++) {
        var restartButton = restartButtons[i];

        restartButton.onclick = function () {
          _this5.start();
        };
      }
    }
  }, {
    key: 'activateScreen',
    value: function activateScreen(type) {
      var canvas = document.getElementById("game-canvas");
      var startScreen = document.getElementById("start-screen");
      var restartScreen = document.getElementById("restart-screen");
      var instructions = document.getElementById("instructions");
      var inactiveScreen = document.getElementById("inactive-screen");
      var selectPokemonScreen = document.getElementById("select-pokemon");

      canvas.className = type === "playGame" ? "" : "hidden";
      startScreen.className = type === "start" || type === "selectPokemon" || type === "instructions" ? "" : "hidden";
      restartScreen.className = type === "restart" ? "" : "hidden";
      inactiveScreen.className = type === "inactive" ? "" : "hidden";

      if (type === "instructions") {
        instructions.classList.toggle("hidden");
      } else {
        instructions.className = "hidden";
      }

      if (type === "selectPokemon") {
        selectPokemonScreen.classList.toggle("hidden");
      } else {
        selectPokemonScreen.className = "hidden";
      }
    }
  }, {
    key: 'addInstructionsClickListener',
    value: function addInstructionsClickListener() {
      var _this6 = this;

      var instructionsButton = document.getElementById("instructions-button");
      instructionsButton.onclick = function () {
        _this6.activateScreen("instructions");
      };

      var instructions = document.getElementById("instructions");
      instructions.onclick = function () {
        _this6.activateScreen("instructions");
      };

      var instructionsBody = document.getElementById("instructions-body");
      instructionsBody.onclick = function (e) {
        e.stopPropagation();
      };
    }
  }, {
    key: 'bindKeyHandlers',
    value: function bindKeyHandlers() {
      var _this7 = this;

      Object.keys(GameView.MOVES).forEach(function (key) {
        var move = GameView.MOVES[key];

        document.addEventListener('keydown', function (e) {
          if (e.key === key) {
            e.preventDefault();
            GameView.KEYS[GameView.MOVES[key]] = true;
          }
        }, false);

        document.addEventListener('keyup', function (e) {
          if (e.key === key) {
            e.preventDefault();
            GameView.KEYS[GameView.MOVES[key]] = false;
          }
        }, false);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === " ") {
          e.preventDefault();
          _this7.activateDireHit();
        }
      });
    }
  }, {
    key: 'getCurrentPlayerOffset',
    value: function getCurrentPlayerOffset(data) {
      return [_game.CANVAS_X / 2 - data[this.currentPlayerId].pos[0], _game.CANVAS_Y / 2 - data[this.currentPlayerId].pos[1]];
    }
  }, {
    key: 'powerCurrentPlayer',
    value: function powerCurrentPlayer() {
      var impulse = 0.5;
      var allImpulses = [];

      if (GameView.KEYS.up) allImpulses.push([0, -impulse]);
      if (GameView.KEYS.down) allImpulses.push([0, impulse]);
      if (GameView.KEYS.left) allImpulses.push([-impulse, 0]);
      if (GameView.KEYS.right) allImpulses.push([impulse, 0]);

      this.socket.emit("move player", { id: this.currentPlayerId, impulses: allImpulses });
    }
  }, {
    key: 'activateDireHit',
    value: function activateDireHit() {
      this.socket.emit("dire hit player", { id: this.currentPlayerId });
    }
  }, {
    key: 'handleInactivity',
    value: function handleInactivity(data) {
      if (data.id === this.currentPlayerId) {
        this.currentPlayerId = null;
        this.playStatus === "restart";
        this.activateScreen("inactive");
      }
    }
  }]);

  return GameView;
}();

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

exports.default = GameView;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var drawPlayer = exports.drawPlayer = function drawPlayer(context, offset, data) {
  drawPlayerName(context, offset, data);

  var img = new Image();
  img.onload = function () {
    drawPlayerImage(context, offset, data, img);
  };
  img.src = data.img;

  drawPlayerOutline(context, offset, data);
  drawPlayerImage(context, offset, data, img);
};

var drawPlayerName = function drawPlayerName(context, offset, data) {
  context.fillStyle = PLAYER_INFO_COLOR;
  context.font = "bold 14px Arial";
  context.fillText(data.name, data.pos[0] + offset[0] + data.radius + 3, data.pos[1] + offset[1]);
};

var drawPlayerImage = function drawPlayerImage(context, offset, data, img) {
  context.drawImage(img, data.pos[0] + offset[0] - data.radius, data.pos[1] + offset[1] - data.radius, data.radius * 2, data.radius * 2);
};

var drawPlayerOutline = function drawPlayerOutline(context, offset, data) {
  if (data.direHit) drawPlayerDireHit(context, offset, data);

  context.beginPath();
  context.arc(data.pos[0] + offset[0], data.pos[1] + offset[1], data.radius, 0, 2 * Math.PI);

  context.lineWidth = NORMAL_OUTLINE_WIDTH;
  context.strokeStyle = PLAYER_INFO_COLOR;
  context.stroke();

  if (data.activatingDireHit || data.direHit) {
    drawDireHitOutline(context, offset, data);
  }
};

var drawDireHitOutline = function drawDireHitOutline(context, offset, data) {
  context.beginPath();
  context.arc(data.pos[0] + offset[0], data.pos[1] + offset[1], data.radius + NORMAL_OUTLINE_WIDTH * 0.75, 0, 2 * Math.PI);

  context.lineWidth = NORMAL_OUTLINE_WIDTH * 0.75;
  context.strokeStyle = DIRE_HIT_COLOR;
  context.stroke();
};

var drawPlayerDireHit = function drawPlayerDireHit(context, offset, data) {
  context.beginPath();
  context.fillStyle = SPIKES_COLOR;
  context.fillRect(data.pos[0] + offset[0] - data.radius - DIRE_HIT_OUTLINE_WIDTH / 2 + 2, data.pos[1] + offset[1] - data.radius - DIRE_HIT_OUTLINE_WIDTH / 2 + 2, data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4, data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4);

  drawRotatedSquare(context, offset, data);
};

var drawRotatedSquare = function drawRotatedSquare(context, offset, data) {
  context.save();

  context.translate(data.pos[0] + offset[0], data.pos[1] + offset[1]);

  context.rotate(Math.PI / 4);
  context.fillStyle = SPIKES_COLOR;
  context.fillRect(-(data.radius + DIRE_HIT_OUTLINE_WIDTH / 2) + 2, -(data.radius + DIRE_HIT_OUTLINE_WIDTH / 2) + 2, data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4, data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4);

  context.restore();
};

var PLAYER_INFO_COLOR = "#000";
var DIRE_HIT_COLOR = "#ff3d00";
var SPIKES_COLOR = "#fffc00";
var NORMAL_OUTLINE_WIDTH = 5;
var DIRE_HIT_OUTLINE_WIDTH = 10;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var POKEMON_IDS = [1, 4, 7, 24, 29, 34, 92, 112, 147, 152, 155, 158, 220, 304, 371];

var Util = {
  dist: function dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },
  randomRadius: function randomRadius() {
    return Math.floor(Math.random() * (20 - 5)) + 5;
  },
  randomVelocity: function randomVelocity() {
    return [this.randomVelocityPiece(), this.randomVelocityPiece()];
  },
  randomVelocityPiece: function randomVelocityPiece() {
    return Math.floor(Math.random() * (1.2 + 1.2)) - 1.2;
  },
  randomPokemonId: function randomPokemonId() {
    return POKEMON_IDS[Math.floor(Math.random() * POKEMON_IDS.length)];
  },
  randomPlayerName: function randomPlayerName() {
    return POKEMON_CHARACTER_NAMES[Math.floor(Math.random() * POKEMON_CHARACTER_NAMES.length)];
  },
  randomId: function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },


  DEFAULT_RADIUS: 15,

  POKEMON_IDS: POKEMON_IDS
};

var POKEMON_CHARACTER_NAMES = ["Misty", "Lass", "Beauty", "Serena", "Bonnie", "Iris", "Jessie", "Lillie", "May", "Dawn", "Moon", "Mallow", "Sakura", "Shauna", "Candela", "Officer Jenny", "Aria", "Olivia", "Lusamine", "Lana", "Professor Ivy", "Mom", "Sabrina", "Viola", "Daisy", "Bianca", "Sumomo", "Blanche", "Agatha", "Georgia", "Grace", "Malva", "Karen"];

module.exports = Util;

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(131);

var _game_view = __webpack_require__(206);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("game-canvas");
  canvas.width = _game.CANVAS_X;
  canvas.height = _game.CANVAS_Y;

  var context = canvas.getContext("2d");
  var socket = io();

  var gameView = new _game_view2.default(context, socket);
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map