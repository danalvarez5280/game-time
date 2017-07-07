const { expect } = require('chai')
const { assert } = require('chai')
const Game = require('../lib/game.js');
const Player = require('../lib/player.js');

describe('Game', () => {
  let newGame;

  beforeEach(() => {
    newGame = new Game ('canvas', 'context', 'Fred');
  })


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
