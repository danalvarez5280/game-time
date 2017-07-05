var Platform = require('./platform.js');

class Mover extends Platform {

  constructor(x, y, width, height, model, walkable) {
    super(x, y, width, height, model, walkable);
  }

  draw(context) {
    // context.fillStyle = this.model;
    // context.fillRect(this.x, this.y, this.width, this.height);  // x, y, width, height
    //super.draw(context);

    let img = new Image();
    img.src = `../images/${this.model}`;

    context.drawImage(img, this.x, this.y);
  }

}

module.exports = Mover;
