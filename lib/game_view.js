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
    const offset = this.getCurrentPlayerOffset();

    this.powerCurrentPlayer();
    this.game.step(timeDelta);
    this.game.draw(this.context, offset);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  getCurrentPlayerOffset() {
    return [
      this.game.constructor.CANVAS_X / 2 - this.currentPlayer.pos[0],
      this.game.constructor.CANVAS_Y / 2 - this.currentPlayer.pos[1]
    ];
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
