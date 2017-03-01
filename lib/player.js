import Util from './util';

class Player {
  constructor(options) {
    this.pos = options.pos;
    this.velocity = options.velocity || [0, 0];
    this.radius = 15;
    this.name = options.name || "Laura";
    this.color = options.color || "#ff00fc";
    this.game = options.game;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI
    );
    context.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      deltaX = this.velocity[0] * velocityScale,
      deltaY = this.velocity[1] * velocityScale;

    const newPos = [this.pos[0] + deltaX, this.pos[1] + deltaY];
    if (this.game.outOfBounds(newPos)) return;
    this.pos = newPos;
  }

  isCollidedWith(otherPlayer) {
    const centerDist = Util.dist(this.pos, otherPlayer.pos);
    return centerDist < (this.radius + otherPlayer.radius);
  }

  remove() {
    this.game.removePlayer(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export default Player;
