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


});







//
