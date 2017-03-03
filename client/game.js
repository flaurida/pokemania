import { drawPlayer } from './player';

export const drawGame = (context, offset, players) => {
  context.clearRect(0, 0, CANVAS_X, CANVAS_Y);
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, CANVAS_X, CANVAS_Y);

  drawBorder(context, offset);

  Object.values(players).forEach(player => {
    if (!outOfCanvasBounds(player, offset)) {
      drawPlayer(context, offset, player);
    }
  });
};

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

export const drawCountdown = (context, time) => {
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

const BG_COLOR = "#8bf1ff";
const BORDER_WIDTH = 15;
const COUNTDOWN_WIDTH = 5;
const BORDER_COLOR = "#001f95";
const GRADIENT_COLOR_ONE = "#11e80d";
const GRADIENT_COLOR_TWO = "#0468ff";
const DIM_X = 2000;
const DIM_Y = 2000;
export const CANVAS_X = 800;
export const CANVAS_Y = 550;
