var Doodad = require('./doodad.js')

class Platform extends Doodad {
  constructor(x, y, width, height, model) {
    super(x, y, width, height, model)
  }

  draw (context) {
    let img = new Image();

    img.src = `../images/${this.model}`
    let pattern = context.createPattern(img, 'repeat');

    context.fillStyle = pattern;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Platform;
