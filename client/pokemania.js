import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {

  // const socket = io.connect("http://localhost", { port: 3000 });
  window.socket = io();
  window.socket.on("test", data => {
    debugger;
  });
  debugger
  const canvas = document.getElementById("game-canvas");
  canvas.width = Game.CANVAS_X;
  canvas.height = Game.CANVAS_Y;

  const context = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, context);
});
