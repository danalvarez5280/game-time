var Doodad = require('./doodad.js');

class Player extends Doodad {
  constructor( x, y, width, height, model, lives) {
    super(x, y, width, height, model)
    this.lives = lives;
    this.currentLane = 0;
  }

  draw (context) {
  super.draw(context)
  }



};

module.exports = Player;
