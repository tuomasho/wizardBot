const { studySubject } = require("../../functions/school_functions/subjects");
const minute = 60000;

let timers = new Array();

module.exports.addStudyTimer = (message, authorHouse, subject, time) => {
  if (time < 721) {
    setTimeout(() => {
      studySubject(message, authorHouse, subject, time);
    }, time * minute);
  } else {
  }
};

module.exports.checkForTimer = author => {
  timers.forEach(timer => {});
};

module.exports.removeTimer = author => {};
