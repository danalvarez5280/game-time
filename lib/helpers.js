


  function roundNumber(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  function randomNumber(min, max, precision) { //min max are inclusive
    var newNum = (Math.random() * (max - min)) + min;
    newNum = roundNumber(newNum, precision);
    return newNum;
  }

  module.exports = {roundNumber, randomNumber};
