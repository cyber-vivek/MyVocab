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

const WordSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userMeanings: [meaningSchema],
    phonetics: {text: String, audio: String},
    origin: String,
    meanings: [meaningSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastVisited: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
  }
);
WordSchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Word", WordSchema);