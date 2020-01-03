const Discord = require("discord.js");
const { getMinisterColor } = require("../functions/misc_functions/color");
const places = require("../json_files/places.json");

//User model
const User = require("../models/User");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;

  User.findOne({ discordID: `${author}` })
    .lean()
    .exec((err, user) => {
      let distances = Array();
      let location = 0;

      places.forEach(place => {
        if (place.name == user.currentLocation) {
          location = place.location;
        }
      });

      places.forEach(place => {
        let distance = Math.abs(place.location - location);

        let spot = {
          name: place.name,
          use: place.use,
          location: distance
        };

        distances.push(spot);
      });

      let mEmbed = new Discord.RichEmbed()
        .setColor(getMinisterColor())
        .setAuthor(`Location guide to wizarding world.`)
        .setFooter(`Wizarding world map.`);

      distances.forEach(place => {
        mEmbed.addField(
          `**${place.name}**`,
          `**Use:** ${place.use} | **Distance to:** ${place.location}`
        );
      });

      message.reply({ embed: mEmbed });
      message.delete();
    });
};

module.exports.config = {
  name: "places",
  aliases: []
};
