import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = Game.CANVAS_X;
  canvas.height = Game.CANVAS_Y;

  const context = canvas.getContext("2d");
  const socket = io({transports: ['websocket']});

  const gameView = new GameView(context, socket);
});
