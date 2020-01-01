const Discord = require("discord.js");
const { getHouseColor } = require("../functions/misc_functions/color");
const { sort } = require("../functions/misc_functions/sort");
const { addTimeInHouse } = require("../functions/stats_functions/timesInHouse");
const { baseSubjects } = require("../functions/school_functions/subjects");

//User model
const User = require("../models/User");
//Stat model
const Stat = require("../models/Stat");
//Inv model
const Inv = require("../models/Inv");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;
  //!TODO: Add encryption
  User.findOne({ discordID: `${author}` })
    .lean()
    .exec((err, user) => {
      if (user) {
        if (user.currentLocation == "Hogwarts") {
          if (user.discordID == author) {
            if (user.currentHouse == "null") {
              Stat.findOne({ discordID: `${author}` })
                .lean()
                .exec((err, stat) => {
                  if (stat.discordID == author) {
                    let newHouse = sort(user, stat);
                    let updatedUser = addTimeInHouse(user, newHouse);
                    User.where({ discordID: `${author}` })
                      .updateMany({
                        currentHouse: newHouse,
                        timesGryffindor: updatedUser.timesGryffindor,
                        timesHufflepuff: updatedUser.timesHufflepuff,
                        timesRavenclaw: updatedUser.timesRavenclaw,
                        timesSlytherin: updatedUser.timesSlytherin
                      })
                      .then(() => {
                        let mEmbed = new Discord.RichEmbed()
                          .setColor(getHouseColor(newHouse))
                          .setAuthor(
                            `Congratulations ${user.characterFirstname} ${user.characterLastname}`
                          )
                          .setDescription(
                            `You are now part of ${newHouse} house!\n\nIf you need help on what to do next please type **!help**`
                          )
                          .setFooter(`Best wishes ${bot.user.username}`);

                        message.reply({ embed: mEmbed });
                        message.delete();
                      });
                  } else {
                    message.reply(
                      " no active character. Please type **!start** for more information"
                    );
                    message.delete();
                  }
                });

              const newInv = new Inv({
                discordID: author,
                learnedSubjects: baseSubjects()
              });

              newInv.save();
            } else {
              message.reply(
                " you are already sorted! If you need help type **!help**"
              );
              message.delete();
            }
          } else {
            message.reply(
              " there is no user saved for this discord id. Please type **!start** for more information."
            );
            message.delete();
          }
        }
      } else {
        message.reply(
          "  there is no user saved for this discord id. Please type **!start** for more information."
        );
        message.delete();
      }
    });
};

module.exports.config = {
  name: "sort",
  aliases: []
};
