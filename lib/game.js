import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';
import Util from './util';

class Game {
  constructor() {
    this.humanPlayers = [];
    this.computerPlayers = [];

    this.addComputerPlayers(15);
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

  draw(context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allPlayers().forEach(player => {
      player.draw(context);
    });
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

  outOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  randomPos() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
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
Game.DIM_X = 800;
Game.DIM_Y = 600;

export default Game;
