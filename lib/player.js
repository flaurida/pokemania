import Util from './util';

class Player {
  constructor(options) {
    this.pos = options.pos;
    this.velocity = options.velocity || [0, 0];
    this.radius = options.radius || DEFAULT_RADIUS;
    this.name = options.name || "Misty";
    this.color = options.color || "#ff00fc";
    this.game = options.game;
  }

  draw(context, offset) {
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(
      this.pos[0] + offset[0],
      this.pos[1] + offset[1],
      this.radius, 0, 2 * Math.PI
    );

    context.fill();

    context.fillStyle = PLAYER_NAME_COLOR;
    context.font = "bold 14px Arial";
    context.fillText(
      this.name,
      this.pos[0] + offset[0] + this.radius,
      this.pos[1] + offset[1]
    );
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      sizeScale = (DEFAULT_RADIUS / this.radius - 1) / 4,
      deltaX = this.velocity[0] * velocityScale * (1 + sizeScale),
      deltaY = this.velocity[1] * velocityScale * (1 + sizeScale),
      oldPos = this.pos;

    this.pos = [this.pos[0] + deltaX, this.pos[1] + deltaY];
    if (this.game.outOfBounds(this)) {
      this.adjustOutOfBounds();
      this.pos = oldPos;
    }
  }

  adjustOutOfBounds() {
    if (this.pos[0] > this.game.constructor.DIM_X - this.radius || this.pos[0] < this.radius) {
      this.velocity[0] = -this.velocity[0];
    }

    if (this.pos[1] > this.game.constructor.DIM_Y - this.radius || this.pos[1] < this.radius) {
      this.velocity[1] = -this.velocity[1];
    }
  }

  isCollidedWith(otherPlayer) {
    const centerDist = Util.dist(this.pos, otherPlayer.pos);
    return centerDist < (this.radius + otherPlayer.radius);
  }

  handleCollision(otherPlayer) {
    if (this.radius > otherPlayer.radius) {
      this.radius += otherPlayer.radius / 2;
      otherPlayer.remove();
    } else {
      otherPlayer.radius += this.radius / 2;
      this.remove();
    }
  }

  remove() {
    this.game.removePlayer(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
const PLAYER_NAME_COLOR = "#000";
const DEFAULT_RADIUS = 15;

export default Player;
