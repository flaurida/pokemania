import { CANVAS_X, CANVAS_Y } from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = CANVAS_X;
  canvas.height = CANVAS_Y;

  const context = canvas.getContext("2d");
  const socket = io();

  const gameView = new GameView(context, socket);
});
