var Platform = require('./platform.js');

class Mover extends Platform {

  constructor(x, y, width, height, model, walkable) {
    super(x, y, width, height, model, walkable);
  }

  
}

module.exports = Mover;
