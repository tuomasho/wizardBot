const Discord = require("discord.js");
const { getMinisterColor } = require("../functions/misc_functions/color");
const subjects = require("../json_files/subjects.json");

module.exports.run = async (bot, message, args) => {
  let mEmbed = new Discord.RichEmbed()
    .setColor(getMinisterColor())
    .setAuthor(`Official curriculum of Hogwarts`)
    .setFooter(`Hogwarts timetable.`);

  subjects.forEach(subject => {
    mEmbed.addField(
      `**${subject.name}**`,
      `**Use:** ${subject.use} | **House bonus:** ${subject.bonusHouse}`
    );
  });

  message.reply({ embed: mEmbed });
  message.delete();
};

module.exports.config = {
  name: "subjects",
  aliases: []
};
