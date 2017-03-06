# Pokemania

[Live Version](www.pokemania.site)

Pokemania is a multiplayer Javascript game built with a Node.js server and Socket.IO to provide real time updates.

The objective of the game is simple: get as large as you can and don't lose. Your player becomes larger and evolves by defeating other Pokemon. You can defeat another Pokemon if they are smaller than you, or if you activate Dire Hit and run into a larger Pokemon. However, there is a delay for Dire Hit to take effect that gets longer as you grow and evolve. Controls are arrow keys to move and space bar to activate Dire Hit.

## Features & Implementation

### Game Logic

The basic game logic is handled on a server written with Node.js. This takes care of a few basic operations:

* Creating new players (both human and computer)
* Updating player positions based on their velocities
* Handling collisions
* Handling out of bounds players
* Removing inactive human players
* Refilling the game with computer players if needed

This basic game logic lives in the [game file on the server](./server/game.js).

### Real Time Updates

While the server handles the game logic, it must communicate enough of the game state to the client so that the game can be rendered on the browser. To implement these updates, I utilized [Socket.IO](https://github.com/socketio/socket.io).

First, I set up the connection as outlined in the Socket.IO documentation:

```javascript
const app = require("http").createServer(handler);
const io = require("socket.io")(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT);

new Sockets(io);
```

In my [Sockets class](./server/sockets.js) I then define what functions should be executed based on client communication, such as when a client connects or indicates that they will move their Pokemon.

```javascript
onSocketConnection(client) {
  client.on("disconnect", () =>  { this.onClientDisconnect(client); });
  client.on("new player", this.onNewPlayer.bind(this));
  client.on("move player", this.onMovePlayer.bind(this));
  client.on("dire hit player", this.onDireHitPlayer.bind(this));
}
```

On the opposite side of the coin, I also use Socket.IO to notify the client when certain things happen. For example, below is a method that notifies an inactive player that they have been removed from the game. The client then receives this notices and handles it on their side (by switching to the sleeping Charizard view). I also send updates of the game state to the client on an interval in a similar fashion.

```javascript
notifyInactivePlayers(inactivePlayerIds) {
  inactivePlayerIds.forEach(inactivePlayerId => {
    this.socket.emit("inactive player", { id: inactivePlayerId });
  });
}
```

### Drawing the Game


### Future Directions

* Removing players who close their browser immediately instead of treating the the same way as inactive players and removing them after 30 seconds
* Multiple servers if the game gets too full
