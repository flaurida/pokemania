import Util from './util';
import Player from './player';

class HumanPlayer extends Player {
  power(impulse) {
    this.velocity[0] += impulse[0];
    this.velocity[1] += impulse[1];

    this.capVelocities();
  }

  capVelocities() {
    if (this.velocity[0] > 4) this.velocity[0] = 4;
    if (this.velocity[1] > 4) this.velocity[1] = 4;
    if (this.velocity[0] < -4) this.velocity[0] = -4;
    if (this.velocity[1] < -4) this.velocity[1] = -4;
  }

  slowDownVelocity(direction) {
    if (direction === "ArrowLeft" || direction === "ArrowRight") {
      this.velocity[0] = 0;
    } else {
      this.velocity[1] = 0;
    }
  }
}

export default HumanPlayer;
