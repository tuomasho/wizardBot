const Discord = require("discord.js");
const { getMinisterColor } = require("../functions/misc_functions/color");
const spells = require("../json_files/spells.json");

module.exports.run = async (bot, message, args) => {
  let mEmbed = new Discord.RichEmbed()
    .setColor(getMinisterColor())
    .setAuthor(`Official Wizarding spellbook`)
    .setFooter(`From ${bot.user.username}'s own private library`);

  spells.forEach(spell => {
    mEmbed.addField(
      `**${spell.name}**`,
      `**Type:** ${spell.type} | **Cast:** ${spell.cast}\n**Description:** ${spell.description}\n**Base damge:** ${spell.baseDamage} | **Difficulty:** ${spell.difficulty}`
    );
  });

  message.reply({ embed: mEmbed });
  message.delete();
};

module.exports.config = {
  name: "spellbook",
  aliases: ["spells"]
};
