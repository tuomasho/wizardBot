const { randomInteger } = require("../math_functions/randoms");
const { foundItem } = require("../math_functions/probability");

module.exports.completeAdventure = (message, length) => {
  let prob = length * 1.6;
  let success = randomInteger(0, 100);
  let author = message.author.id;

  if (foundItem(prob, success)) {
  }
};
