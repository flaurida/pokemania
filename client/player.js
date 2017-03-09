class Player {
  constructor(context, data, staticAssets, currentPlayer = false) {
    this.context = context;
    this.staticAssets = staticAssets;
    this.currentPlayer = currentPlayer;

    this.imgLoaded = false;
    this.fetchImage(data.img);
  }

  fetchImage(url) {
    if (this.currentPlayer && url === "assets/img/egg.png") {
      url = "assets/img/current_player_egg.png";
    }

    if (this.staticAssets.images[url]) {
      this.img = this.staticAssets.images[url];
      this.imgLoaded = true;
    } else {
      this.loadImage(url);
    }
  }

  loadImage(url) {
    this.img = new Image();

    this.img.onload = () => {
      this.imgLoaded = true;
      this.staticAssets.addLoadedImage(url, this.img);
    };

    this.img.src = url;
  }

  resetImage(url) {
    this.imgLoaded = false;
    this.fetchImage(url);
  }

  checkNewImage(url) {
    if (!this.img.src.includes(url)) {
      this.resetImage(url);
    }
  }

  draw(offset, data) {
    this.checkNewImage(data.img);
    this.drawName(offset, data);
    this.drawOutline(offset, data);

    if (this.imgLoaded) {
      this.drawImage(offset, data);
    }
  }

  drawName(offset, data) {
    this.context.fillStyle = Player.PLAYER_INFO_COLOR;
    this.context.font = "bold 14px Arial";

    this.context.fillText(
      data.name,
      data.pos[0] + offset[0] + data.radius + 3,
      data.pos[1] + offset[1]
    );
  }

  drawImage(offset, data) {
    this.context.drawImage(
      this.img,
      data.pos[0] + offset[0] - data.radius,
      data.pos[1] + offset[1] - data.radius,
      data.radius * 2,
      data.radius * 2
    );
  }

  drawOutline(offset, data) {
    if (data.direHit) this.drawDireHit(offset, data);

    this.context.beginPath();
    this.context.arc(
      data.pos[0] + offset[0],
      data.pos[1] + offset[1],
      data.radius,
      0,
      2 * Math.PI
    );

    this.context.lineWidth = Player.NORMAL_OUTLINE_WIDTH;
    this.context.strokeStyle = Player.PLAYER_INFO_COLOR;
    this.context.stroke();

    if (data.activatingDireHit || data.direHit) {
      this.drawDireHitOutline(offset, data);
    }
  }

  drawDireHitOutline(offset, data) {
    this.context.beginPath();
    this.context.arc(
      data.pos[0] + offset[0],
      data.pos[1] + offset[1],
      data.radius + Player.NORMAL_OUTLINE_WIDTH * 0.75,
      0,
      2 * Math.PI
    );

    this.context.lineWidth = Player.NORMAL_OUTLINE_WIDTH * 0.75;
    this.context.strokeStyle = Player.DIRE_HIT_COLOR;
    this.context.stroke();
  }

  drawDireHit(offset, data) {
    this.context.beginPath();
    this.context.fillStyle = Player.SPIKES_COLOR;
    this.context.fillRect(
      data.pos[0] + offset[0] - data.radius - Player.DIRE_HIT_OUTLINE_WIDTH / 2 + 2,
      data.pos[1] + offset[1] - data.radius - Player.DIRE_HIT_OUTLINE_WIDTH / 2 + 2,
      data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4,
      data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4
    );

    this.drawRotatedSquare(offset, data);
  }

  drawRotatedSquare(offset, data) {
    this.context.save();

    this.context.translate(
      data.pos[0] + offset[0],
      data.pos[1] + offset[1]
    );

    this.context.rotate(Math.PI / 4);
    this.context.fillStyle = Player.SPIKES_COLOR;
    this.context.fillRect(
      -(data.radius + Player.DIRE_HIT_OUTLINE_WIDTH / 2) + 2,
      -(data.radius + Player.DIRE_HIT_OUTLINE_WIDTH / 2) + 2,
      data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4,
      data.radius * 2 + Player.DIRE_HIT_OUTLINE_WIDTH - 4
    );

    this.context.restore();
  }
}

Player.PLAYER_INFO_COLOR = "#000";
Player.DIRE_HIT_COLOR = "#ff3d00";
Player.SPIKES_COLOR = "#fffc00";
Player.NORMAL_OUTLINE_WIDTH = 5;
Player.DIRE_HIT_OUTLINE_WIDTH = 10;

export default Player;
