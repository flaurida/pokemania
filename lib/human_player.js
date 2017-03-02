import Util from './util';
import Player from './player';

class HumanPlayer extends Player {
  power(impulse) {
    this.velocity[0] += impulse[0];
    this.velocity[1] += impulse[1];
  }
}

export default HumanPlayer;
