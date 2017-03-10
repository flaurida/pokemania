const HumanPlayer = require('./human_player');
const Game = require('./game');

class Sockets {
  constructor(io) {
    this.socket = io;
    this.setEventHandlers();
    this.humanPlayerIds = {};
  }

  setEventHandlers() {
    this.socket.on("connection", this.onSocketConnection.bind(this));
  }

  onSocketConnection(client) {
    client.on("disconnect", () => { this.onClientDisconnect(client); });
    client.on("new player", this.onNewPlayer(client));
    client.on("move player", this.onMovePlayer.bind(this));
    client.on("dire hit player", this.onDireHitPlayer.bind(this));
  }

  onClientDisconnect(client) {
    if (this.game) {
      this.game.removePlayer(this.humanPlayerIds[client.id]);
    }
  }

  onNewPlayer(client) {
    return data => {
      if (!this.game) {
        this.startNewGame();
      }

      const humanPlayer = this.game.addNewHumanPlayer(
        data.name,
        data.pokemonId,
        data.id);

      this.humanPlayerIds[client.id] = humanPlayer;
    };
  }

  startNewGame() {
    this.game = new Game();
    this.lastTime = Date.now();
    this.gameLoop = setInterval(this.stepCurrentGame.bind(this), REDRAW_RATE);
  }

  stepCurrentGame() {
    if (this.closeGameIfNeeded()) return;
    const currentTime = Date.now();
    const timeDelta = currentTime - this.lastTime;
    const data = this.game.step(timeDelta, currentTime);

    this.notifyInactivePlayers(data.inactivityData);
    this.socket.emit("draw game", data.playerData);
    this.lastTime = currentTime;
  }

  notifyInactivePlayers(inactivePlayerIds) {
    inactivePlayerIds.forEach(inactivePlayerId => {
      this.socket.emit("inactive player", { id: inactivePlayerId });
    });
  }

  closeGameIfNeeded() {
    if (this.game.isEmpty()) {
      this.stopGame();
      return true;
    }

    return false;
  }

  stopGame() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.game = null;
  }

  onMovePlayer(data) {
    if (!this.game) return;
    const player = this.game.findHumanPlayer(data.id);
    if (player) player.power(data.impulses);
  }

  onDireHitPlayer(data) {
    const player = this.game.findHumanPlayer(data.id);
    if (player && !player.activatingDireHit) {
      player.activateDireHit();
      this.socket.emit("activate dire hit",
        { id: player.id, lag: player.direHitDelay() }
      );
    }
  }
}

const REDRAW_RATE = 1000 / 20;

module.exports = Sockets;
