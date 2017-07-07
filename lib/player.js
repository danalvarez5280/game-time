const Doodad = require('./doodad.js');

class Player extends Doodad {
  constructor(x, y, width, height, model, lives, image) {
    super(x, y, width, height, model);

    this.lives = lives;
    this.currentLane = 0;
    this.image = image;
    this.animateOn = false;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.numberOfFrames = 7;
  }

  draw(context) {
    context.drawImage(
      this.image, //image source
      this.frameIndex * 50, // source x
      0, //source y
      50, //source width
      50, //source height
      this.x, //destination x
      this.y, //destination y
      50, // destination width
      50); // destination height
  }

}

module.exports = Player;
