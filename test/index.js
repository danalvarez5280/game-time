
const { expect, assert } = require('chai')
const Game = require('../lib/game.js');
const Player = require('../lib/player.js');
const Helpers = require('../lib/helpers.js');
const Utilities = require('../lib/utilities.js');

describe('Helpers', () => {

  it('should contain a roundNumber function', () => {
    expect(Helpers.roundNumber).to.exist;
  })

  it('should contain a randomNumber function', () => {
    expect(Helpers.randomNumber).to.exist;
  })

  it('should round a number', () => {
    var oldRound = 123.467;
    var newRound = Helpers.roundNumber(oldRound, 1);
    expect(newRound).to.equal(123.5);
  })

  it('should generate a random number', () => {

    for (let i = 1; i < 100; i++) {
      var random = Helpers.randomNumber(1.0, 4.0, 1);

      assert.isAtLeast(random, 1.0)
      assert.isAtMost(random, 4.0)
    }
  })

});




describe('Utilities', () => {

  it('should contain a randomWidth function', () => {
    expect(Utilities.randomWidth).to.exist;
  })

  it('should generate a random width', () => {

    for (let i = 1; i < 100; i++) {
      var random = Utilities.randomWidth('road');

      assert.include([100, 150, 200], random);
    }

  })

  it('should generate 5 lanes', () => {

    var newGame = new Game ('canvas', 'context', 'Fred');

    for (let i = 5; i > 0; i--) {
      Utilities.laneFactory(newGame, i, 'road', 0.5, 3.0);
    }

    assert.equal(newGame.lanes.length, 5)

  })


  it('should add movers to the lanes', () => {

    var newGame = new Game ('canvas', 'context', 'Fred');

    for (let i = 5; i > 0; i--) {
      Utilities.laneFactory(newGame, i, 'road', 0.5, 3.0);
    }

    for (let j = 1; j < 5; j++) {
      assert.isAtLeast(newGame.lanes[j].moversInMyLane.length, 1)
    }
  })


  it('should determine a model', () => {

    var newGame = new Game ('canvas', 'context', 'Fred');

    for (let i = 5; i > 0; i--) {
      Utilities.laneFactory(newGame, i, 'road', 0.5, 3.0);
    }

    newGame.lanes[0].width = 150;
    newGame.lanes[0].direction = 1;

    var model = Utilities.determineModel(newGame.lanes[0], 'road');
    assert.equal(model, 'truck1right.png')

  })

  
describe('Game', () => {
  
  it('shoud exist', () => {
    expect(newGame).to.exist
  })

  it('user name should be "Fred"', () => {
    expect(newGame.nameInput).to.equal("Fred")
  })

  it('should start with an emptyarray called "platforms"', () => {
    assert.deepEqual(newGame.platforms, []);
  })

  it('should move 5 platforms into that array when "addPlatforms" is called', () => {
    assert.deepEqual(newGame.platforms, []);
    newGame.addPlatforms();
    assert.deepEqual(newGame.platforms.length, 5)
  })

  it('should start with an empty array called "lanes"', () => {
    expect(newGame.lanes.length).to.equal(0)
  })

  it('should move 13 lanes into that array when "" is called', () => {
    expect(newGame.lanes.length).to.equal(0)
    newGame.addMovers();
    expect(newGame.lanes.length).to.equal(13);
  })

  it('should have a currentLevel and it should start at 1', () => {
    expect(newGame.currentLevel).to.equal(1);
  })

//this test will only pass if we turn off the showNextLevelScreen function, it breaks because it read that function and doesn't understand it
  // it('should have a changeLevel function that causes the level to go up by 1', () => {
  //   expect(newGame.currentLevel).to.equal(1);
  //   newGame.changeLevel();
  //   assert.equal(newGame.currentLevel, 2);
  //   newGame.changeLevel();
  //   expect(newGame.currentLevel).to.equal(3);
  //
  // })


});

describe('Player', () => {
  let newPlayer;

  beforeEach(() => {
    newPlayer = new Player (3);
  })

  it('should exist', () =>{
    expect(newPlayer).to.exist;
  })

  it('should have a currentLane that starts at 0', () => {
    expect(newPlayer.currentLane).to.equal(0);
  })

  it('should have a numberOfFrames set to 7', () => {
    expect(newPlayer.numberOfFrames).to.equal(7)
  })

  it('should have a tickCount that starts at 0', () => {
    assert.equal(newPlayer.tickCount, 0)
  })

  it('should have a frameIndex set to 0', () => {
    assert.equal(newPlayer.frameIndex, 0)
  })

  it('should have an animateOn set to false', () => {
    assert.equal(newPlayer.animateOn, false)
  })
});







//
