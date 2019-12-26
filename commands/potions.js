const Discord = require("discord.js");
const { getMinisterColor } = require("../functions/misc_functions/color");
const potions = require("../json_files/potions.json");

module.exports.run = async (bot, message, args) => {
  let mEmbed = new Discord.RichEmbed()
    .setColor(getMinisterColor())
    .setAuthor(`Official Wizarding book of potions`)
    .setFooter(`From ${bot.user.username}'s own private library`);

  potions.forEach(potion => {
    mEmbed.addField(
      `**${potion.name}**`,
      `**Description:** ${potion.description}\n**Use:** ${potion.use} | **Difficulty:** ${potion.difficulty}`
    );
  });

  message.reply({ embed: mEmbed });
  message.delete();
};

module.exports.config = {
  name: "potions",
  aliases: []
};
