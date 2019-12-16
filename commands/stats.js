const Discord = require("discord.js");
const { getHouseColor } = require("../functions/misc_functions/color");
const { findUser } = require("../functions/db_functions/finduser");
const { findStat } = require("../functions/db_functions/findstat");

//User model
const User = require("../models/User");
//User model
const Stat = require("../models/Stat");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;

  User.findOne({ discordID: `${author}` })
    .lean()
    .exec((err, user) => {
      if (err) console.log("[LOGS_ERROR]: " + err);

      if (user) {
        Stat.findOne({ discordID: `${author}` })
          .lean()
          .exec((err, stats) => {
            if (err) console.log("[LOGS_ERROR]: " + err);

            if (stats) {
              let mEmbed = new Discord.RichEmbed()
                .setColor(getHouseColor(user.currentHouse))
                .setAuthor(`Your current statistics are`)
                .addField("**XP:**", stats.xp, true)
                .addBlankField(true)
                .addField("**HP:**", stats.hp, true)
                .addField("**Strength:**", stats.strength, true)
                .addBlankField(true)
                .addField("**Spells:**", stats.spells, true)
                .addField("**Flying:**", stats.flying, true)
                .addBlankField(true)
                .addField("**Bravery:**", stats.bravery, true)
                .addField("**Intelligence:**", stats.intelligence, true)
                .addBlankField(true)
                .addField("**Potions:**", stats.potions, true)
                .addField("**Herbology:**", stats.herbology)
                .addField("**Money:**", stats.money, true)
                .addField("**Reputation:**", stats.reputation, true);

              message.reply({ embed: mEmbed });
              message.delete();
            }
          });
      }
    });
};

module.exports.config = {
  name: "stats",
  aliases: []
};
