class Doodad {
  constructor(x, y, width, height, model) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.model = model;
  }

  draw (context) {
  context.fillStyle = this.model;
  context.fillRect(this.x, this.y, this.width, this.height);  // x, y, width, height
  }

};


module.exports = Doodad;
