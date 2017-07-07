
var helpers = require('./helpers.js');
var Mover = require('./mover.js');
var Lane = require('./lane.js');

function tickCalc(game) {
  if (game.player.animateOn) {
    game.player.tickCount += 1;
    if (game.player.tickCount > 1) {
      game.player.tickCount = 0; // we are drawing, so need to reset

      if (game.player.frameIndex < game.player.numberOfFrames - 1) {
        game.player.frameIndex += 1;
      } else {
        game.player.frameIndex = 0;
        game.player.animateOn = false;
      }
    }
  } else {
    game.player.frameIndex = 0;
  }
}


function randomWidth(type) {
  let randomWidth;

  if (type === 'road') {
    // create random number:
    // car1 - 100
    // car2 - 100
    // car3 - 100
    // truck1 - 150
    // truck2 - 200
    randomWidth = helpers.randomNumber(2, 6) * 50;
    //we expanded the randomnumber to 6, which means we could get 250, or 300
    //this is a tricky way to weight the randomness...because if it hits either
    //of those numbers, we rever it back to 100, essentially allow the cars
    //to 'win' the randomness more often ;)
    randomWidth = (randomWidth > 200 ? 100 : randomWidth);
  }

  if (type === 'agua') {
    // create random number:
    // log1 - 150
    // log2 - 250
    // log3 - 350
    randomWidth = (helpers.randomNumber(0, 2) * 100) + 150;
  }
  return randomWidth;
}


function laneFactory(game, i, type, minSpeed, maxSpeed) {
  var direction = ((i % 2 === 1) ? 1 : -1);
  var speed = helpers.randomNumber(minSpeed, maxSpeed, 1);
  var offset = (type === 'road' ? 300 : 0);
  var y = offset + (i * 50);
  var newRandomWidth = randomWidth(type);

  var newLane = new Lane(direction, speed, y, newRandomWidth);
  moverFactory(newLane, type);
  game.lanes.push(newLane);
}


function moverFactory(lane, type) {
  var y = lane.y;
  var width = lane.width;
  var height = 50;
  let gap = 0;
  let x = 0;
  let prevX = 0;
  let prevWidthGap = 0;
  let newMover;
  let model = determineModel(lane, type);

  while (x + gap + (width * 2) < 800) {
    // widths are (100, 150, or 200) or (150, 250, or 350)
    x = (prevX + prevWidthGap);
    newMover = new Mover(x, y, width, height, model);
    lane.pushOntoLane(newMover);

    // create random gap: 100, 150, or 200
    gap = helpers.randomNumber(2, 4) * 50;
    prevWidthGap = width + gap;
    prevX = x;
  }
}


function determineModel(lane, type) {
  var model = 'error.png';

  switch (lane.width) {
  case 100:
    let carNum = helpers.randomNumber(1, 3);
    model = (lane.direction === 1 ? `car${carNum}right.png` : `car${carNum}left.png`);
    break;

  case 150:
    if (type === 'road') {
      model = (lane.direction === 1 ? 'truck1right.png' : 'truck1left.png');
    } else {
      model = (lane.direction === 1 ? 'log1right.png' : 'log1left.png');
    }
    break;

  case 200:
    model = (lane.direction === 1 ? 'truck2right.png' : 'truck2left.png');
    break;

  case 250:
    model = (lane.direction === 1 ? 'log2right.png' : 'log2left.png');
    break;

  case 350:
    model = (lane.direction === 1 ? 'log3right.png' : 'log3left.png');
    break;
  }

  return model;
}



function pushToLocalStorage(game) {

  let topScores = JSON.parse(localStorage.getItem('HighScores')) || [];
  let scoreTotal = game.currentScore;
  let scoreName = game.nameInput.value || 'Default User';

  topScores.push({scoreTotal, scoreName});

  var sortedScores = topScores.sort(function (a, b) {
    return b.scoreTotal - a.scoreTotal;
  });

  var topFive = sortedScores.slice(0, 5);
  let stringScore = JSON.stringify(topFive);

  localStorage.setItem('HighScores', stringScore);

  return topFive;
}





module.exports = { tickCalc, randomWidth, laneFactory, moverFactory, determineModel, pushToLocalStorage };
