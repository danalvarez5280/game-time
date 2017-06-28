var Doodad = require('./doodad.js');

class Player extends Doodad {
  constructor( x, y, width, height, model, lives){
    super(x, y, width, height, model)
  }

  draw (context) {
  super.draw(context)
  }



};

module.exports = Player;
