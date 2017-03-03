import Util from '../server/util';
import { drawGame, CANVAS_X, CANVAS_Y } from './game';

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
    this.lastTime = 0;
    this.currentPlayerId = Util.randomId();
    this.playStatus = "playing";
    this.initialData = false;

    this.socket.emit("new player", { name: this.name, id: this.currentPlayerId });
  }

  setEventHandlers() {
    this.addStartClickListener();
    this.addInstructionsClickListener();
    this.addRestartClickListener();

    this.socket.on("draw game", this.drawGame.bind(this));
  }

  drawGame(data) {
    if (this.playStatus === "restartScreen") return;

    if (this.playStatus === "playing") {
      if (this.resetIfLost(data)) return;
      this.powerCurrentPlayer();

      if (this.initialData) {
        const offset = this.getCurrentPlayerOffset(data);
        drawGame(this.context, offset, data);
      } else {
        this.checkInitialData(data);
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
      this.start(this.name);
    };
  }

  addRestartClickListener() {
    const restartButton = document.getElementById("restart-button");
    restartButton.onclick = () => {
      this.start(this.name);
    };
  }

  setGameStartScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");

    canvas.className = "";
    startScreen.className = "hidden";
    restartScreen.className = "hidden";
    instructions.className= "hidden";
  }

  setGameRestartScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");

    canvas.className = "hidden";
    startScreen.className = "hidden";
    restartScreen.className = "";
    instructions.className= "hidden";
  }

  setInstructionsScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");

    canvas.className = "hidden";
    startScreen.className = "";
    restartScreen.className = "hidden";
    instructions.classList.toggle("hidden");
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
      }
    });
  }

  getCurrentPlayerOffset(data) {
    return [
      CANVAS_X / 2 - data[this.currentPlayerId].pos[0],
      CANVAS_Y / 2 - data[this.currentPlayerId].pos[1]
    ];
  }

  powerCurrentPlayer() {
    const impulse = 0.5;
    const allImpulses = [];

    if (GameView.KEYS.up) allImpulses.push([0, -impulse]);
    if (GameView.KEYS.down) allImpulses.push([0, impulse]);
    if (GameView.KEYS.left) allImpulses.push([-impulse, 0]);
    if (GameView.KEYS.right) allImpulses.push([impulse, 0]);

    this.socket.emit("move player", { id: this.currentPlayerId, impulses: allImpulses });
  }

  activateDireHit() {
    debugger
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

export default GameView;
