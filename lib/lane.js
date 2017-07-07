

class Lane {
  constructor(direction, speed, y, width) {
    this.direction = direction;
    this.speed = speed;
    this.y = y;
    this.width = width;
    this.moversInMyLane = [];
  }

  pushOntoLane(mover) {
    this.moversInMyLane.push(mover);
  }
}

module.exports = Lane;
