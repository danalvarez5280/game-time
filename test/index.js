const { expect } = require('chai')
const Game = require('../lib/game.js');
// const Index = require('../lib/Index.js');

// describe('Index', () => {
//
//   let canvas = document.getElementById('frogger');
//   let context = canvas.getContext('2d');
//
//   it('should exist', () => {
//     expect(canvas).to.exist
//   })
//
// })


describe('Game', () => {
  let newGame;

  beforeEach(() => {
    newGame = new Game ('canvas', 'context', 'Fred');
  })


  it('should exist', () => {
    //expect(true)
    expect(newGame).to.exist
  })

  it('the game should start on level 1', () => {
    expect(newGame.currentLevel).to.equal(1)
  })

  it('user name should be "Fred"', () => {
    expect(newGame.nameInput).to.equal("Fred")
  })

  it('should have a function that will add a player', () =>{
    expect(newGame.addPlayers).to.exist
    // expect(newGame.player).to.exist
  })
  // expect(card.answer).to.equal('Juneau')

});
