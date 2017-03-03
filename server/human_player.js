const Player = require('./player');

class HumanPlayer extends Player {
  power(impulses) {
    impulses.forEach(impulse => {
      this.velocity[0] += impulse[0];
      this.velocity[1] += impulse[1];
    });
  }
}

module.exports = HumanPlayer;
