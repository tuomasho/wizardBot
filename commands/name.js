const Discord = require("discord.js");
const colors = require("../json_files/colors.json");

module.exports.run = async (bot, message, args) => {
  console.log("Args length: " + args.length);

  //has first and lastname declared
  if (args.length > 1) {
  } else if (args.length == 1) {
  } else {
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

  // let sEmbed = new Discord.RichEmbed()
  //   .setColor(colors.purple_dark)
  //   .setAuthor(`Welcome ${message.author.username}`)
  //   .setDescription(
  //     "If you are new player please type !name <firstname> <lastname>. If you are returning player and wish to start a new family please type !newgame <firstname><lastname> otherwise you can just do !name <firstname>"
  //   )
  //   .setFooter(`Best wishes ${bot.user.username}`);

  // message.reply({ embed: sEmbed });
  // message.delete();
};

module.exports.config = {
  name: "name",
  aliases: []
};
