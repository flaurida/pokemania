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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(context, staticAssets) {
    _classCallCheck(this, Game);

    this.context = context;
    this.players = {};
    this.staticAssets = staticAssets;

    this.draw = this.draw.bind(this);
  }

  _createClass(Game, [{
    key: "draw",
    value: function draw(offset, players) {
      var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.context.clearRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);
      this.context.fillStyle = Game.BG_COLOR;
      this.context.fillRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);

      if (loading) {
        this.drawLoadingScreen();
      } else {
        this.drawBoard(offset);
        this.drawPlayers(offset, players);
      }
    }
  }, {
    key: "drawPlayers",
    value: function drawPlayers(offset, players) {
      var _this = this;

      Object.keys(players).forEach(function (playerId) {
        var player = players[playerId];

        if (!_this.outOfCanvasBounds(player, offset)) {
          var currentPlayer = playerId === _this.currentPlayerId;
          _this.drawOrInitializePlayer(offset, player, playerId, currentPlayer);
        }
      });
    }
  }, {
    key: "drawOrInitializePlayer",
    value: function drawOrInitializePlayer(offset, player, playerId, currentPlayer) {
      if (this.players[playerId]) {
        this.players[playerId].draw(offset, player);
      } else {
        this.players[playerId] = new _player2.default(this.context, player, this.staticAssets, currentPlayer);
      }
    }
  }, {
    key: "drawLoadingScreen",
    value: function drawLoadingScreen() {
      this.context.fillStyle = Game.BORDER_COLOR;
      this.context.font = "bold 50px Arial";

      this.context.fillText("Loading...", Game.CANVAS_X / 2 - 110, Game.CANVAS_Y / 2);
    }
  }, {
    key: "drawBoard",
    value: function drawBoard(offset) {
      this.context.save();
      this.context.translate(offset[0], offset[1]);

      this.context.strokeStyle = Game.BORDER_COLOR;
      this.context.lineWidth = Game.BORDER_WIDTH;
      this.context.rect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.context.stroke();

      this.context.fillStyle = Game.GRASS_COLOR;
      this.context.fill();

      var pattern = this.context.createPattern(this.staticAssets.images["assets/img/grass.png"], "repeat");
      this.context.fillStyle = pattern;
      this.context.fill();

      this.context.restore();
    }
  }, {
    key: "outOfCanvasBounds",
    value: function outOfCanvasBounds(player, offset) {
      var pos = player.pos,
          radius = player.radius;

      return pos[0] + offset[0] + radius < 0 || pos[0] + offset[0] - radius > Game.CANVAS_X || pos[1] + offset[1] + radius < 0 || pos[1] + offset[1] - radius > Game.CANVAS_Y;
    }
  }, {
    key: "drawCountdown",
    value: function drawCountdown(time) {
      this.context.beginPath();
      this.context.rect(20, 20, 100, 40);
      this.context.fillStyle = 'white';
      this.context.fill();
      this.context.lineWidth = Game.COUNTDOWN_WIDTH;
      this.context.strokeStyle = Game.BORDER_COLOR;

      this.context.fillStyle = Game.BORDER_COLOR;
      this.context.font = "bold 24px Arial";

      this.context.fillText(Math.floor(time) / 1000, 25, 45);
    }
  }, {
    key: "setCurrentPlayerId",
    value: function setCurrentPlayerId(playerId) {
      this.currentPlayerId = playerId;
    }
  }]);

  return Game;
}();

Game.BG_COLOR = "#8bf1ff";
Game.BORDER_WIDTH = 15;
Game.COUNTDOWN_WIDTH = 5;
Game.BORDER_COLOR = "#001f95";
Game.GRASS_COLOR = "#88ddb1";
Game.DIM_X = 2000;
Game.DIM_Y = 2000;
Game.CANVAS_X = 800;
Game.CANVAS_Y = 500;

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(4);

var _util2 = _interopRequireDefault(_util);

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _static_assets = __webpack_require__(3);

var _static_assets2 = _interopRequireDefault(_static_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(context, socket) {
    _classCallCheck(this, GameView);

    this.context = context;
    this.staticAssets = new _static_assets2.default(this.receiveLoadedImages.bind(this));
    this.game = new _game2.default(this.context, this.staticAssets);
    this.socket = socket;
    this.currentPlayerId = null;
    this.playStatus = "startScreen";

    this.setEventHandlers();
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      this.bindKeyHandlers();
      this.currentPlayerId = this.currentPlayerId || _util2.default.randomId();
      this.game.setCurrentPlayerId(this.currentPlayerId);
      this.activateScreen("playGame");
      this.activateDireHitTime = null;
      this.playStatus = "playing";
      this.initialData = false;

      var pokemonId = this.selectedPokemonImage ? this.selectedPokemonImage.data : null;

      this.socket.emit("new player", {
        name: this.name,
        pokemonId: pokemonId,
        id: this.currentPlayerId
      });
    }
  }, {
    key: 'receiveLoadedImages',
    value: function receiveLoadedImages() {
      this.imgLoaded = true;
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

        if (this.initialData && this.imgLoaded) {
          var offset = this.getCurrentPlayerOffset(data);
          this.game.draw(offset, data);
          this.handleDireHitCountdown();
        } else {
          this.game.draw(null, data, true);
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
          this.game.drawCountdown(this.activateDireHitTime - currentTime);
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
        _this2.populateSelectList();
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
    key: 'populateSelectList',
    value: function populateSelectList() {
      var pokemonList = document.getElementById("pokemon-list");

      if (this.imgLoaded) {
        this.addPokemonToSelectList(pokemonList);
      } else {
        setTimeout(this.populateSelectList.bind(this), 100);
      }
    }
  }, {
    key: 'addPokemonToSelectList',
    value: function addPokemonToSelectList(pokemonList) {
      var _this3 = this;

      var selectListLoading = document.getElementById("select-loading");
      selectListLoading.className = "hidden";

      if (!pokemonList.firstChild) {
        _util2.default.POKEMON_IDS.forEach(function (pokemonId) {
          var pokemonListItem = document.createElement("li");
          var pokemonUrl = 'assets/img/pokemon-' + pokemonId + '.png';
          var pokemonImage = _this3.staticAssets.images[pokemonUrl];
          pokemonImage.className = "select-pokemon-img";
          pokemonImage.data = pokemonId;

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
      return [_game2.default.CANVAS_X / 2 - data[this.currentPlayerId].pos[0], _game2.default.CANVAS_Y / 2 - data[this.currentPlayerId].pos[1]];
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(context, data, staticAssets) {
    var currentPlayer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Player);

    this.context = context;
    this.staticAssets = staticAssets;
    this.currentPlayer = currentPlayer;

    this.imgLoaded = false;
    this.fetchImage(data.img);
  }

  _createClass(Player, [{
    key: "fetchImage",
    value: function fetchImage(url) {
      if (this.currentPlayer && url === "assets/img/egg.png") {
        url = "assets/img/current_player_egg.png";
      }

      if (this.staticAssets.images[url]) {
        this.img = this.staticAssets.images[url];
        this.imgLoaded = true;
      } else {
        this.loadImage(url);
      }
    }
  }, {
    key: "loadImage",
    value: function loadImage(url) {
      var _this = this;

      this.img = new Image();

      this.img.onload = function () {
        _this.imgLoaded = true;
        _this.staticAssets.addLoadedImage(url, _this.img);
      };

      this.img.src = url;
    }
  }, {
    key: "resetImage",
    value: function resetImage(url) {
      this.imgLoaded = false;
      this.fetchImage(url);
    }
  }, {
    key: "checkNewImage",
    value: function checkNewImage(url) {
      if (!this.img.src.includes(url)) {
        this.resetImage(url);
      }
    }
  }, {
    key: "draw",
    value: function draw(offset, data) {
      this.checkNewImage(data.img);
      this.drawName(offset, data);
      this.drawOutline(offset, data);

      this.drawImage(offset, data);
    }
  }, {
    key: "drawName",
    value: function drawName(offset, data) {
      this.context.fillStyle = Player.PLAYER_INFO_COLOR;
      this.context.font = "bold 14px Arial";

      this.context.fillText(data.name, data.pos[0] + offset[0] + data.radius + 3, data.pos[1] + offset[1]);
    }
  }, {
    key: "drawImage",
    value: function drawImage(offset, data) {
      var img = this.imgLoaded ? this.img : this.staticAssets.images["assets/img/evolve.png"];

      this.context.drawImage(img, data.pos[0] + offset[0] - data.radius, data.pos[1] + offset[1] - data.radius, data.radius * 2, data.radius * 2);
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(offset, data) {
      if (data.direHit) this.drawDireHit(offset, data);

      this.context.beginPath();
      this.context.arc(data.pos[0] + offset[0], data.pos[1] + offset[1], data.radius, 0, 2 * Math.PI);

      this.context.lineWidth = Player.NORMAL_OUTLINE_WIDTH;
      this.context.strokeStyle = Player.PLAYER_INFO_COLOR;
      this.context.stroke();

      if (data.activatingDireHit || data.direHit) {
        this.drawDireHitOutline(offset, data);
      }
    }
  }, {
    key: "drawDireHitOutline",
    value: function drawDireHitOutline(offset, data) {
      this.context.beginPath();
      this.context.arc(data.pos[0] + offset[0], data.pos[1] + offset[1], data.radius + Player.NORMAL_OUTLINE_WIDTH * 0.75, 0, 2 * Math.PI);

      this.context.lineWidth = Player.NORMAL_OUTLINE_WIDTH * 0.75;
      this.context.strokeStyle = Player.DIRE_HIT_COLOR;
      this.context.stroke();
    }
  }, {
    key: "drawDireHit",
    value: function drawDireHit(offset, data) {
      this.context.beginPath();
      this.context.fillStyle = Player.SPIKES_COLOR;
      this.context.fillRect(data.pos[0] + offset[0] - data.radius - Player.DIRE_HIT_OUTLINE_WIDTH / 2 + 2, data.pos[1] + offset[1] - data.radius - Player.DIRE_HIT_OUTLINE_WIDTH / 2 + 2, data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4, data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4);

      this.drawRotatedSquare(offset, data);
    }
  }, {
    key: "drawRotatedSquare",
    value: function drawRotatedSquare(offset, data) {
      this.context.save();

      this.context.translate(data.pos[0] + offset[0], data.pos[1] + offset[1]);

      this.context.rotate(Math.PI / 4);
      this.context.fillStyle = Player.SPIKES_COLOR;
      this.context.fillRect(-(data.radius + Player.DIRE_HIT_OUTLINE_WIDTH / 2) + 2, -(data.radius + Player.DIRE_HIT_OUTLINE_WIDTH / 2) + 2, data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4, data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4);

      this.context.restore();
    }
  }]);

  return Player;
}();

Player.PLAYER_INFO_COLOR = "#000";
Player.DIRE_HIT_COLOR = "#ff3d00";
Player.SPIKES_COLOR = "#fffc00";
Player.NORMAL_OUTLINE_WIDTH = 5;
Player.DIRE_HIT_OUTLINE_WIDTH = 10;

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(4);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StaticAssets = function () {
  function StaticAssets(notifyCallback) {
    _classCallCheck(this, StaticAssets);

    this.loadedCount = 0;
    this.images = {};
    this.notifyCallback = notifyCallback;

    this.loadImages();
  }

  _createClass(StaticAssets, [{
    key: "addImage",
    value: function addImage(url) {
      var _this = this;

      this.images[url] = new Image();

      this.images[url].onload = function () {
        _this.loadedCount++;

        if (_this.checkAllLoaded()) {
          _this.notifyCallback();
        }
      };

      this.images[url].src = url;
    }
  }, {
    key: "addLoadedImage",
    value: function addLoadedImage(url, loadedImage) {
      this.images[url] = loadedImage;
    }
  }, {
    key: "loadImages",
    value: function loadImages() {
      var _this2 = this;

      StaticAssets.IMAGE_URLS.forEach(function (imageUrl) {
        _this2.addImage(imageUrl);
      });
    }
  }, {
    key: "checkAllLoaded",
    value: function checkAllLoaded() {
      return this.loadedCount === Object.keys(this.images).length;
    }
  }]);

  return StaticAssets;
}();

StaticAssets.IMAGE_URLS = _util2.default.POKEMON_IDS.map(function (pokemonId) {
  return "assets/img/pokemon-" + pokemonId + ".png";
}).concat(["assets/img/egg.png", "assets/img/current_player_egg.png", "assets/img/grass.png", "assets/img/evolve.png"]);

exports.default = StaticAssets;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game_view = __webpack_require__(1);

var _game_view2 = _interopRequireDefault(_game_view);

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("game-canvas");
  canvas.width = _game2.default.CANVAS_X;
  canvas.height = _game2.default.CANVAS_Y;

  var context = canvas.getContext("2d");
  var socket = io();

  var gameView = new _game_view2.default(context, socket);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map