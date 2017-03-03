const Player = require('./player');
const ComputerPlayer = require('./computer_player');

class HumanPlayer extends Player {
  power(impulses) {
    impulses.forEach(impulse => {
      this.velocity[0] += impulse[0];
      this.velocity[1] += impulse[1];
    });
  }

  handleDanger(otherPlayer) {
    if (otherPlayer instanceof ComputerPlayer) {
      otherPlayer.handleDanger(this);
    }
  }
}

module.exports = HumanPlayer;
