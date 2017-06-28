

require('./frog.css');

var Game = require('./game.js');

const canvas = document.getElementById('frogger');
const context = canvas.getContext('2d');

var frogger;


function initialize() {
  frogger = new Game(canvas, context);

  frogger.addPlatforms();
  frogger.addPlayers();
  frogger.addMovers();

  gameLoop();
}


function gameLoop() {
  // order of drawing doodads: Platforms, Movers, Player
  console.log('loop');
  frogger.clearCanvas();
  frogger.drawPlatforms();
  frogger.drawMovers();
  frogger.drawPlayer();
  requestAnimationFrame(gameLoop);
  frogger.moveMovers();
}



window.addEventListener('keydown', function(event) {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 39:
      frogger.player.x += 50;
      break;
    case 37:
      frogger.player.x -= 50;
      break;
    case 38:
      frogger.player.y -= 50;
      break;
    case 40:
      frogger.player.y += 50;
      break;
  }
});




initialize();


//
