const Util = require('./util');

class Player {
  constructor(options) {
    this.pos = options.pos || [500, 500];
    this.velocity = options.velocity || [0, 0];
    this.radius = options.radius || DEFAULT_RADIUS;
    this.name = options.name || "Misty";
    this.pokemonId = options.pokemonId || 7;
    this.game = options.game;
    this.evolution = 0;
    this.img = new Image();
    this.img.src = "assets/img/egg.png";
  }

  evolve() {
    if (this.radius < 30 || this.evolution >= 3) {
      return;
    } else if (this.radius > 30 && this.evolution <= 0) {
      this.evolution++;
      this.img.src = `assets/img/pokemon-${this.pokemonId}.png`;
    } else if (this.radius > 60 && this.evolution <= 1) {
      this.pokemonId++;
      this.evolution++;
      this.img.src = `assets/img/pokemon-${this.pokemonId}.png`;
    } else if (this.radius > 90 && this.evolution <= 2) {
      this.pokemonId++;
      this.evolution++;
      this.img.src = `assets/img/pokemon-${this.pokemonId}.png`;
    }
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
    }
  }

  adjustOutOfBounds() {
    if (this.pos[0] > this.game.constructor.DIM_X - this.radius || this.pos[0] < this.radius) {
      this.velocity[0] = -this.velocity[0];

      if (this.pos[0] < this.radius) {
        this.pos[0] = this.radius;
      } else {
        this.pos[0] = this.game.constructor.DIM_X - this.radius;
      }
    }

    if (this.pos[1] > this.game.constructor.DIM_Y - this.radius || this.pos[1] < this.radius) {
      this.velocity[1] = -this.velocity[1];

      if (this.pos[1] < this.radius) {
        this.pos[1] = this.radius;
      } else {
        this.pos[1] = this.game.constructor.DIM_Y - this.radius;
      }
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

module.exports = Player;
