const Discord = require("discord.js");
const subjects = require("../json_files/subjects.json");
const {
  addStudyTimer,
  checkForTimer
} = require("../functions/misc_functions/timers");

module.exports.run = async (bot, message, args) => {
  let author = message.author.id;

  if (args.length > 1) {
    var subjectString = args[0];
    var length = args[1];

    subjects.forEach(subject => {
      if (subject.use == subjectString) {
        if (!checkForTimer()) {
          addStudyTimer(author, subject.use, length);
        }
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
