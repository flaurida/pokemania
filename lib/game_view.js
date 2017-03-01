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
          GameView.KEYS[GameView.MOVES[key]] = true;
        }
      }, false);

      document.addEventListener('keyup', e => {
        if (e.key === key) {
          GameView.KEYS[GameView.MOVES[key]] = false;
        }
      }, false);
    });
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.powerCurrentPlayer();
    this.game.step(timeDelta);
    this.game.draw(this.context);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  powerCurrentPlayer() {
    const impulse = 0.5;

    if (GameView.KEYS.up) this.currentPlayer.power([0, -impulse]);
    if (GameView.KEYS.down) this.currentPlayer.power([0, impulse]);
    if (GameView.KEYS.left) this.currentPlayer.power([-impulse, 0]);
    if (GameView.KEYS.right) this.currentPlayer.power([impulse, 0]);
  }
}

GameView.MOVES = {
  "ArrowLeft": "left",
  "ArrowUp": "up",
  "ArrowRight": "right",
  "ArrowDown": "down"
};

GameView.KEYS = {
  up: false,
  down: false,
  left: false,
  right: false
};

export default GameView;
