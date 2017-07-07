const Platform = require('./platform.js');

class Mover extends Platform {

  constructor(x, y, width, height, model) {
    super(x, y, width, height, model);
  }

  draw(context) {
    let img = new Image();
    img.src = `../images/${this.model}`;
    context.drawImage(img, this.x, this.y);
  }

}

module.exports = Mover;
