const HumanPlayer = require('./human_player');
const ComputerPlayer = require('./computer_player');
const Util = require('./util');

class Game {
  constructor() {
    this.humanPlayers = {};
    this.computerPlayers = {};

    this.addComputerPlayers(40);
  }

  findHumanPlayer(id) {
    return this.humanPlayers[id];
  }

  isEmpty() {
    return Object.keys(this.humanPlayers).length <= 0;
  }

  addPlayer(player) {
    if (player instanceof HumanPlayer) {
      this.humanPlayers[player.id] = player;
    } else if (player instanceof ComputerPlayer) {
      this.computerPlayers[player.id] = player;
    }
  }

  addNewHumanPlayer(name, pokemonId, id) {
    const humanPlayer = new HumanPlayer({
      pos: this.randomPos(true),
      game: this,
      name: name,
      pokemonId: pokemonId,
      id: id,
      radius: Util.DEFAULT_RADIUS,
      lastActivityTime: Date.now()
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
    return Object.assign({}, this.computerPlayers, this.humanPlayers);
  }

  refillIfNeeded(n) {
    if (Object.keys(this.allPlayers()).length < n) {
      this.addComputerPlayers(n);
    }
  }

  step(timeDelta, currentTime) {
    this.moveObjects(timeDelta);
    this.checkCollisions();
    this.refillIfNeeded(10);

    return {
      playerData: this.parsePlayerData(),
      inactivityData: this.removeInactivePlayers(currentTime)
    };
  }

  removeInactivePlayers(currentTime) {
    const inactivityData = [];

    Object.keys(this.humanPlayers).forEach(humanPlayerId => {
      const humanPlayer = this.humanPlayers[humanPlayerId];

      if (currentTime - humanPlayer.lastActivityTime > INACTIVE_THRESHOLD) {
        inactivityData.push(humanPlayer.id);
        this.removePlayer(humanPlayer);
      }
    });

    return inactivityData;
  }

  parsePlayerData() {
    const data = {};
    const allPlayers = this.allPlayers();

    Object.keys(allPlayers).forEach(playerId => {
      const player = allPlayers[playerId];

      data[player.id] = {
        pos: player.pos,
        radius: player.radius,
        name: player.name,
        img: player.img,
        direHit: player.direHit,
        activatingDireHit: player.activatingDireHit
      };
    });

    return data;
  }

  moveObjects(timeDelta) {
    const allPlayers = this.allPlayers();

    Object.keys(allPlayers).forEach(playerId => {
      const player = allPlayers[playerId];

      if (player instanceof HumanPlayer) {
        player.velocity[0] *= 0.9;
        player.velocity[1] *= 0.9;
      }

      player.move(timeDelta);
    });
  }

  checkCollisions() {
    const allPlayers = this.allPlayers();
    const allPlayerIds = Object.keys(allPlayers);

    for (let i = 0; i < allPlayerIds.length; i++) {
      for (let j = i + 1; j < allPlayerIds.length; j++) {
        const player1 = allPlayers[allPlayerIds[i]];
        const player2 = allPlayers[allPlayerIds[j]];

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
    const allPlayerIds = Object.keys(allPlayers);

    for (let i = 0; i < allPlayerIds.length; i++) {
      const otherPlayer = allPlayers[allPlayerIds[i]];

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
      delete this.humanPlayers[player.id];
    } else if (player instanceof ComputerPlayer) {
      delete this.computerPlayers[player.id];
    } 
  }
}

Game.DIM_X = 2000;
Game.DIM_Y = 2000;
const INACTIVE_THRESHOLD = 30000;

module.exports = Game;
