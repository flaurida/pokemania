import Util from '../server/util';
import Game from './game';
import StaticAssets from './static_assets';

class GameView {
  constructor(context, socket) {
    this.context = context;
    this.staticAssets = new StaticAssets(this.receiveLoadedImages.bind(this));
    this.game = new Game(this.context, this.staticAssets);
    this.socket = socket;
    this.currentPlayerId = null;
    this.playStatus = "startScreen";

    this.setEventHandlers();
  }

  start() {
    this.bindKeyHandlers();
    this.currentPlayerId = this.currentPlayerId || Util.randomId();
    this.game.setCurrentPlayerId(this.currentPlayerId);
    this.activateScreen("playGame");
    this.activateDireHitTime = null;
    this.playStatus = "playing";
    this.initialData = false;

    const pokemonId = this.selectedPokemonImage ?
      parseInt(this.selectedPokemonImage.getAttribute("data")) : null;

    this.socket.emit("new player", {
      name: this.name,
      pokemonId: pokemonId,
      id: this.currentPlayerId
    });
  }

  receiveLoadedImages() {
    this.imgLoaded = true;
  }

  setEventHandlers() {
    this.addStartClickListener();
    this.addSelectPokemonClickListener();
    this.addInstructionsClickListener();
    this.addRestartClickListener();

    this.socket.on("draw game", this.drawGame.bind(this));
    this.socket.on("activate dire hit", this.startCountdown.bind(this));
    this.socket.on("inactive player", this.handleInactivity.bind(this));
  }

  startCountdown(data) {
    if (data.id === this.currentPlayerId) {
      this.activateDireHitTime = Date.now() + data.lag;
    }
  }

  drawGame(data) {
    if (this.playStatus === "restart") return;

    if (this.playStatus === "playing") {
      if (this.resetIfLost(data)) return;
      this.powerCurrentPlayer();

      if (this.initialData && this.imgLoaded) {
        const offset = this.getCurrentPlayerOffset(data);
        this.game.draw(offset, data);
        this.handleDireHitCountdown();
      } else {
        this.game.draw(null, data, true);
        this.checkInitialData(data);
      }
    }
  }

  handleDireHitCountdown() {
    if (this.activateDireHitTime) {
      const currentTime = Date.now();

      if (this.activateDireHitTime < currentTime) {
        this.activateDireHitTime = null;
      } else {
        this.game.drawCountdown(this.activateDireHitTime - currentTime);
      }
    }
  }

  checkInitialData(data) {
    if (data[this.currentPlayerId]) {
      this.initialData = true;
    }
  }

  resetIfLost(data) {
    if (!data[this.currentPlayerId] && this.initialData) {
      this.activateScreen("restart");
      this.playStatus = "restart";
      return true;
    }

    return false;
  }

  addStartClickListener() {
    const startButton = document.getElementById("start-button");

    startButton.onclick = () => {
      this.start();
    };
  }

  addSelectPokemonClickListener() {
    const selectPokemonButton = document.getElementById("select-pokemon-button");

    selectPokemonButton.onclick = () => {
      this.name = document.getElementById("name-input").value;
      if (this.name.length > 25) this.name = "";
      this.addPokemonToSelectList();
      this.activateScreen("selectPokemon");
    };

    const selectPokemon = document.getElementById("select-pokemon");
    selectPokemon.onclick = () => {
      this.activateScreen("selectPokemon");
    };

    const selectPokemonBody = document.getElementById("select-pokemon-body");
    selectPokemonBody.onclick = e => {
      e.stopPropagation();
    };
  }

  addPokemonToSelectList() {
    const pokemonList = document.getElementById("pokemon-list");

    if (!pokemonList.firstChild) {
      Util.POKEMON_IDS.forEach(pokemonId => {
        const pokemonListItem = document.createElement("li");
        const pokemonImage = document.createElement("img");
        const pokemonUrl = `assets/img/pokemon-${pokemonId}.png`;
        pokemonImage.src = pokemonUrl;

        this.staticAssets.addLoadedImage(pokemonUrl, pokemonImage);
        pokemonImage.className = "select-pokemon-img";
        pokemonImage.data = pokemonId;
        pokemonListItem.appendChild(pokemonImage);
        this.bindPokemonSelectClickListener(pokemonImage);

        pokemonList.appendChild(pokemonListItem);
      });
    }
  }

  bindPokemonSelectClickListener(pokemonImage) {
    pokemonImage.onclick = () => {
      pokemonImage.classList.toggle("select-pokemon-img-focus");

      if (this.selectedPokemonImage) {
        this.selectedPokemonImage.classList.toggle("select-pokemon-img-focus");
      }

      this.selectedPokemonImage = pokemonImage;
    };
  }

  addRestartClickListener() {
    const restartButtons = document.getElementsByClassName("restart-button");

    for (let i = 0; i < restartButtons.length; i++) {
      let restartButton = restartButtons[i];

      restartButton.onclick = () => {
        this.start();
      };
    }
  }

  activateScreen(type) {
    const canvas = document.getElementById("game-canvas");
    const startScreen = document.getElementById("start-screen");
    const restartScreen = document.getElementById("restart-screen");
    const instructions = document.getElementById("instructions");
    const inactiveScreen = document.getElementById("inactive-screen");
    const selectPokemonScreen = document.getElementById("select-pokemon");

    canvas.className = type === "playGame" ? "" : "hidden";
    startScreen.className = type === "start" ||
      type === "selectPokemon" ||
      type === "instructions" ? "" : "hidden";
    restartScreen.className = type === "restart" ? "" : "hidden";
    inactiveScreen.className = type === "inactive" ? "" : "hidden";

    if (type === "instructions") {
      instructions.classList.toggle("hidden");
    } else {
      instructions.className = "hidden";
    }

    if (type === "selectPokemon") {
      selectPokemonScreen.classList.toggle("hidden");
    } else {
      selectPokemonScreen.className = "hidden";
    }
  }

  addInstructionsClickListener() {
    const instructionsButton = document.getElementById("instructions-button");
    instructionsButton.onclick = () => {
      this.activateScreen("instructions");
    };

    const instructions = document.getElementById("instructions");
    instructions.onclick = () => {
      this.activateScreen("instructions");
    };

    const instructionsBody = document.getElementById("instructions-body");
    instructionsBody.onclick = e => {
      e.stopPropagation();
    };
  }

  bindKeyHandlers() {
    Object.keys(GameView.MOVES).forEach(key => {
      let move = GameView.MOVES[key];

      document.addEventListener('keydown', e => {
        if (e.key === key) {
          e.preventDefault();
          GameView.KEYS[GameView.MOVES[key]] = true;
        }
      }, false);

      document.addEventListener('keyup', e => {
        if (e.key === key) {
          e.preventDefault();
          GameView.KEYS[GameView.MOVES[key]] = false;
        }
      }, false);
    });

    document.addEventListener('keydown', e => {
      if (e.key === " ") {
        e.preventDefault();
        this.activateDireHit();
      }
    });
  }

  getCurrentPlayerOffset(data) {
    return [
      Game.CANVAS_X / 2 - data[this.currentPlayerId].pos[0],
      Game.CANVAS_Y / 2 - data[this.currentPlayerId].pos[1]
    ];
  }

  powerCurrentPlayer() {
    const impulse = 0.5;
    const allImpulses = [];

    if (GameView.KEYS.up) allImpulses.push([0, -impulse]);
    if (GameView.KEYS.down) allImpulses.push([0, impulse]);
    if (GameView.KEYS.left) allImpulses.push([-impulse, 0]);
    if (GameView.KEYS.right) allImpulses.push([impulse, 0]);

    this.socket.emit(
      "move player",
      { id: this.currentPlayerId, impulses: allImpulses }
    );
  }

  activateDireHit() {
    this.socket.emit("dire hit player", { id: this.currentPlayerId });
  }

  handleInactivity(data) {
    if (data.id === this.currentPlayerId) {
      this.playStatus === "restart";
      this.activateScreen("inactive");
    }
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
