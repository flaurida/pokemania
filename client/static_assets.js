import Util from '../server/util.js';

class StaticAssets {
  constructor(notifyCallback) {
    this.loadedCount = 0;
    this.images = {};
    this.notifyCallback = notifyCallback;

    this.loadImages();
  }

  addImage(url) {
    this.images[url] = new Image();

    this.images[url].onload = () => {
      this.loadedCount++;

      if (this.checkAllLoaded()) {
        this.notifyCallback();
      }
    };

    this.images[url].src = url;
  }

  addLoadedImage(url, loadedImage) {
    this.images[url] = loadedImage;
  }

  loadImages() {
    StaticAssets.IMAGE_URLS.forEach(imageUrl => {
      this.addImage(imageUrl);
    });
  }

  checkAllLoaded() {
    return this.loadedCount === Object.keys(this.images).length;
  }
}

StaticAssets.IMAGE_URLS = [
  "assets/img/egg.png",
  "assets/img/current_player_egg.png",
  "assets/img/grass.png",
  "assets/img/evolve.png"
];

export default StaticAssets;
