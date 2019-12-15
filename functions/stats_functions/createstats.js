const Stat = require("../../models/Stat");
const { randomInteger } = require("../math_functions/randoms");

module.exports.createNewStats = user => {
  let strength = Math.floor(randomInteger(1, 10));
  let spells = Math.floor(randomInteger(1, 10));
  let flying = Math.floor(randomInteger(1, 10));
  let bravery = Math.floor(randomInteger(1, 10) + 1.5 * user.timesGryffindor);
  let intelligence = Math.floor(
    randomInteger(1, 10) + 1.5 * user.timesRavenclaw
  );
  let potions = Math.floor(randomInteger(1, 10) + 1.5 * user.timesSlytherin);
  let herbology = Math.floor(randomInteger(1, 10) + 1.5 * user.timesHufflepuff);
  let money = Math.floor(randomInteger(50, 200));
  let reputation = Math.floor(
    randomInteger(1, 20) +
      user.timesGryffindor +
      user.timesRavenclaw +
      user.timesSlytherin +
      user.timesHufflepuff
  );

  const newStats = new Stat({
    discordID: user.discordID,
    xp: 0,
    hp: 20,
    strength: strength,
    spells: spells,
    flying: flying,
    bravery: bravery,
    intelligence: intelligence,
    potions: potions,
    herbology: herbology,
    money: money,
    reputation: reputation
  });

  return newStats;
};
