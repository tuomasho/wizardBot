const { studySubject } = require("../../functions/school_functions/subjects");
const { completeAdventure } = require("./adventure");
const minute = 60000;

let timers = new Array();

//User model
const User = require("../../models/User");

module.exports.addStudyTimer = (message, authorHouse, subject, time) => {
  if (time < 721) {
    let timeout = setTimeout(() => {
      studySubject(message, authorHouse, subject, time);
      this.removeTimer(message.author.id);
      User.where({ discordID: `${message.author.id}` })
        .updateOne({
          currentActivity: "doing nothing"
        })
        .then();
    }, time * minute);

    var timer = {
      author: message.author.id,
      timeout: timeout
    };

    timers.push(timer);

    User.where({ discordID: `${message.author.id}` })
      .updateOne({
        currentActivity: "studying"
      })
      .then();
  } else {
    message.reply(" study length must be 720 or less minutes.");
  }
};

module.exports.addAdventureTimer = (message, time) => {
  if (time < 121) {
    let timeout = setTimeout(() => {
      completeAdventure(message, time);
      this.removeTimer(message.author.id);
      User.where({ discordID: `${message.author.id}` })
        .updateOne({
          currentActivity: "doing nothing"
        })
        .then();
    }, time * minute);

    var timer = {
      author: message.author.id,
      timeout: timeout
    };

    timers.push(timer);

    User.where({ discordID: `${message.author.id}` })
      .updateOne({
        currentActivity: "adventuring"
      })
      .then();
  } else {
    message.reply(" you cannot adventure for longer than 120 minutes.");
  }
};

module.exports.checkForTimer = author => {
  let found = false;
  timers.forEach(timer => {
    if (timer.author == author) {
      found = true;
    }
  });

  return found;
};

module.exports.removeTimer = author => {
  timers.forEach((timer, index) => {
    if (timer.author == author) {
      clearTimeout(timer.timeout);
      timers.splice(index, 1);
    }
  });
};
