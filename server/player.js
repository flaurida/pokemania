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
    this.direHit = false;
    this.activatingDireHit = false;
    this.lastActivityTime = options.lastActivityTime || null;
  }

  direHitDelay() {
    return this.radius / 15 * DIRE_HIT_DELAY;
  }

  activateDireHit() {
    if (this.activatingDireHit) return;
    setTimeout(this.useDireHit.bind(this), this.direHitDelay());
    this.activatingDireHit = true;
  }

  useDireHit() {
    this.direHit = true;
    setTimeout(this.direHitWearsOff.bind(this), DIRE_HIT_DURATION);
  }

  direHitWearsOff() {
    this.direHit = false;
    this.activatingDireHit = false;
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
      sizeScale = (Util.DEFAULT_RADIUS / this.radius - 1) / 3,
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

  isOverlappingWith(pos) {
    const centerDist = Util.dist(this.pos, pos);
    return centerDist < (this.radius + 50);
  }

  proximityTo(otherPlayer) {
    const dist = Util.dist(this.pos, otherPlayer.pos);

    if (dist < (this.radius + otherPlayer.radius)) {
      return "collision";
    } else if (dist < (this.radius + otherPlayer.radius + NEARNESS_THRESHOLD)) {
      return "danger";
    } else {
      return null;
    }
  }

  handleCollision(otherPlayer) {
    if (this.radius > otherPlayer.radius) {
      if (!this.direHit && otherPlayer.direHit) {
        otherPlayer.radius += this.radius / 2;
        this.remove();
      } else {
        this.radius += otherPlayer.radius / 2;
        otherPlayer.remove();
      }
    } else {
      if (this.direHit && !otherPlayer.direHit) {
        this.radius += otherPlayer.radius / 2;
        otherPlayer.remove();
      } else {
        otherPlayer.radius += this.radius / 2;
        this.remove();
      }
    }
  }

  remove() {
    this.game.removePlayer(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
const DIRE_HIT_DURATION = 500;
const DIRE_HIT_DELAY = 500;
const NEARNESS_THRESHOLD = 50;

module.exports = Player;
