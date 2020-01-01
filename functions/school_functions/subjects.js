const subs = require("../../json_files/subjects.json");
const mongoose = require("mongoose");

//User model
const Inv = require("../../models/Inv");

module.exports.baseSubjects = () => {
  var base = new Array(subs.length);

  subs.forEach((sub, index) => {
    var baseSub = {
      name: sub.name,
      level: 1
    };

    base[index] = baseSub;
  });

  return base;
};

module.exports.studySubject = (message, authorHouse, subject, length) => {
  Inv.findOne({ discordID: `${message.author.id}` })
    .lean()
    .exec((err, inv) => {
      inv.learnedSubjects.forEach(invSubject => {
        if (invSubject.name == subject.name) {
          //Check if user has bonus on studyin subject
          if (authorHouse == subject.bonusHouse) {
            invSubject.level += 0.01 * length * 2;
          } else {
            invSubject.level += 0.01 * length;
          }

          Inv.where({ discordID: `${message.author.id}` })
            .updateOne({
              learnedSubjects: inv.learnedSubjects
            })
            .then(() => {
              message.reply(
                ` you have finished studying ${invSubject.name}. Your new level on the subject is ${invSubject.level}`
              );
            });
        }
      });
    });
};
