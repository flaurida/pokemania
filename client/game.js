import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';
import Util from './util';

class Game {
  constructor() {
    this.players = [];
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
}

Game.BG_COLOR = "#c8eafb";
Game.BORDER_WIDTH = 7;
Game.DIM_X = 2000;
Game.DIM_Y = 2000;
Game.CANVAS_X = 700;
Game.CANVAS_Y = 450;

export default Game;
