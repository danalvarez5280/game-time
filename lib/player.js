var Doodad = require('./doodad.js');

class Player extends Doodad {
  constructor(x, y, width, height, model, lives, image) {
    super(x, y, width, height, model)
    this.lives = lives;
    this.currentLane = 0;

    this.image = image;
    this.animateOn = false;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 1;
    this.numberOfFrames = 7;
  }

  draw(context) {
    super.draw(context)
  }



};

module.exports = Player;
