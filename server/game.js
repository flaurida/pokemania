const HumanPlayer = require('./human_player');
const ComputerPlayer = require('./computer_player');
const Util = require('./util');

class Game {
  constructor() {
    this.humanPlayers = [];
    this.computerPlayers = [];

    this.addComputerPlayers(40);
  }

  findHumanPlayer(id) {
    for (let i = 0; i < this.humanPlayers.length; i++) {
      if (this.humanPlayers[i].id === id) {
        return this.humanPlayers[i];
      }
    }

    return false;
  }

  isEmpty() {
    return this.humanPlayers.length <= 0;
  }

  addPlayer(player) {
    if (player instanceof HumanPlayer) {
      this.humanPlayers.push(player);
    } else if (player instanceof ComputerPlayer) {
      this.computerPlayers.push(player);
    } else {
      throw "unknown type of player :(";
    }
  }

  addNewHumanPlayer(name, id) {
    const humanPlayer = new HumanPlayer({
      pos: this.randomPos(true),
      game: this,
      name: name,
      id: id,
      radius: Util.DEFAULT_RADIUS,
    });

    this.addPlayer(humanPlayer);
    return humanPlayer;
  }

  addNewComputerPlayer() {
    const computerPlayer = new ComputerPlayer({
      pos: this.randomPos(),
      game: this
    });

    this.addPlayer(computerPlayer);
    return computerPlayer;
  }

  addComputerPlayers(n) {
    for (let i = 0; i < n; i++) {
      this.addNewComputerPlayer();
    }
  }

  allPlayers() {
    return [].concat(this.humanPlayers, this.computerPlayers);
  }

  humanPlayersInclude(player) {
    return this.humanPlayers.includes(player);
  }

  refillIfNeeded(n) {
    if (this.humanPlayers.length + this.computerPlayers.length < n) {
      this.addComputerPlayers(n);
    }
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkCollisions();
    this.refillIfNeeded(10);
    return this.parsePlayerData();
  }

  parsePlayerData() {
    const data = {};

    this.allPlayers().forEach(player => {
      data[player.id] = {
        pos: player.pos,
        radius: player.radius,
        name: player.name,
        img: player.img,
        direHit: player.direHit
      };
    });

    return data;
  }

  moveObjects(timeDelta) {
    this.allPlayers().forEach(player => {
      if (player instanceof HumanPlayer) {
        player.velocity[0] *= 0.9;
        player.velocity[1] *= 0.9;
      }

      player.move(timeDelta);
    });
  }

  checkCollisions() {
    const allPlayers = this.allPlayers();

    for (let i = 0; i < allPlayers.length; i++) {
      for (let j = i + 1; j < allPlayers.length; j++) {
        const player1 = allPlayers[i];
        const player2 = allPlayers[j];

        const proximity = player1.proximityTo(player2);
        if (proximity === "collision") {
          player1.handleCollision(player2);
        } else if (proximity === "danger") {
          player1.handleDanger(player2);
        }
      }
    }
  }

  outOfBounds(player) {
    const pos = player.pos,
      radius = player.radius;

    return (pos[0] - radius < 0) || (pos[1] - radius < 0) ||
      (pos[0] > Game.DIM_X - radius) || (pos[1] > Game.DIM_Y - radius);
  }

  randomPos(humanPlayer = false) {
    let randomPos = [this.randomCoord("x"), this.randomCoord("y")];
    if (!humanPlayer) return randomPos;

    const allPlayers = this.allPlayers();
    let overlap = this.checkForOverlap(allPlayers, randomPos);

    while (overlap) {
      randomPos = [this.randomCoord("x"), this.randomCoord("y")];
      overlap = this.checkForOverlap(allPlayers, randomPos);
    }

    return randomPos;
  }

  checkForOverlap(allPlayers, pos) {
    for (let i = 0; i < allPlayers.length; i++) {
      const otherPlayer = allPlayers[i];

      if (otherPlayer.isOverlappingWith(pos)) {
        return true;
      }
    }

    return false;
  }

  randomCoord(coord) {
    if (coord === "x") return (Game.DIM_X - 50) * Math.random() + 25;
    else if (coord === "y") return (Game.DIM_Y - 50) * Math.random() + 25;
    return null;
  }

  removePlayer(player) {
    if (player instanceof HumanPlayer) {
      this.humanPlayers.splice(this.humanPlayers.indexOf(player), 1);
    } else if (player instanceof ComputerPlayer) {
      this.computerPlayers.splice(this.computerPlayers.indexOf(player), 1);
    } else {
      throw "unknown type of player :(";
    }
  }
}

Game.DIM_X = 2000;
Game.DIM_Y = 2000;
Game.CANVAS_X = 700;
Game.CANVAS_Y = 450;

module.exports = Game;
