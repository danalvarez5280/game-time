const Mover = require('./mover.js');

class Lilypad extends Mover {
  constructor (x, y, width, height, model, occupied) {
    super(x, y, width, height, model);
    this.occupied = occupied;
  }
}

module.exports = Lilypad;
