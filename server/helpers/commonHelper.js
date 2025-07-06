const Word = require("../models/wordModel");
const mongoose = require('mongoose');
const AppError = require("../utils/AppError");

const generateMCQ = async (userId, questionsCount) => {
    const quizWords = await Word.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $sample: { size: questionsCount } },
    ]);

    if (quizWords.length < questionsCount) {
      throw new AppError("Please add more than 10 words to start test.", 403);
    }
    
    const distractorPool = await Word.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $sample: { size: questionsCount * 5 } },
    ]);

    const questionsBank = quizWords.map((word) => {
        const meaning = getWordMeaning(word);
      if(!meaning || !meaning?.definitions?.length) {
        throw new AppError(`Word "${word.name}" does not have a valid meaning.`, 400);
      }
      const correctMeaning = meaning.definitions?.[0]?.definition;

      const incorrectMeanings = [];
      while (incorrectMeanings.length < 3) {
        const randomWord = distractorPool[Math.floor(Math.random() * distractorPool.length)];

        if (randomWord._id.equals(word._id)) continue;

        const randomWordMeanings = getWordMeaning(randomWord);
        if (!randomWordMeanings || !randomWordMeanings?.definitions?.length) {
          continue;
        }
        const randomMeaning = randomWordMeanings?.definitions?.[0]?.definition;
        if (
          randomMeaning !== correctMeaning &&
          !incorrectMeanings.includes(randomMeaning)
        ) {
          incorrectMeanings.push(randomMeaning);
        }
      }

      const options = [...incorrectMeanings, correctMeaning].sort(() => Math.random() - 0.5);

      return {
        question: `What is the meaning of "${word.name}"?`,
        options,
        correctIndex: options.indexOf(correctMeaning),
      };
    });

    return questionsBank;
};

const getWordMeaning = (word) => {
    return word.userMeanings?.length
      ? word?.userMeanings?.[0]
      : word?.meanings?.[0];
}

module.exports = {
  generateMCQ,
};
