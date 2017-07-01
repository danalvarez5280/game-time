require('./frog.css');

var Game = require('./game.js');

const canvas = document.getElementById('frogger');
const context = canvas.getContext('2d');

const livesLabel = document.getElementById('lives');
const levelLabel = document.getElementById('level');

var frogger;


function initialize() {
  frogger = new Game(canvas, context);

  frogger.addPlatforms();
  frogger.addPlayers();
  frogger.addMovers();

  //move this into it's own function?
  livesLabel.innerText = `Lives: ${frogger.player.lives}`;
  levelLabel.innerText = `Level: ${frogger.currentLevel}`

  gameLoop();
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
  frogger.updateHeader(livesLabel, levelLabel);
  // if (frogger.player.y >= 350 && frogger.player.y < 600) {
  //   frogger.checkCollision();
  // }
  // if (frogger.player.y >= 50 && frogger.player.y < 300) {
  //   frogger.checkCollisionWater();
  // }
  frogger.moveMovers();
  requestAnimationFrame(gameLoop);
}



window.addEventListener('keydown', function(event) {
  // console.log(event.keyCode);
  switch (event.keyCode) {
    case 39:
      frogger.player.x += 50;
      break;
    case 37:
      frogger.player.x -= 50;
      break;
    case 38:
      frogger.player.y -= 50;
      frogger.player.currentLane++;
      break;
    case 40:
      frogger.player.y += 50;
      frogger.player.currentLane--;
      break;
  }
  frogger.player.animateOn = true;
});




initialize();


//
