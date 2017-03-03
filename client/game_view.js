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

    this.socket.emit("new player", { name: this.name, id: this.currentPlayerId });
  }

  setEventHandlers() {
    this.addStartClickListener();
    this.addRestartClickListener();

    this.socket.on("draw game", this.drawGame.bind(this));
  }

  drawGame(data) {
    if (this.playStatus === "restartScreen") return;

    if (this.playStatus === "playing") {
      if (this.resetIfLost(data)) return;
      this.powerCurrentPlayer();
      const offset = this.getCurrentPlayerOffset(data);
      drawGame(this.context, offset, data);
    }
  }

  resetIfLost(data) {
    if (!data[this.currentPlayerId]) {
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

    canvas.className = "";
    startScreen.className = "hidden";
    restartScreen.className = "hidden";
  }

  setGameRestartScreen() {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");

    canvas.className = "hidden";
    startScreen.className = "hidden";
    restartScreen.className = "";
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
