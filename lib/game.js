
var Platform = require('./platform.js');
var Player = require('./player.js');
var Mover = require('./mover.js');
var Lane = require('./lane.js');


class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.platforms = [];
    this.lanes = [];
    this.player = undefined;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkCollision() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++){
        let mover = this.lanes[i].moversInMyLane[j];
        let frog = this.player;

        //TODO: figgure out exact 'give' (right now it's 5)
        //      do we need to actually check Y collisions?
        if(mover.x < frog.x + (frog.width - 15) &&
        mover.x + mover.width > (frog.x + 15) &&
        mover.y < frog.y + (frog.height - 15) &&
        mover.height + mover.y > frog.y) {
          this.resetPlayer();
          console.log('collision detected');
          // collision detect
        } else {
          // no collision
        }
      }
    }
  }

  //TODO: This function is proof of concept for detecting water collisions
  //      it is not being called anywhere yet
  checkCollisionWater() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++){
        let mover = this.lanes[i].moversInMyLane[j];
        let frog = this.player;

        //TODO: figgure out exact 'give' (right now it's 5)
        //      do we need to actually check Y collisions?
        if(mover.x < frog.x + (frog.width - 15) &&
        mover.x + mover.width > (frog.x + 15) &&
        mover.y < frog.y + (frog.height - 15) &&
        mover.height + mover.y > frog.y) {
          console.log('collision detected');
          frog.x += this.lanes[i].speed;
          // no collision detect
        } else {
          // water collision
          this.resetPlayer();
        }
      }
    }
  }

  addPlatforms() {
    var startZone = new Platform( 0, 750, this.canvas.width, 50, 'pink', true)
    this.platforms.push(startZone)

    var road = new Platform ( 0, 550, this.canvas.width, 200, 'black', true)
    this.platforms.push(road)

    var median = new Platform ( 0, 500, this.canvas.width, 50, 'green', true)
    this.platforms.push(median)

    var water = new Platform ( 0, 300, this.canvas.width, 200, 'blue', true)
    this.platforms.push(water)

    var endZone = new Platform ( 0, 250, this.canvas.width, 50, 'green', true)
    this.platforms.push(endZone)
  }

  addPlayers() {
    this.player = new Player ( 225, 750, 50, 50, 'yellow', 3)
  }

  addMovers() {
    var lane1 = new Lane('left', .2, 550);
    var lane2 = new Lane('right', 2.5, 600);

    var truck1 = new Mover(-100, lane1.y, 100, 50, 'red', false);
    var truck2 = new Mover(-150, lane2.y, 150, 50, 'orange', false);
    var truck3 = new Mover(-400, lane2.y, 150, 50, 'purple', false);

    lane1.pushOntoLane(truck1);
    lane2.pushOntoLane(truck2);
    lane2.pushOntoLane(truck3);

    this.lanes.push(lane1);
    this.lanes.push(lane2);
  }


  drawPlatforms() {
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].draw(this.context);
    }
  }

  drawPlayer() {
    this.player.draw(this.context)
  }

  drawMovers() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++){
        this.lanes[i].moversInMyLane[j].draw(this.context);
      }
    }
  }

  moveMovers() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++){

        if(this.lanes[i].direction === 'right'){

          if (this.lanes[i].moversInMyLane[j].x <= this.canvas.width){
            this.lanes[i].moversInMyLane[j].x += (this.lanes[i].speed);
          } else {
            this.lanes[i].moversInMyLane[j].x = this.lanes[i].moversInMyLane[j].width * (-1);
          }

        } else {

          if (this.lanes[i].moversInMyLane[j].x + this.lanes[i].moversInMyLane[j].width >= 0){
            this.lanes[i].moversInMyLane[j].x -= (this.lanes[i].speed);
          } else {
            this.lanes[i].moversInMyLane[j].x = this.canvas.width;
          }
        }


        //else do this:

      }
    }
  };

  resetPlayer() {
    this.player.x = 225;
    this.player.y = 750;
    this.player.lives--;
    // if ( this.player.lives <= 0) {
        //game over
    // }
  }




};

module.exports = Game;
