
const Platform = require('./platform.js');
const Player = require('./player.js');
const Mover = require('./mover.js');
const Lane = require('./lane.js');
const Lilypad = require('./lilypad.js');
const helpers = require('./helpers.js');
const Utilities = require('./utilities.js');

// uncomment this for testing node

// var Canvas = require('canvas');
// global.Image = Canvas.Image;

//First, I had to run: brew install pkg-config cairo libpng jpeg giflib
//Then run: npm install canvas
//and add an externals to webpack.config.js



class Game {
  constructor(canvas, context, nameInput) {
    this.canvas = canvas;
    this.context = context;
    this.platforms = [];
    this.lanes = [];
    this.player = undefined;
    this.currentLevel = 1;
    this.currentScore = 0;
    this.keepDrawing = false;
    this.justLost = false;
    this.nameInput = nameInput;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  showWelcomeScreen(livesLabel, levelLabel, scoreLabel) {

    this.nameInput.style.display = "block";
    this.nameInput.value = this.nameInput.value || '';

    livesLabel.innerText = `Lives: ${this.player.lives}`;
    levelLabel.innerText = `Level: ${this.currentLevel}`;
    scoreLabel.innerText = `Score: ${this.currentScore}`;

    this.context.fillStyle = '#006E90';
    this.context.fillRect(100, 100, 600, 450);

    this.context.fillStyle = '#f0ff79';
    this.context.font = "48px Acme";

    let message = `Welcome to Frogger`;
    this.context.fillText(message, 195, 175);

    message = `Enter Your Name`
    this.context.fillText(message, 225, 275);

    message = `Press SpaceBar To Start`
    this.context.fillText(message, 175, 400);
  }

  showGameOverScreen() {
    let topFive = Utilities.pushToLocalStorage(this);

    this.keepDrawing = false;
    this.justLost = true;
    this.context.fillStyle = '#006E90';
    this.context.fillRect(100, 100, 600, 450);

    this.context.fillStyle = '#f0ff79';
    this.context.font = "35px Acme";

    let message = `GAME OVER`;

    this.context.fillText(message, 300, 150);

    message = `Your Score Was:  ${this.currentScore}`
    this.context.fillText(message, 275, 200);

    message = `High Scores:`
    this.context.fillText(message, 305, 250);

    for ( let i = 0; i < topFive.length; i++) {
      this.context.font = "30px Acme";
      message = `${i + 1}: ${topFive[i].scoreName} - ${topFive[i].scoreTotal}`;
      this.context.fillText(message, 275, 300 + (i * 30));
    }

    this.context.font = "30px Acme";
    message = `Press SpaceBar To Continue`
    this.context.fillText(message, 240, 500);
  }

  showNextLevelScreen() {
    this.context.fillStyle = '#006E90';
    this.context.fillRect(100, 100, 600, 450);

    this.context.fillStyle = '#f0ff79';
    this.context.font = "48px Acme";

    let message = `You passed level ${this.currentLevel}!`;

    this.context.fillText(message, 215, 275);

    message = `Press SpaceBar`
    this.context.fillText(message, 240, 350);
    message = `To Start Level ${this.currentLevel + 1}`
    this.context.fillText(message, 240, 400);
  }

  showYouDiedScreen() {
    this.keepDrawing = false;
    this.context.fillStyle = '#006E90';
    this.context.fillRect(100, 100, 600, 450);

    this.context.fillStyle = '#f0ff79';
    this.context.font = "48px Acme";

    let message = `YOU DIED!!`;
    this.context.fillText(message, 270, 250);

    message = `You only have ${this.player.lives} lives left`;
    this.context.fillText(message, 175, 325);

    message = `Press Spacebar to Continue`;
    this.context.fillText(message, 150, 400);

  }


  zoneCheck() {
    this.borderCheck();
    if (this.player.y >= 350 && this.player.y < 600) {
      this.checkCollision();
    }
    if (this.player.y >= 0 && this.player.y < 300) {
      this.checkCollisionWater();
    }
  }


  checkCollision() {
    for (let i = 0; i < this.lanes.length; i++) {
      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {
        let mover = this.lanes[i].moversInMyLane[j];
        let frog = this.player;

        if (mover.x < frog.x + (frog.width - 15) &&
        mover.x + mover.width > (frog.x + 15) &&
        mover.y < frog.y + (frog.height - 15) &&
        mover.height + mover.y > frog.y) {
          // collision detect
          this.resetPlayer(true);
        } else {
          // no collision
        }
      }
    }
  }

  checkCollisionWater() {
    let didILand = false;

    for (let j = 0; j < this.lanes[this.player.currentLane].moversInMyLane.length; j++) {
      let lane = this.lanes[this.player.currentLane];
      let mover = lane.moversInMyLane[j];
      let frog = this.player;

      if ( ((frog.x > mover.x - 15) && (frog.x < (mover.x + mover.width))) &&
            (((frog.x + frog.width) > mover.x) && ((frog.x + frog.width) < (mover.x + mover.width + 15)))) {
              //landed but on a lily pad
        didILand = true;
        if ( frog.currentLane === this.lanes.length - 1 ) {
          mover.model = frog.model;
          mover.occupied = true;
          this.currentScore = (this.currentScore + ((20 * this.currentLevel) * this.currentLevel))
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
      this.player.currentLane = 0;
    }
  }

  changeLevel() {
    this.keepDrawing = false;
    this.showNextLevelScreen()
    this.currentLevel++;
  }

  winCheck() {
    let lastLaneIndex = this.lanes.length - 1;
    let lastLaneMovers = this.lanes[lastLaneIndex].moversInMyLane;
    let didIWin = true;

    for ( let i = 0; i < lastLaneMovers.length; i++) {
      let mover = lastLaneMovers[i];
      if ( mover.occupied === false) {
        didIWin = false;
      }
    }

    if (didIWin === true) {
      this.changeLevel();
      for (let i = 0; i < this.lanes.length; i++) {
        //this is the speed adjustment per level
        this.lanes[i].speed = this.lanes[i].speed * (eval('1.' + this.currentLevel.toString()));
      }

      for (let i = 0; i < lastLaneMovers.length; i++) {
        lastLaneMovers[i].occupied = false;
        lastLaneMovers[i].model = 'lilypad.png';
      }
    }
  }


  addPlatforms() {
    let startZone = new Platform( 0, 600, this.canvas.width, 50, 'grass.png')

    this.platforms.push(startZone)

    let road = new Platform ( 0, 350, this.canvas.width, 250, 'road.png')

    this.platforms.push(road)

    let median = new Platform ( 0, 300, this.canvas.width, 50, 'grass.png')

    this.platforms.push(median)

    let water = new Platform ( 0, 50, this.canvas.width, 250, 'water.png')

    this.platforms.push(water)

    let endZone = new Platform ( 0, 0, this.canvas.width, 50, 'bush.png')

    this.platforms.push(endZone)
  }

  addPlayers() {
    let playerImage = new Image();

    playerImage.src = '../images/frog-spriteB.png';
    this.player = new Player ( 350, 600, 50, 50, 'frog.png', 3, playerImage)
  }

  addMovers() {

    let start = new Lane('1', 0, 600);
    let median = new Lane('1', 0, 300);
    let end = new Lane('1', 0, 0);

    let lilyPad1 = new Lilypad(125, end.y, 50, 50, 'lilypad.png', false);
    let lilyPad2 = new Lilypad(250, end.y, 50, 50, 'lilypad.png', false);
    let lilyPad3 = new Lilypad(375, end.y, 50, 50, 'lilypad.png', false);
    let lilyPad4 = new Lilypad(500, end.y, 50, 50, 'lilypad.png', false);
    let lilyPad5 = new Lilypad(625, end.y, 50, 50, 'lilypad.png', false);

    // end.pushOntoLane(lilyPad1);
    end.pushOntoLane(lilyPad2);
    // end.pushOntoLane(lilyPad3);
    end.pushOntoLane(lilyPad4);
    // end.pushOntoLane(lilyPad5);

    this.lanes.push(start);

    //push 5 road lanes
    for (let i = 5; i > 0; i--) {
      Utilities.laneFactory(this, i, 'road', 0.5, 3.0);
    }

    this.lanes.push(median);

    //push 5 water lanes
    for (let i = 5; i > 0; i--) {
      Utilities.laneFactory(this, i, 'agua', 0.5, 3.0);
    }

    this.lanes.push(end);
  }


  drawPlatforms() {
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].draw(this.context);
    }
  }

  drawPlayer() {
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

        if (this.lanes[i].direction === 1) {

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

      }
    }
  }

  resetPlayer(didPlayerDie) {

    if (didPlayerDie) {
      this.player.lives--;
      this.showYouDiedScreen();
    }
    if (this.player.lives <= 0) {
      //GAME OVER
      this.showGameOverScreen();
    }
    this.player.x = 350;
    this.player.y = 600;
    this.player.currentLane = 0;
  }

  //TODO: maybe instead of having this update 60 tiems a second,
  //      we call this function from winCheck and zoneCheck
  updateHeader(livesLabel, levelLabel, scoreLabel) {

    if (livesLabel.innerText !== this.player.lives ||
        levelLabel.innerText !== this.currentLevel ||
        scoreLabel.innerText !== this.currentScore) {
      livesLabel.innerText = `Lives: ${this.player.lives}`;
      levelLabel.innerText = `Level: ${this.currentLevel}`;
      scoreLabel.innerText = `Score: ${this.currentScore}`;
    }
  }

}

module.exports = Game;
