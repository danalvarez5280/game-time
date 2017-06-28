

class Lane {
  constructor(direction, speed, y){
    this.direction = direction;
    this.speed = speed;
    this.y = y;
    this.moversInMyLane = [];
  }

  pushOntoLane(mover) {
    this.moversInMyLane.push(mover);
  }
}

module.exports = Lane;
