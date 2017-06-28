
var Platform = require('./platform.js');
var Player = require('./player.js');
var Mover = require('./mover.js');
var Lane = require('./lane.js');


class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.platforms = [];
    //this.movers = [];
    this.lanes = [];
    this.player = undefined;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addPlatforms() {
    var startZone = new Platform( 0, 750, this.canvas.width, 50, 'pink', true)
    this.platforms.push(startZone)

    var road = new Platform ( 0, 550, this.canvas.width, 200, 'black', true)
    this.platforms.push(road)
    // road.draw(context)

    var median = new Platform ( 0, 500, this.canvas.width, 50, 'green', true)
    this.platforms.push(median)
    // median.draw(context)

    var water = new Platform ( 0, 300, this.canvas.width, 200, 'blue', true)
    this.platforms.push(water)
    // water.draw(context)

    var endZone = new Platform ( 0, 250, this.canvas.width, 50, 'green', true)
    this.platforms.push(endZone)
    // endZone.draw(context)

  }

  addPlayers() {
    this.player = new Player ( 225, 750, 50, 50, 'yellow', 3)
  }

  addMovers() {
    var lane1 = new Lane('left', 1.5, 550);
    var lane2 = new Lane('right', 2.5, 600);

    var truck1 = new Mover(-100, lane1.y, 100, 50, 'red', false);
    var truck2 = new Mover(-150, lane2.y, 150, 50, 'orange', false);
    var truck3 = new Mover(-400, lane2.y, 150, 50, 'orange', false);

    lane1.pushOntoLane(truck1);
    lane2.pushOntoLane(truck2);
    lane2.pushOntoLane(truck3);

    this.lanes.push(lane1);
    this.lanes.push(lane2);

    //this.movers.push(truck2);
    //this.movers.push(truck3);
    //console.log(this.movers);
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
        //console.log('this', this);
        //console.log(this.lanes[i].moversInMyLane[j]);
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




};

module.exports = Game;
