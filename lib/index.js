require('./frog.css');

var Game = require('./game.js');
var Utilities = require('./utilities.js');

const canvas = document.getElementById('frogger');
const context = canvas.getContext('2d');

const livesLabel = document.getElementById('lives');
const levelLabel = document.getElementById('level');
const scoreLabel = document.getElementById('score');
const nameInput = document.getElementById('user-name');

var frogger;

function initialize() {
  frogger = new Game(canvas, context, nameInput);

  frogger.addPlatforms();
  frogger.addPlayers();
  frogger.addMovers();
  frogger.showWelcomeScreen(livesLabel, levelLabel, scoreLabel);
}

function gameLoop() {
  frogger.clearCanvas();
  frogger.drawPlatforms();
  frogger.drawMovers();
  Utilities.tickCalc(frogger);
  frogger.zoneCheck();
  frogger.drawPlayer();
  frogger.winCheck();
  frogger.moveMovers();
  frogger.updateHeader(livesLabel, levelLabel, scoreLabel);

  if (frogger.keepDrawing) {
    requestAnimationFrame(gameLoop);
  }
}

window.addEventListener('keydown', function(event) {
  // keyCode 32 = spacebar
  if (event.keyCode === 32 && frogger.keepDrawing === false) {
    if (frogger.justLost === true) {
      frogger.justLost = false;
      initialize();
    } else {
      frogger.nameInput.style.display = "none";
      frogger.keepDrawing = true;
      gameLoop();
    }

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
