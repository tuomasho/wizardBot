const Discord = require("discord.js");
const subjects = require("../json_files/subjects.json");
const {
  addStudyTimer,
  checkForTimer
} = require("../functions/misc_functions/timers");

//User model
const User = require("../models/User");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;

  if (args.length > 1) {
    var subjectString = args[0];
    var length = args[1];

    subjects.forEach(subject => {
      if (subject.use == subjectString) {
        User.findOne({ discordID: `${author}` })
          .lean()
          .exec((err, user) => {
            if (!checkForTimer(author)) {
              if (err) {
                console.log("[LOGS]: " + err);
              } else {
                if (user.currentLocation == "Hogwarts") {
                  message.reply(
                    ` you have started studying ${subject.name} for ${length} minutes.`
                  );
                  addStudyTimer(message, user.currentHouse, subject, length);
                } else {
                  message.reply(" you must be inside of Hogwarts to study.");
                }
              }
            } else {
              //There is active timer for this user.
              message.reply(
                ` you are currently ${user.currentActivity} at ${user.currentLocation}. Type !stop to stop current action.`
              );
              message.delete();
            }
          });
      }
    });
  } else {
    //Missing argument
    message.reply(
      " you are missing an argument.\nPlease use !study <subject> <length>. Length is presented in minutes.\nFor example '!study magical_creatures 10' to study Care of magical creatures for 10 minutes.\nIf you need help with subjects please type !subjects."
    );
  }
};

module.exports.config = {
  name: "study",
  aliases: []
};
