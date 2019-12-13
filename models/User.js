const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ItemSchema = new Schema({ name: String });

//Create Schema
const UserSchema = new Schema({
  discordID: {
    type: String,
    require: true
  },
  characterFirstname: {
    type: String,
    require: true
  },
  characterLastname: {
    type: String,
    require: true
  },
  currentHouse: {
    type: String,
    enum: ["gryffindor", "hufflepuff", "ravenclaw", "slytherin", "null"],
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
