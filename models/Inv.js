const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectSchema = new Schema({ name: String, count: Number });
var SpellsSchema = new Schema({ name: String, level: Number });
var PotionSkillSchema = new Schema({ name: String, level: Number });
var SubjectSchema = new Schema({ name: String, level: Number });

//Create Schema
const InvSchema = new Schema({
  discordID: {
    type: String,
    require: true
  },
  ownedItems: {
    type: [ObjectSchema]
  },
  knownSpells: {
    type: [SpellsSchema]
  },
  knownPotions: {
    type: [PotionSkillSchema]
  },
  learnedSubjects: {
    type: [SubjectSchema]
  }
});

module.exports = Inv = mongoose.model("inv", InvSchema);
