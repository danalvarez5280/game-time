
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
// can't get this to run properly, ended up calling the if statment in the index
  // zoneCheck() {
  //   let frog = this.player;
  //   if(frogger.player.y >= 350){
  //     frogger.checkCollision();
  //   } else {
  //     frogger.checkCollisionWater();
  //   }
  // }

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
    this.player = new Player ( 350, 750, 50, 50, 'yellow', 3)
  }

  addMovers() {
    var lane1 = new Lane('left', 1.2, 550);
    var lane2 = new Lane('right', 2.5, 600);
    var lane3 = new Lane('left', 7, 650);
    var agua1 = new Lane('right', 1.2, 450);
    var agua2 = new Lane('left', 5.2, 400);
    var agua3 = new Lane('right', 2.2, 350);


    var truck1 = new Mover(100, lane1.y, 100, 50, 'red', false);
    var truck2 = new Mover(250, lane1.y, 100, 50, 'red', false);
    var truck3 = new Mover(400, lane1.y, 100, 50, 'red', false);
    var truck4 = new Mover(-150, lane2.y, 150, 50, 'purple', false);
    var truck5 = new Mover(-400, lane2.y, 150, 50, 'purple', false);
    var truck6 = new Mover(-650, lane2.y, 150, 50, 'purple', false);
    var truck7 = new Mover(800, lane3.y, 50, 50, 'yellow', false);
    var truck8 = new Mover(900, lane3.y, 50, 50, 'yelllow', false);
    var truck9 = new Mover(1000, lane3.y, 50, 50, 'yellow', false);


    var log1 = new Mover(-150, agua1.y, 150, 50, 'brown', true);
    var log2 = new Mover(-400, agua1.y, 150, 50, 'brown', true);
    var log3 = new Mover(-650, agua1.y, 150, 50, 'brown', true);
    var log4 = new Mover(100, agua2.y, 100, 50, 'brown', true);
    var log5 = new Mover(250, agua2.y, 100, 50, 'brown', true);
    var log6 = new Mover(400, agua2.y, 100, 50, 'brown', true);
    var log7 = new Mover(-100, agua3.y, 50, 50, 'brown', true);
    var log8 = new Mover(-200, agua3.y, 50, 50, 'brown', true);
    var log9 = new Mover(-300, agua3.y, 50, 50, 'brown', true);

    lane1.pushOntoLane(truck1);
    lane1.pushOntoLane(truck2);
    lane1.pushOntoLane(truck3);
    lane2.pushOntoLane(truck4);
    lane2.pushOntoLane(truck5);
    lane2.pushOntoLane(truck6);
    lane3.pushOntoLane(truck7);
    lane3.pushOntoLane(truck8);
    lane3.pushOntoLane(truck9);

    agua1.pushOntoLane(log1);
    agua1.pushOntoLane(log2);
    agua1.pushOntoLane(log3);
    agua2.pushOntoLane(log4);
    agua2.pushOntoLane(log5);
    agua2.pushOntoLane(log6);
    agua3.pushOntoLane(log7);
    agua3.pushOntoLane(log8);
    agua3.pushOntoLane(log9);

    this.lanes.push(lane1);
    this.lanes.push(lane2);
    this.lanes.push(lane3);
    this.lanes.push(agua1);
    this.lanes.push(agua2);
    this.lanes.push(agua3);
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
