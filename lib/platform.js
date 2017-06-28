var Doodad = require('./doodad.js')

class Platform extends Doodad {
  constructor(x, y, width, height, model, walkable){
    super(x, y, width, height, model)
    this.walkable = walkable;
  }

  draw (context) {
  super.draw(context)
  }

};

module.exports = Platform;
