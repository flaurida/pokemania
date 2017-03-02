const HumanPlayer = require('./human_player');
const Game = require('./game');

class Sockets {
  constructor(io, app) {
    this.socket = io.listen(app);
    this.setEventHandlers();
  }

  setEventHandlers() {
    this.socket.sockets.on("connection", this.onSocketConnection.bind(this));
  }

  onSocketConnection(client) {
    console.log("New player has connected: " + client.id);
    client.on("disconnect", this.onClientDisconnect.bind(this));
    client.on("new player", this.onNewPlayer.bind(this));
    client.on("move player", this.onMovePlayer.bind(this));
  }

  onClientDisconnect() {
    console.log("Player has disconnected: " + this.id);
  }

  onNewPlayer(data) {
    if (!this.game) this.game = new Game();
    const newPlayer = this.game.addNewHumanPlayer(data.name);

    this.socket.broadcast.emit("new player", {
      pos: newPlayer.pos,
      radius: newPlayer.radius,
      name: newPlayer.name,
      img: newPlayer.img.src
    });

    const existingPlayers = this.game.allPlayers();

    for (let i = 0; i < this.existingPlayers.length; i++) {
      let existingPlayer = this.existingPlayers[i];

      this.socket.emit("new player", {
        pos: existingPlayer.pos,
        radius: existingPlayer.radius,
        name: existingPlayer.name,
        img: existingPlayer.img.src
      });
    }
  }

  onMovePlayer(data) {
    // this.socket.emit("test", { name: "Laura "});

  }
}

module.exports = Sockets;
