const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ItemSchema = new Schema({ name: String });

//Create Schema
const UserSchema = new Schema({
  discordID: {
    type: String,
    require: true
  },
  lastCheckin: {
    type: Number,
    default: new Date().getTime()
  },
  characterFirstname: {
    type: String,
    require: true
  },
  characterLastname: {
    type: String,
    require: true
  },
  currentActivity: {
    type: String,
    enum: ["none", "studying", "practicing", "adventuring"],
    require: true
  },
  currentLocation: {
    type: String,
    enum: [
      "Hogwarts",
      "Diagon Alley",
      "Knockturn Alley",
      "The Hog's Head",
      "The Forbidden Forest",
      "Ministry of Magic",
      "Azkaban",
      "Gringotts Wizarding Bank"
    ],
    require: true
  },
  currentHouse: {
    type: String,
    enum: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "null"],
    default: "null",
    require: true
  },
  timesGryffindor: {
    type: Number,
    require: true
  },
  timesHufflepuff: {
    type: Number,
    require: true
  },
  timesRavenclaw: {
    type: Number,
    require: true
  },
  timesSlytherin: {
    type: Number,
    require: true
  },
  familyMoney: {
    type: Number
  },
  familyItems: {
    type: [ItemSchema]
  }
});

module.exports = User = mongoose.model("user", UserSchema);
