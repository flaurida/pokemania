const Util = require('./util');

class Player {
  constructor(options) {
    this.pos = options.pos || [500, 500];
    this.velocity = options.velocity || Util.randomVelocity();
    this.radius = options.radius || Util.randomRadius();
    this.name = options.name || Util.randomPlayerName();
    this.pokemonId = options.pokemonId || Util.randomPokemonId();
    this.game = options.game;
    this.evolution = 0;
    this.img = "assets/img/egg.png";
    this.id = options.id || Util.randomId();
  }

  evolve() {
    if (this.radius < 30 || this.evolution >= 3) {
      return;
    } else if (this.radius > 30 && this.evolution <= 0) {
      this.evolution++;
      this.img = `assets/img/pokemon-${this.pokemonId}.png`;
    } else if (this.radius > 60 && this.evolution <= 1) {
      this.pokemonId++;
      this.evolution++;
      this.img = `assets/img/pokemon-${this.pokemonId}.png`;
    } else if (this.radius > 90 && this.evolution <= 2) {
      this.pokemonId++;
      this.evolution++;
      this.img = `assets/img/pokemon-${this.pokemonId}.png`;
    }
  }

  move(timeDelta) {
    this.evolve();

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      sizeScale = (Util.DEFAULT_RADIUS / this.radius - 1) / 4,
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

  isOverlappingWith(pos) {
    const centerDist = Util.dist(this.pos, pos);
    return centerDist < (this.radius + 50);
  }

  handleCollision(otherPlayer) {
    console.log(this.name + " X " + otherPlayer.name);
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

module.exports = Player;
