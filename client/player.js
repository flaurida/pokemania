export const drawPlayer = (context, offset, data) => {
  drawPlayerName(context, offset, data);

  const img = new Image();
  img.onload = () => {
    drawPlayerImage(context, offset, data, img);
  };
  img.src = data.img;

  drawPlayerOutline(context, offset, data);
  drawPlayerImage(context, offset, data, img);
};

const drawPlayerName = (context, offset, data) => {
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
  if (data.direHit) drawPlayerDireHit(context, offset, data);

  context.beginPath();
  context.arc(
    data.pos[0] + offset[0],
    data.pos[1] + offset[1],
    data.radius,
    0,
    2 * Math.PI
  );

  context.lineWidth = NORMAL_OUTLINE_WIDTH;
  context.strokeStyle = PLAYER_INFO_COLOR;
  context.stroke();

  if (data.activatingDireHit || data.direHit) {
    drawDireHitOutline(context, offset, data);
  }
};

const drawDireHitOutline = (context, offset, data) => {
  context.beginPath();
  context.arc(
    data.pos[0] + offset[0],
    data.pos[1] + offset[1],
    data.radius + NORMAL_OUTLINE_WIDTH * 0.75,
    0,
    2 * Math.PI
  );

  context.lineWidth = NORMAL_OUTLINE_WIDTH * 0.75;
  context.strokeStyle = DIRE_HIT_COLOR;
  context.stroke();
};

const drawPlayerDireHit = (context, offset, data) => {
  context.beginPath();
  context.fillStyle = SPIKES_COLOR;
  context.fillRect(
    data.pos[0] + offset[0] - data.radius - DIRE_HIT_OUTLINE_WIDTH / 2 + 2,
    data.pos[1] + offset[1] - data.radius - DIRE_HIT_OUTLINE_WIDTH / 2 + 2,
    data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4,
    data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4
  );

  drawRotatedSquare(context, offset, data);
};

const drawRotatedSquare = (context, offset, data) => {
  context.save();

  context.translate(
    data.pos[0] + offset[0],
    data.pos[1] + offset[1]
  );

  context.rotate(Math.PI / 4);
  context.fillStyle = SPIKES_COLOR;
  context.fillRect(
    -(data.radius + DIRE_HIT_OUTLINE_WIDTH / 2) + 2,
    -(data.radius + DIRE_HIT_OUTLINE_WIDTH / 2) + 2,
    data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4,
    data.radius * 2 + DIRE_HIT_OUTLINE_WIDTH - 4
  );

  context.restore();
};

const PLAYER_INFO_COLOR = "#000";
const DIRE_HIT_COLOR = "#ff3d00";
const SPIKES_COLOR = "#fffc00";
const NORMAL_OUTLINE_WIDTH = 5;
const DIRE_HIT_OUTLINE_WIDTH = 10;
