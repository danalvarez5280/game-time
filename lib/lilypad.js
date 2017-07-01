var Mover = require('./mover.js');

class Lilypad extends Mover {
  constructor (x, y, width, height, model, walkable, occupied) {
    super(x, y, width, height, model, walkable);
    this.occupied = occupied;
  }
}

module.exports = Lilypad;
