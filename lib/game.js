import HumanPlayer from './human_player';

class Game {
  constructor() {
    this.humanPlayers = [];
    this.computerPlayers = [];
  }

  addPlayer(player) {
    this.humanPlayers.push(player);
  }

  addNewHumanPlayer() {
    const humanPlayer = new HumanPlayer({
      pos: this.randomPos(),
      game: this
    });

    this.addPlayer(humanPlayer);
    return humanPlayer;
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
      player.move(timeDelta);
    });
  }

  checkCollisions() {

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
    this.players.splice(this.players.indexOf(player), 1);
  }
}

Game.BG_COLOR = "#c8eafb";
Game.DIM_X = 800;
Game.DIM_Y = 600;

export default Game;
