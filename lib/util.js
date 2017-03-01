const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  randomRadius() {
    return Math.floor(Math.random() * (20 - 5)) + 5;
  },

  randomVelocity() {
    return [
      this.randomVelocityPiece(),
      this.randomVelocityPiece()
    ];
  },

  randomVelocityPiece() {
    return Math.floor(Math.random() * (1.2 + 1.2)) - 1.2;
  }
};

export default Util;
