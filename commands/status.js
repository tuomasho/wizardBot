//User model
const User = require("../models/User");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;

  User.findOne({ discordID: `${author}` })
    .lean()
    .exec((err, user) => {
      message.reply(
        ` you are currently ${user.currentActivity} at ${user.currentLocation}.`
      );
      message.delete();
    });
};

module.exports.config = {
  name: "status",
  aliases: []
};
