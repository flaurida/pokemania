export const drawPlayer = (context, offset, data) => {
  const img = new Image();
  img.onload = () => {
    drawPlayerImage(context, offset, data, img);
  };
  img.src = data.img;

  drawPlayerImage(context, offset, data, img);

  context.fillStyle = PLAYER_NAME_COLOR;
  context.font = "bold 14px Arial";
  context.fillText(
    data.name,
    data.pos[0] + offset[0] + data.radius,
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

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
const PLAYER_NAME_COLOR = "#000";
