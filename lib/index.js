require('./frog.css');

var Doodad = require('./doodad.js');
var Platform = require('./platform.js');
var Player = require('./player.js');

const canvas = document.getElementById('frogger');
const context = canvas.getContext('2d');

// var truck1 = new Truck( 0, 0, 40, 15, right)
//
// var movers = []
//
//
//


function gameStart() {

  var background = []
  var startZone = new Platform( 0, 750, canvas.width, 50, 'pink', true)
  background.push(startZone)

  var road = new Platform ( 0, 550, canvas.width, 200, 'black', true)
  background.push(road)
  // road.draw(context)

  var median = new Platform ( 0, 500, canvas.width, 50, 'green', true)
  background.push(median)
  // median.draw(context)

  var water = new Platform ( 0, 300, canvas.width, 200, 'blue', true)
  background.push(water)
  // water.draw(context)

  var endZone = new Platform ( 0, 250, canvas.width, 50, 'green', true)
  background.push(endZone)
  // endZone.draw(context)

  var frog = new Player ( 225, 750, 50, 50, 'yellow', 3)

  context.clearRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < background.length; i++){
    console.log(background[i]);
    background[i].draw(context)
  }
  frog.draw(context)

  window.addEventListener('keydown', function(event){
    console.log(event.keyCode);
    switch(event.keyCode){
      case 39:
      frog.x += 50;
      break;
      case 37:
      frog.x -= 50;
      break;
      case 38:
      frog.y -= 50;
      break;
      case 40:
      frog.y += 50;
      break;
    }
      context.clearRect(frog)
      frog.draw(context)
  });
}

function gameLoop() {
  gameStart();
  // frog.draw(context)
}


gameLoop();
