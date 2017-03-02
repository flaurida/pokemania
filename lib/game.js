import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';
import Util from './util';

class Game {
  constructor() {
    this.humanPlayers = [];
    this.computerPlayers = [];

    this.addComputerPlayers(30);
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

  addNewHumanPlayer() {
    const humanPlayer = new HumanPlayer({
      pos: this.randomPos(),
      game: this
    });

    this.addPlayer(humanPlayer);
    return humanPlayer;
  }

  addNewComputerPlayer() {
    const computerPlayer = new ComputerPlayer({
      pos: this.randomPos(),
      game: this,
      velocity: Util.randomVelocity(),
      radius: Util.randomRadius(),
      name: Util.randomPlayerName(),
      color: "#293283"
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

  draw(context, offset) {
    context.clearRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);
    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);

    this.allPlayers().forEach(player => {
      if (!this.outOfCanvasBounds(player, offset)) {
        player.draw(context, offset);
      }
    });

    this.drawBorder(context, offset);
  }

  drawBorder(context, offset) {
    context.strokeStyle = "#000";
    context.lineWidth = Game.BORDER_WIDTH;
    context.strokeRect(offset[0], offset[1], Game.DIM_X, Game.DIM_Y);
    context.stroke();
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkCollisions();
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

        if (player1.isCollidedWith(player2)) {
          player1.handleCollision(player2);
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

  outOfCanvasBounds(player, offset) {
    const pos = player.pos,
      radius = player.radius;

    return (pos[0] + offset[0] + radius < 0 ||
    pos[0] + offset[0] - radius > Game.CANVAS_X ||
    pos[1] + offset[1] + radius < 0 ||
    pos[1] + offset[1] - radius > Game.CANVAS_Y);
  }

  randomPos() {
    return [
      (Game.DIM_X - 50) * Math.random() + 25,
      (Game.DIM_Y - 50) * Math.random() + 25
    ];
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

Game.BG_COLOR = "#c8eafb";
Game.BORDER_WIDTH = 7;
Game.DIM_X = 2000;
Game.DIM_Y = 2000;
Game.CANVAS_X = 700;
Game.CANVAS_Y = 450;

export default Game;
