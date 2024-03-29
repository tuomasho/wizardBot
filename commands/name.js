const Discord = require("discord.js");
const Cryptr = require("cryptr");
const colors = require("../json_files/colors.json");
const { encryptKey } = require("../json_files/dbconfig.json");
const { createNewStats } = require("../functions/stats_functions/createstats");

//User model
const User = require("../models/User");

const cryptr = new Cryptr(encryptKey);

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;
  //!TODO: Add encryption

  //has first and lastname declared
  if (args.length > 1) {
    User.findOne({ discordID: `${author}` })
      .lean()
      .exec((err, user) => {
        if (user) {
          console.log("Existing user found");
        } else {
          //User is starting the game for the first time
          const newUser = new User({
            discordID: author,
            characterFirstname: args[0],
            characterLastname: args[1],
            currentActivity: "doing nothing",
            currentLocation: "Hogwarts",
            timesGryffindor: 0,
            timesHufflepuff: 0,
            timesRavenclaw: 0,
            timesSlytherin: 0,
            familyMoney: 0,
            familyItems: []
          });

          newUser.save();

          let newStats = createNewStats(newUser);

          newStats.save().then(() => {
            let mEmbed = new Discord.RichEmbed()
              .setColor(colors.purple_dark)
              .setAuthor(
                `Hello ${newUser.characterFirstname} ${newUser.characterLastname}!`
              )
              .setDescription(`Your current statistics are`)
              .addField("**XP:**", newStats.xp, true)
              .addBlankField(true)
              .addField("**HP:**", newStats.hp, true)
              .addField("**Strength:**", newStats.strength, true)
              .addBlankField(true)
              .addField("**Spells:**", newStats.spells, true)
              .addField("**Flying:**", newStats.flying, true)
              .addBlankField(true)
              .addField("**Bravery:**", newStats.bravery, true)
              .addField("**Intelligence:**", newStats.intelligence, true)
              .addBlankField(true)
              .addField("**Potions:**", newStats.potions, true)
              .addField("**Herbology:**", newStats.herbology)
              .addField("**Money:**", newStats.money, true)
              .addField("**Reputation:**", newStats.reputation, true)
              .addField(
                "**!!NOTICE!!**",
                "You are now ready to be sorted! \n Please type **!sort** to continue"
              );

            message.reply({ embed: mEmbed });
            message.delete();
          });
        }
      });
  }
  //has only firstname declared
  else if (args.length == 1) {
    //!TODO: Add only firstname functionality after dying is possible
  }
  //dont have anything declared => error
  else {
    let mEmbed = new Discord.RichEmbed()
      .setColor(colors.purple_dark)
      .setAuthor(`Dear ${message.author.username}`)
      .setDescription(
        "You have forgotten to tell us your name so we could sign you into Hogwarts School of Magic. Please type **!start** for more information."
      )
      .setFooter(`Best wishes ${bot.user.username}`);

    message.reply({ embed: mEmbed });
    message.delete();
  }
};

module.exports.config = {
  name: "name",
  aliases: []
};
