class GameView {
  constructor(game, context) {
    this.context = context;
    this.game = game;
    this.currentPlayer = this.game.addNewHumanPlayer();
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    Object.keys(GameView.MOVES).forEach(key => {
      let move = GameView.MOVES[key];

      document.addEventListener('keydown', e => {
        if (e.key === key) {
          this.currentPlayer.power(move);
        }
      }, false);

      document.addEventListener('keyup', e => {
        if (e.key === key) {
          this.currentPlayer.slowDownVelocity(key);
        }
      }, false);
    });
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.context);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "ArrowLeft": [-0.5, 0],
  "ArrowUp": [0, -0.5],
  "ArrowRight": [0.5, 0],
  "ArrowDown": [0, 0.5]
};

export default GameView;
