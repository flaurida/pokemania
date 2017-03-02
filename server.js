const fs = require("fs");
const HumanPlayer = require('./server/player');

const handler = (req, res) => {
  let path;
  const splitUrl = req.url.split(".");

  if (req.url === "/") {
    path = __dirname + "/index.html";
  } else if (splitUrl[splitUrl.length - 1] === "css" ||
      splitUrl[splitUrl.length - 1] === "js" ||
      splitUrl[splitUrl.length - 1] === "png") {
    path = __dirname + req.url;
  } else {
    res.writeHead(404);
    return res.end("That path is not found");
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading Pokemania :(");
    }

    res.writeHead(200);
    res.end(data);
  });
};

const app = require("http").createServer(handler);
const io = require("socket.io")(app);

app.listen(3000);

class Sockets {
  constructor() {
    this.humanPlayers = [];

    this.socket = io.listen(app);
    this.setEventHandlers();
  }

  setEventHandlers() {
    this.socket.sockets.on("connection", this.onSocketConnection.bind(this));
  }

  onSocketConnection(client) {
    console.log("New player has connected: " + client.id);
    client.on("disconnect", this.onClientDisconnect);
    client.on("new player", this.onNewPlayer);
    client.on("move player", this.onMovePlayer.bind(this));
  }

  onClientDisconnect() {
    console.log("Player has disconnected: " + this.id);
  }

  onNewPlayer(data) {
    const newPlayer = new HumanPlayer(data.pos);
    newPlayer.id = this.id;

    this.broadcast.emit("new player", {
      id: newPlayer.id,
      pos: newPlayer.pos });

    for (let i = 0; i < this.humanPlayers.length; i++) {
      let existingPlayer = this.humanPlayers[i];
      this.emit("new player", {
        id: existingPlayer.id,
        pos: existingPlayer.pos
      });
    }

    this.humanPlayers.push(newPlayer);
  }

  onMovePlayer(data) {
    console.log(data);
    this.socket.emit("test", { name: "Laura "});
  }
}

new Sockets();
