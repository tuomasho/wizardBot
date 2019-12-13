const Discord = require("discord.js");
const colors = require("../json_files/colors.json");

module.exports.run = async (bot, message, args) => {
  let sEmbed = new Discord.RichEmbed()
    .setColor(colors.purple_dark)
    .setAuthor(`Welcome ${message.author.username}`)
    .setDescription(
      "If you are new player please type !name <firstname> <lastname>. If you are returning player and wish to start a new family please type !newgame <firstname><lastname> otherwise you can just do !name <firstname>"
    )
    .setFooter(`Best wishes ${bot.user.username}`);

  message.reply({ embed: sEmbed });
  message.delete();
};

module.exports.config = {
  name: "start",
  aliases: []
};
