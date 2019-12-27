const subs = require("../../json_files/subjects.json");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
