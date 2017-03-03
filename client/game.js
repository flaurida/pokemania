import { drawPlayer } from './player';

export const drawGame = (context, offset, players) => {
  context.clearRect(0, 0, CANVAS_X, CANVAS_Y);
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, CANVAS_X, CANVAS_Y);

  Object.values(players).forEach(player => {
    if (!outOfCanvasBounds(player, offset)) {
      drawPlayer(context, offset, player);
    }
  });

  drawBorder(context, offset);
};

const drawBorder = (context, offset) => {
  context.strokeStyle = "#000";
  context.lineWidth = BORDER_WIDTH;
  context.strokeRect(offset[0], offset[1], DIM_X, DIM_Y);
  context.stroke();
};

const outOfCanvasBounds = (player, offset) => {
  const pos = player.pos,
    radius = player.radius;

  return (pos[0] + offset[0] + radius < 0 ||
  pos[0] + offset[0] - radius > CANVAS_X ||
  pos[1] + offset[1] + radius < 0 ||
  pos[1] + offset[1] - radius > CANVAS_Y);
};

const BG_COLOR = "#c8eafb";
const BORDER_WIDTH = 7;
const DIM_X = 2000;
const DIM_Y = 2000;
export const CANVAS_X = 700;
export const CANVAS_Y = 450;
