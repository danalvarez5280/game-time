
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
    this.keepDrawing = false;
    this.justLost = false;
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
          console.log('on log dir: ', lane.direction, ' | speed: ', lane.speed);
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

  changeLevel() {
    this.keepDrawing = false;
    let levelPassed = this.currentLevel;
    this.currentLevel++;

    this.context.fillStyle = 'white';
    this.context.fillRect(100, 100, 600, 450);

    this.context.fillStyle = 'black';
    this.context.font = "48px Acme";
    let message = `You passed level ${levelPassed}`;
    this.context.fillText(message, 150, 150);

    message = `Press SpaceBar to start level ${this.currentLevel}`
    this.context.fillText(message, 150, 250);
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
      this.changeLevel();

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

  roundNumber(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  randomNumber(min, max, precision) { //min max are inclusive
    var newNum = (Math.random() * (max - min)) + min;
    newNum = this.roundNumber(newNum, precision);
    return newNum;
  }

  laneFactory(i, type) {

    var direction = ((i % 2 === 1) ? 1 : -1);
    var speed = this.randomNumber(0.5, 4.0, 1);
    var offset = (type === 'road' ? 300 : 0);
    var y = offset + (i * 50);
    var randomWidth;

    if (type === 'road') {
      // create random number:
      // car1 - 100
      // car2 - 100
      // car3 - 100
      // truck1 - 150
      // truck2 - 200
      randomWidth = this.randomNumber(2, 4) * 50;
    }

    if (type === 'agua') {
      // create random number:
      // log1 - 150
      // log2 - 250
      // log3 - 350
      randomWidth = (this.randomNumber(0, 2) * 100) + 150;
    }

    var newLane = new Lane(direction.toString(), speed, y, randomWidth);

    this.moverFactory(newLane, type);
    this.lanes.push(newLane);

  }

  moverFactory(lane, type) {

    var y = lane.y;
    var width = lane.width;
    var height = 50;
    var model = 'red';
    var walkable = type === 'road' ? false : true;

    let gap = 0;
    let x = 0;
    let prevX = 0;
    let prevWidthGap = 0;
    let carNum;
    //dont think we need offset anymore...we can just start on canvas
    let offset = 0;// (lane.direction === 1 ? -1100 : 1100);

    let newMover;

    switch (lane.width) {
      case 100: //car1, 2, 3
      carNum = this.randomNumber(1, 3);
      model = 'green';
      break;

      case 150:
      if (type === 'road') {
        model = 'orange'; //truck1
      } else {
        model = 'brown'; //log1
      }
      break;

      case 200: //truck2
      model = 'teal';
      break;

      case 250: //log2
      model = 'brown';
      break;

      case 350: //log3
      model = 'brown';
      break;
    }

    while (x + gap + (lane.width * 2) < 800) {
      // widths are (100, 150, or 200) or (150, 250, or 350)
      x = (prevX + prevWidthGap);

      newMover = new Mover(x + offset, y, width, height, model, walkable);

      lane.pushOntoLane(newMover);

      // create random number 100, 150, or 200
      gap = this.randomNumber(2, 4) * 50;
      prevWidthGap = lane.width + gap;
      prevX = x;

    }

  }

  addMovers() {

    //manually add these
    var start = new Lane('1', 0, 600);
    var median = new Lane('1', 0, 300);
    var end = new Lane('1', 0, 0);

    //for 1-5

    // var road1, road2, road3, road4, road5;
    // for (let i = 1; i < 6; i++) {
    //   var newLane = this.laneFactory(i, 'road');
    //   eval("road" + i + " = newLane;")
    // }


    // var road1 = new Lane('-1', 1.3, 550);
    // var road2 = new Lane('1', 2.3, 500);
    // var road3 = new Lane('-1', 3.3, 450);
    // var road4 = new Lane('1', 4.3, 400);
    // var road5 = new Lane('-1', 5.3, 350);

    //for 1-5
    // var agua1 = new Lane('1', 0, 250);
    // var agua2 = new Lane('-1', 1.4, 200);
    // var agua3 = new Lane('1', 1.4, 150);
    // var agua4 = new Lane('-1', 1.4, 100);
    // var agua5 = new Lane('1', 1.4, 50);

    //generate till lane is full
    // var truck1 = new Mover(100, road1.y, 100, 50, 'red', false);
    // var truck2 = new Mover(250, road1.y, 100, 50, 'red', false);
    // var truck3 = new Mover(-100, road2.y, 125, 50, 'blue', false);
    // var truck4 = new Mover(-250, road2.y, 125, 50, 'blue', false);
    // var truck5 = new Mover(150, road3.y, 150, 50, 'purple', false);
    // var truck6 = new Mover(350, road3.y, 150, 50, 'purple', false);
    // var truck7 = new Mover(-100, road4.y, 50, 50, 'grey', false);
    // var truck8 = new Mover(-200, road4.y, 50, 50, 'grey', false);
    // var truck9 = new Mover(100, road5.y, 200, 50, 'orange', false);

    //generate till lane is full
    // var log1a = new Mover((0), agua1.y, 100, 50, 'brown', true);
    // var log1b = new Mover((150), agua1.y, 100, 50, 'brown', true);
    // var log1c = new Mover((300), agua1.y, 100, 50, 'brown', true);
    // var log1d = new Mover((450), agua1.y, 100, 50, 'brown', true);
    // var log1e = new Mover((600), agua1.y, 100, 50, 'brown', true);
    // var log1f = new Mover((750), agua1.y, 100, 50, 'brown', true);
    //
    //
    // var log3 = new Mover(150, agua2.y, 625, 50, 'brown', true);
    // var log4 = new Mover(300, agua2.y, 325, 50, 'brown', true);
    // var log5 = new Mover(-100, agua3.y, 600, 50, 'brown', true);
    // var log6 = new Mover(-300, agua3.y, 300, 50, 'brown', true);
    // var log7 = new Mover(-100, agua4.y, 675, 50, 'brown', true);
    // var log8 = new Mover(-300, agua4.y, 375, 50, 'brown', true);
    // var log9 = new Mover(300, agua5.y, 600, 50, 'brown', true);

    //manually or auto with the padding concept
    var lilyPad1 = new Lilypad(125, end.y, 50, 50, 'pink', true, false);
    var lilyPad2 = new Lilypad(250, end.y, 50, 50, 'pink', true, false);
    var lilyPad3 = new Lilypad(375, end.y, 50, 50, 'pink', true, false);
    var lilyPad4 = new Lilypad(500, end.y, 50, 50, 'pink', true, false);
    var lilyPad5 = new Lilypad(625, end.y, 50, 50, 'pink', true, false);

    // road1.pushOntoLane(truck1);
    // road1.pushOntoLane(truck2);
    // road2.pushOntoLane(truck3);
    // road2.pushOntoLane(truck4);
    // road3.pushOntoLane(truck5);
    // road3.pushOntoLane(truck6);
    // road4.pushOntoLane(truck7);
    // road4.pushOntoLane(truck8);
    // road5.pushOntoLane(truck9);

    // agua1.pushOntoLane(log1a);
    // agua1.pushOntoLane(log1b);
    // agua1.pushOntoLane(log1c);
    // agua1.pushOntoLane(log1d);
    // agua1.pushOntoLane(log1e);
    // agua1.pushOntoLane(log1f);
    // // agua1.pushOntoLane(log2);
    // agua2.pushOntoLane(log3);
    // // agua2.pushOntoLane(log4);
    // agua3.pushOntoLane(log5);
    // // agua3.pushOntoLane(log6);
    // agua4.pushOntoLane(log7);
    // // agua4.pushOntoLane(log8);
    // agua5.pushOntoLane(log9);

    end.pushOntoLane(lilyPad1);
    // end.pushOntoLane(lilyPad2);
    // end.pushOntoLane(lilyPad3);
    // end.pushOntoLane(lilyPad4);
    // end.pushOntoLane(lilyPad5);

    this.lanes.push(start);

    for (let i = 1; i < 6; i++) {
      this.laneFactory(i, 'road');
    }

    // this.lanes.push(road1);
    // this.lanes.push(road2);
    // this.lanes.push(road3);
    // this.lanes.push(road4);
    // this.lanes.push(road5);
    this.lanes.push(median);

    for (let i = 5; i > 0; i--) {
      this.laneFactory(i, 'agua');
    }

    // this.lanes.push(agua1);
    // this.lanes.push(agua2);
    // this.lanes.push(agua3);
    // this.lanes.push(agua4);
    // this.lanes.push(agua5);
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
    if (this.player.lives <= 0) { //GAME OVER
      //TODO: move into function - actually make a function to display these popups - use parameters
      this.keepDrawing = false;
      this.justLost = true;
      this.context.fillStyle = 'white';
      this.context.fillRect(100, 100, 600, 450);

      this.context.fillStyle = 'black';
      this.context.font = "48px Acme";

      let message = `GAME OVER`;
      this.context.fillText(message, 150, 150);

      message = `Press SpaceBar to continue`
      this.context.fillText(message, 150, 250);
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
