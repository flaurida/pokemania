const HumanPlayer = require('./human_player');
const Game = require('./game');

class Sockets {
  constructor(io, app) {
    this.socket = io.listen(app);
    this.setEventHandlers();
  }

  setEventHandlers() {
    this.socket.on("connection", this.onSocketConnection.bind(this));
  }

  onSocketConnection(client) {
    console.log("New player has connected: " + client.id);
    client.on("disconnect", this.onClientDisconnect.bind(this));
    client.on("new player", this.onNewPlayer.bind(this));
    client.on("move player", this.onMovePlayer.bind(this));
    client.on("dire hit player", this.onDireHitPlayer.bind(this));
  }

  onClientDisconnect() {
    console.log("Player has disconnected: " + this.id);
  }

  onNewPlayer(data) {
    if (!this.game) {
      this.startNewGame();
    }

    this.game.addNewHumanPlayer(data.name, data.pokemonId, data.id);
  }

  startNewGame() {
    this.game = new Game();
    this.lastTime = Date.now();
    this.gameLoop = setInterval(this.stepCurrentGame.bind(this), 1000 / 60);
  }

  stepCurrentGame() {
    if (this.closeGameIfNeeded()) return;
    const currentTime = Date.now();
    const timeDelta = currentTime - this.lastTime;
    const data = this.game.step(timeDelta, currentTime);

    this.socket.emit("draw game", data.playerData);
    this.notifyInactivePlayers(data.inactivityData);
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
    if (!this.game) return;
    const player = this.game.findHumanPlayer(data.id);
    if (player && !player.activatingDireHit) {
      player.activateDireHit();
      this.socket.emit("activate dire hit",
        { id: player.id, lag: player.direHitDelay() });
    }
  }
}

module.exports = Sockets;
