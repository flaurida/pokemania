const Util = require("./util");
const Player = require("./player");

class ComputerPlayer extends Player {
  handleDanger(otherPlayer) {
    if (this.escaping) return;

    if (!(otherPlayer instanceof ComputerPlayer) ||
      this.radius < otherPlayer.radius) {
        this.activateDireHit();
        this.switchDirection();
        this.escaping = true;
        setTimeout(() => { this.escaping = false; }, 1000);
    }
  }

  switchDirection() {
    this.velocity[0] = -this.velocity[0];
    this.velocity[1] = -this.velocity[1];
  }
}

module.exports = ComputerPlayer;
