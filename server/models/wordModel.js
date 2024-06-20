const mongoose = require("mongoose");

const meaningSchema = mongoose.Schema({
    definition: {type: String, required: true},
    example: String,

})

const MessageSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    userDefinition: [meaningSchema],
    phonetics: Array,
    origin: String,
    defintions: [meaningSchema],
    lastVisited: {type: Date, default: Date.now},
    synonyms: [String],
    antonyms: [String],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", MessageSchema);