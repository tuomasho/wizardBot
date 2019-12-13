const Discord = require("discord.js");
const colors = require("../json_files/colors.json");

module.exports.run = async (bot, message, args) => {
  let sEmbed = new Discord.RichEmbed()
    .setColor(colors.gryffindor_red)
    .setTitle("User info")
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Guild Name:**", `${message.guild.name}`, true)
    .addField("**Guild owner:**", `${message.guild.owner}`, true)
    .setFooter(`${bot.user.username} | Footer`);

  message.channel.send({ embed: sEmbed });
};

module.exports.config = {
  name: "serverinfo",
  aliases: ["si", "serverdesc"]
};
