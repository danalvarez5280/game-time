
var Platform = require('./platform.js');
var Player = require('./player.js');
var Mover = require('./mover.js');
var Lane = require('./lane.js');
var Lilypad = require('./lilypad.js');


class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.platforms = [];
    this.lanes = [];
    this.player = undefined;
    this.currentLevel = 1;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //TODO: maybe use the mover.walkable property to merge this function with
  //      the water collision check function
  checkCollision() {
    // console.log('road collision');
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {
        let mover = this.lanes[i].moversInMyLane[j];
        let frog = this.player;

        //TODO: figgure out exact 'give' (right now it's 5)
        //      do we need to actually check Y collisions?
        if (mover.x < frog.x + (frog.width - 15) &&
        mover.x + mover.width > (frog.x + 15) &&
        mover.y < frog.y + (frog.height - 15) &&
        mover.height + mover.y > frog.y) {
          this.resetPlayer(true);
          // console.log('collision detected');
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
    // console.log('water collision');
    var didILand = false;

    for (let j = 0; j < this.lanes[this.player.currentLane].moversInMyLane.length; j++) {
      let lane = this.lanes[this.player.currentLane];
      let mover = lane.moversInMyLane[j];
      let frog = this.player;

      if (  ((frog.x > mover.x - 15) && (frog.x < (mover.x + mover.width))) &&
            (((frog.x + frog.width) > mover.x) && ((frog.x + frog.width) < (mover.x + mover.width + 15)))) {
          // console.log('frogX', frog.x, 'lane', i, 'mover', j, ':', mover.x);
        didILand = true;
        //landed but on a lily pad
        if ( frog.currentLane === this.lanes.length - 1 ) {
          mover.model = frog.model;
          mover.occupied = true;

          this.resetPlayer(false);
        } else {
          //frog landed, but on a log
          frog.x += (lane.direction * lane.speed)
        }

      }
    }
//did not land so i die
    if (!didILand) {
      this.resetPlayer(true);
    }
  }

  borderCheck() {
    if (this.player.x < 0) {
      this.player.x = 0;
    }
    if (this.player.x > this.canvas.width - 50) {
      this.player.x = this.canvas.width - 50;
    }
    if (this.player.y < 0) {
      this.player.y = 0;
    }
    if (this.player.y > this.canvas.height - 50) {
      this.player.y = this.canvas.height - 50;
    }

  }

  winCheck() {
    var lastLaneIndex = this.lanes.length - 1;
    var lastLaneMovers = this.lanes[lastLaneIndex].moversInMyLane;
    var didIWin = true;
    // console.log(lastLane);

    for ( let i = 0; i < lastLaneMovers.length; i++) {
      let mover = lastLaneMovers[i];
      // console.log(mover);
      if ( mover.occupied === false) {
        didIWin = false;
        // console.log('asdfasdf');
      }
    }

    if (didIWin === true) {
      this.currentLevel++;
      for (let i = 0; i < this.lanes.length; i++) {
        this.lanes[i].speed = this.lanes[i].speed * 5.5;
        // console.log(this.lanes[i].speed);
        //reset lilipads model
        //update current level label
        //maybe update score
      }

      for (let i = 0; i < lastLaneMovers.length; i++) {
        lastLaneMovers[i].occupied = false;
        lastLaneMovers[i].model = 'pink';

      }

    }

//if all lilypads.model = frog.model then you win

  }
// can't get this to run properly, ended up calling the if statment in the index
  zoneCheck() {

    this.borderCheck();

    if (this.player.y >= 350 && this.player.y < 600) {
      this.checkCollision();
    }
    if (this.player.y >= 0 && this.player.y < 300) {
      this.checkCollisionWater();
    }

  }

  addPlatforms() {
    var startZone = new Platform( 0, 600, this.canvas.width, 50, 'pink', true)

    this.platforms.push(startZone)

    var road = new Platform ( 0, 350, this.canvas.width, 250, 'black', true)

    this.platforms.push(road)

    var median = new Platform ( 0, 300, this.canvas.width, 50, 'green', true)

    this.platforms.push(median)

    var water = new Platform ( 0, 50, this.canvas.width, 250, 'blue', true)

    this.platforms.push(water)

    var endZone = new Platform ( 0, 0, this.canvas.width, 50, 'green', false)

    this.platforms.push(endZone)
  }

  addPlayers() {
    var playerImage = new Image();
    playerImage.src = '../images/frog-spriteB.png';
    this.player = new Player ( 350, 600, 50, 50, 'yellow', 3, playerImage)
  }

  addMovers() {

    var start = new Lane('1', 0, 600);
    var median = new Lane('1', 0, 300);
    var end = new Lane('1', 0, 0);


    var road1 = new Lane('-1', 1.3, 550);
    var road2 = new Lane('1', 2.3, 500);
    var road3 = new Lane('-1', 3.3, 450);
    var road4 = new Lane('1', 4.3, 400);
    var road5 = new Lane('-1', 5.3, 350);

    var agua1 = new Lane('1', 1, 250);
    var agua2 = new Lane('-1', 1, 200);
    var agua3 = new Lane('1', 1, 150);
    var agua4 = new Lane('-1', 1, 100);
    var agua5 = new Lane('1', 1, 50);


    var truck1 = new Mover(100, road1.y, 100, 50, 'red', false);
    var truck2 = new Mover(250, road1.y, 100, 50, 'red', false);
    var truck3 = new Mover(-100, road2.y, 125, 50, 'blue', false);
    var truck4 = new Mover(-250, road2.y, 125, 50, 'blue', false);
    var truck5 = new Mover(150, road3.y, 150, 50, 'purple', false);
    var truck6 = new Mover(350, road3.y, 150, 50, 'purple', false);
    var truck7 = new Mover(-100, road4.y, 50, 50, 'grey', false);
    var truck8 = new Mover(-200, road4.y, 50, 50, 'grey', false);
    var truck9 = new Mover(100, road5.y, 200, 50, 'orange', false);


    var log1 = new Mover(-450, agua1.y, 650, 50, 'brown', true);
    var log2 = new Mover(-150, agua1.y, 350, 50, 'brown', true);
    var log3 = new Mover(150, agua2.y, 625, 50, 'brown', true);
    var log4 = new Mover(300, agua2.y, 325, 50, 'brown', true);
    var log5 = new Mover(-100, agua3.y, 600, 50, 'brown', true);
    var log6 = new Mover(-300, agua3.y, 300, 50, 'brown', true);
    var log7 = new Mover(-100, agua4.y, 675, 50, 'brown', true);
    var log8 = new Mover(-300, agua4.y, 375, 50, 'brown', true);
    var log9 = new Mover(300, agua5.y, 600, 50, 'brown', true);

    var lilyPad1 = new Lilypad(125, end.y, 50, 50, 'pink', true, false);
    var lilyPad2 = new Lilypad(250, end.y, 50, 50, 'pink', true, false);
    var lilyPad3 = new Lilypad(375, end.y, 50, 50, 'pink', true, false);
    var lilyPad4 = new Lilypad(500, end.y, 50, 50, 'pink', true, false);
    var lilyPad5 = new Lilypad(625, end.y, 50, 50, 'pink', true, false);

    road1.pushOntoLane(truck1);
    road1.pushOntoLane(truck2);
    road2.pushOntoLane(truck3);
    road2.pushOntoLane(truck4);
    road3.pushOntoLane(truck5);
    road3.pushOntoLane(truck6);
    road4.pushOntoLane(truck7);
    road4.pushOntoLane(truck8);
    road5.pushOntoLane(truck9);

    agua1.pushOntoLane(log1);
    // agua1.pushOntoLane(log2);
    agua2.pushOntoLane(log3);
    // agua2.pushOntoLane(log4);
    agua3.pushOntoLane(log5);
    // agua3.pushOntoLane(log6);
    agua4.pushOntoLane(log7);
    // agua4.pushOntoLane(log8);
    agua5.pushOntoLane(log9);

    end.pushOntoLane(lilyPad1);
    // end.pushOntoLane(lilyPad2);
    // end.pushOntoLane(lilyPad3);
    // end.pushOntoLane(lilyPad4);
    // end.pushOntoLane(lilyPad5);

    this.lanes.push(start);
    this.lanes.push(road1);
    this.lanes.push(road2);
    this.lanes.push(road3);
    this.lanes.push(road4);
    this.lanes.push(road5);
    this.lanes.push(median);
    this.lanes.push(agua1);
    this.lanes.push(agua2);
    this.lanes.push(agua3);
    this.lanes.push(agua4);
    this.lanes.push(agua5);
    this.lanes.push(end);
  }


  drawPlatforms() {
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].draw(this.context);
    }
  }

  //TODO: because we want to use ticksPerFrame at 1, this could be greatly cleaned up
  tickCalc() {
    if (this.player.animateOn) {

      this.player.tickCount += 1;
      if (this.player.tickCount > this.player.ticksPerFrame) {
        this.player.tickCount = 0; // we are drawing, so need to reset

        if (this.player.frameIndex < this.player.numberOfFrames - 1) {
          this.player.frameIndex += 1;
        } else {
          this.player.frameIndex = 0;
          this.player.animateOn = false;
        }
      }

    } else {
      this.player.frameIndex = 0;
    }


  }

  drawPlayer() {
    // this.context.drawImage(
    //   this.player.image, //image source
    //   this.player.frameIndex * 50, // source x
    //   0, //source y
    //   50, //source width
    //   50, //source height
    //   this.player.x, //destination x
    //   this.player.y, //destination y
    //   50, // destination width
    //   50); // destination height

    this.player.draw(this.context);
  }

  drawMovers() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {
        this.lanes[i].moversInMyLane[j].draw(this.context);
      }
    }
  }

  moveMovers() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {

        if (this.lanes[i].direction === '1') {

          if (this.lanes[i].moversInMyLane[j].x <= this.canvas.width) {
            this.lanes[i].moversInMyLane[j].x += (this.lanes[i].speed);
          } else {
            this.lanes[i].moversInMyLane[j].x = this.lanes[i].moversInMyLane[j].width * (-1);
          }

        } else {

          if (this.lanes[i].moversInMyLane[j].x + this.lanes[i].moversInMyLane[j].width >= 0) {
            this.lanes[i].moversInMyLane[j].x -= (this.lanes[i].speed);
          } else {
            this.lanes[i].moversInMyLane[j].x = this.canvas.width;
          }
        }


        //else do this:

      }
    }
  }

  resetPlayer(didPlayerDie) {
    if (didPlayerDie) {
      this.player.lives--;
    }
    this.player.x = 350;
    this.player.y = 600;
    this.player.currentLane = 0;
    // if ( this.player.lives <= 0) {
        //game over
    // }
  }

  //TODO: maybe instead of having this update 60 tiems a second,
  //      we call this function from winCheck and zoneCheck
  updateHeader(livesLabel, levelLabel) {
    livesLabel.innerText = `Lives: ${this.player.lives}`;
    levelLabel.innerText = `Level: ${this.currentLevel}`;

  }




}

module.exports = Game;
