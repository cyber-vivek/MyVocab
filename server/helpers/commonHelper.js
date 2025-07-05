const Word = require("../models/wordModel");

const generateMCQ = async () => {
  const options = await Word.aggregate([{ $sample: { size: 4 } }]);

  if (options.length < 4) {
    throw new Error("Not enough words in the database.");
  }

  const correctIndex = Math.floor(Math.random() * options.length);
  const correct = options[correctIndex];
  const mcqOptions = [];
  for (opt of options) {
    const meaning = opt.userMeanings?.length
      ? opt.userMeanings[0]
      : opt.meanings[0];
    mcqOptions.push(meaning.definitions?.[0]?.definition);
  }

  return {
    question: `What is the definition of "${correct.name}"?`,
    options: mcqOptions,
    answer: correct.definition,
    correctIndex,
  };
};

module.exports = {
  generateMCQ,
};
