export const drawPlayer = (context, offset, data) => {
  drawPlayerOutline(context, offset, data);

  const img = new Image();
  img.onload = () => {
    drawPlayerImage(context, offset, data, img);
  };
  img.src = data.img;

  drawPlayerImage(context, offset, data, img);

  context.fillStyle = PLAYER_INFO_COLOR;
  context.font = "bold 14px Arial";
  context.fillText(
    data.name,
    data.pos[0] + offset[0] + data.radius + 3,
    data.pos[1] + offset[1]
  );
};

const drawPlayerImage = (context, offset, data, img) => {
  context.drawImage(
    img,
    data.pos[0] + offset[0] - data.radius,
    data.pos[1] + offset[1] - data.radius,
    data.radius * 2,
    data.radius * 2
  );
};

const drawPlayerOutline = (context, offset, data) => {
  context.beginPath();
  context.arc(
    data.pos[0] + offset[0],
    data.pos[1] + offset[1],
    data.radius,
    0,
    2 * Math.PI
  );
  
  context.lineWidth = data.direHit ? DIRE_HIT_OUTLINE_WIDTH : NORMAL_OUTLINE_WIDTH;
  context.strokeStyle = data.direHIT ? DIRE_HIT_COLOR : PLAYER_INFO_COLOR;
  context.stroke();
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
const PLAYER_INFO_COLOR = "#000";
const DIRE_HIT_COLOR = "#ff3d00";
const NORMAL_OUTLINE_WIDTH = 5;
const DIRE_HIT_OUTLINE_WIDTH = 10;
