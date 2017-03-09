import Player from './player';

class Game {
  constructor(context, staticAssets) {
    this.context = context;
    this.players = {};
    this.staticAssets = staticAssets;

    this.draw = this.draw.bind(this);
  }

  draw(offset, players, loading = false) {
    this.context.clearRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);
    this.context.fillStyle = Game.BG_COLOR;
    this.context.fillRect(0, 0, Game.CANVAS_X, Game.CANVAS_Y);

    if (loading) {
      this.drawLoadingScreen();
    } else {
      this.drawBoard(offset);
      this.drawPlayers(offset, players);
    }
  }

  drawPlayers(offset, players) {
    Object.keys(players).forEach(playerId => {
      const player = players[playerId];

      if (!this.outOfCanvasBounds(player, offset)) {
        const currentPlayer = playerId === this.currentPlayerId;
        this.drawOrInitializePlayer(offset, player, playerId, currentPlayer);
      }
    });
  }

  drawOrInitializePlayer(offset, player, playerId, currentPlayer) {
    if (this.players[playerId]) {
      this.players[playerId].draw(offset, player);
    } else {
      this.players[playerId] = new Player(
        this.context,
        player,
        this.staticAssets,
        currentPlayer
      );
    }
  }

  drawLoadingScreen() {
    this.context.fillStyle = Game.BORDER_COLOR;
    this.context.font = "bold 50px Arial";

    this.context.fillText(
      "Loading...",
      Game.CANVAS_X / 2 - 110,
      Game.CANVAS_Y / 2
    );
  }

  drawBoard(offset) {
    this.context.save();
    this.context.translate(offset[0], offset[1]);

    this.context.strokeStyle = Game.BORDER_COLOR;
    this.context.lineWidth = Game.BORDER_WIDTH;
    this.context.rect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.context.stroke();

    this.context.fillStyle = Game.GRASS_COLOR;
    this.context.fill();

    const pattern = this.context.createPattern(
      this.staticAssets.images["assets/img/grass.png"],
      "repeat"
    );
    this.context.fillStyle = pattern;
    this.context.fill();

    this.context.restore();
  }

  outOfCanvasBounds(player, offset) {
    const pos = player.pos,
    radius = player.radius;

    return (pos[0] + offset[0] + radius < 0 ||
      pos[0] + offset[0] - radius > Game.CANVAS_X ||
      pos[1] + offset[1] + radius < 0 ||
      pos[1] + offset[1] - radius > Game.CANVAS_Y
    );
  }

  drawCountdown(time) {
    this.context.beginPath();
    this.context.rect(20, 20, 100, 40);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.lineWidth = Game.COUNTDOWN_WIDTH;
    this.context.strokeStyle = Game.BORDER_COLOR;

    this.context.fillStyle = Game.BORDER_COLOR;
    this.context.font = "bold 24px Arial";

    this.context.fillText(Math.floor(time) / 1000, 25, 45);
  }

  setCurrentPlayerId(playerId) {
    this.currentPlayerId = playerId;
  }
}

Game.BG_COLOR = "#8bf1ff";
Game.BORDER_WIDTH = 15;
Game.COUNTDOWN_WIDTH = 5;
Game.BORDER_COLOR = "#001f95";
Game.GRASS_COLOR = "#88ddb1";
Game.DIM_X = 2000;
Game.DIM_Y = 2000;
Game.CANVAS_X = 800;
Game.CANVAS_Y = 500;

export default Game;
