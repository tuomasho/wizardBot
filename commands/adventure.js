const subjects = require("../json_files/subjects.json");
const {
  addAdventureTimer,
  checkForTimer
} = require("../functions/misc_functions/timers");

//User model
const User = require("../models/User");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;

  if (args.length > 0) {
    var length = args[0];
    User.findOne({ discordID: `${author}` })
      .lean()
      .exec((err, user) => {
        if (!checkForTimer(author)) {
          if (err) {
            console.log("[LOGS]: " + err);
          } else {
            message.reply(
              ` you have started adventure at ${user.currentLocation}.`
            );
            addAdventureTimer(message, length);
          }
        } else {
          //There is active timer for this user.
          message.reply(
            ` you are currently ${user.currentActivity} at ${user.currentLocation}. Type !stop to stop current action.`
          );
          message.delete();
        }
      });
  } else {
    //Missing argument
    message.reply(
      " you are missing an argument.\nPlease use !adventure <length>. Length is presented in minutes.\nFor example '!adventure 10' to adventure at your current location for 10 minutes."
    );
  }
};

module.exports.config = {
  name: "adventure",
  aliases: []
};
