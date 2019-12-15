const { randomInteger } = require("../math_functions/randoms");

function getChanceScore(timesInHouse, skill) {
  return 2.5 + timesInHouse * skill;
}

module.exports.sort = (user, stats) => {
  var gChanceScore = getChanceScore(user.timesGryffindor, stats.bravery);
  var hChanceScore =
    gChanceScore + getChanceScore(user.timesHufflepuff, stats.herbology);
  var rChanceScore =
    hChanceScore + getChanceScore(user.timesRavenclaw, stats.intelligence);
  var sChanceScore =
    rChanceScore + getChanceScore(user.timesSlytherin, stats.potions);

  let rndm = randomInteger(0, sChanceScore);

  if (rndm < gChanceScore) {
    return "Gryffindor";
  } else if (rndm > gChanceScore && rndm < hChanceScore) {
    return "Hufflepuff";
  } else if (rndm > hChanceScore && rndm < rChanceScore) {
    return "Ravenclaw";
  } else if (rndm > rChanceScore && rndm < sChanceScore) {
    return "Slytherin";
  }
};
