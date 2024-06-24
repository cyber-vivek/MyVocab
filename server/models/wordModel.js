const mongoose = require("mongoose");

const meaningSchema = mongoose.Schema({
    definitions: [{
      definition: {type: String, required: true},
      example: String,
    }],
    synonyms: [String],
    antonyms: [String],
    partOfSpeech: String,
}, {_id: false})

const MessageSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    userDefinition: [meaningSchema],
    phonetics: {text: String, audio: String},
    origin: String,
    meanings: [meaningSchema],
    lastVisited: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", MessageSchema);