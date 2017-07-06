const { expect } = require('chai')
const Game = require('../lib/Game.js');
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


  it.skip('should exist', () => {
    //expect(true)
    expect(newGame).to.exist
  })

  it.skip('should take a question and answer argument', () => {
    expect(card.question).to.equal('What is the capital of Alaska?')
    expect(card.answer).to.equal('Juneau')
  })

});
