const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const StatSchema = new Schema({
  discordID: {
    type: String,
    require: true
  },
  xp: {
    type: Number,
    require: true
  },
  hp: {
    type: Number,
    require: true
  },
  strength: {
    type: Number,
    require: true
  },
  spells: {
    type: Number,
    require: true
  },
  flying: {
    type: Number,
    require: true
  },
  bravery: {
    type: Number,
    require: true
  },
  intelligence: {
    type: Number,
    require: true
  },
  potions: {
    type: Number,
    require: true
  },
  herbology: {
    type: Number,
    require: true
  },
  money: {
    type: Number,
    require: true
  },
  reputation: {
    type: Number,
    require: true
  }
});

module.exports = Stat = mongoose.model("stat", StatSchema);
