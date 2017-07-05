require('./frog.css');

var Game = require('./game.js');

const canvas = document.getElementById('frogger');
const context = canvas.getContext('2d');
// const topScores = document.getElementById('high-scores');

const livesLabel = document.getElementById('lives');
const levelLabel = document.getElementById('level');
const scoreLabel = document.getElementById('score');

var frogger;


function initialize() {
  frogger = new Game(canvas, context);

  frogger.addPlatforms();
  frogger.addPlayers();
  frogger.addMovers();

  //move this into it's own function?
  livesLabel.innerText = `Lives: ${frogger.player.lives}`;
  levelLabel.innerText = `Level: ${frogger.currentLevel}`;
  scoreLabel.innerText = `Score: ${frogger.currentScore}`;

  frogger.context.fillStyle = 'white';
  frogger.context.fillRect(100, 100, 600, 450);

  frogger.context.fillStyle = 'black';
  frogger.context.font = "48px Acme";

  let message = `Welcome to Frogger`;
  frogger.context.fillText(message, 150, 150);

  message = `Press SpaceBar to Start`
  frogger.context.fillText(message, 150, 250);
  //gameLoop();
}


function gameLoop() {
  // order of drawing doodads: Platforms, Movers, Player
  // console.log('loop');
  frogger.clearCanvas();
  frogger.drawPlatforms();
  frogger.drawMovers();
  frogger.tickCalc();
  frogger.drawPlayer();
  frogger.zoneCheck();
  frogger.winCheck();
  frogger.updateHeader(livesLabel, levelLabel, scoreLabel);
  // if (frogger.player.y >= 350 && frogger.player.y < 600) {
  //   frogger.checkCollision();
  // }
  // if (frogger.player.y >= 50 && frogger.player.y < 300) {
  //   frogger.checkCollisionWater();
  // }
  frogger.moveMovers();
  if (frogger.keepDrawing) {
    requestAnimationFrame(gameLoop);
  }
}



window.addEventListener('keydown', function(event) {
  // console.log(event.keyCode);

  // Code 32 = Spacebar | If you dont check the keepDrawing, the game will exponentially get faster,
  // as i think game loops keep stacking
  if (event.keyCode === 32 && frogger.keepDrawing === false) {
    if (frogger.justLost === true) {
      frogger.justLost = false;
      initialize();
    } else {
      frogger.keepDrawing = true;
      gameLoop();
    }

    // this keepDrawing check prevents the user from moving the frog while a message is displayed
  } else if (frogger.keepDrawing === true) {
    switch (event.keyCode) {
      case 39: //right
      frogger.player.x += 50;
      break;
      case 37: //left
      frogger.player.x -= 50;
      break;
      case 38: //up
      frogger.player.y -= 50;
      frogger.player.currentLane++;
      break;
      case 40: //down
      frogger.player.y += 50;
      frogger.player.currentLane--;
      break;
    }
    frogger.player.animateOn = true;

  }

});




initialize();


//
