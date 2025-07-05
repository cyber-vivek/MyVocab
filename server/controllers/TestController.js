const { generateMCQ } = require("../helpers/commonHelper");
const { errorHandler } = require("../helpers/requestHandler");

const generateTest = async (req, res, next) => {
  try {
    const questions = 2;
    const generatedQuestions = [];
    for (let i = 0; i < questions; i++) {
      const question = await generateMCQ();
      generatedQuestions.push(question);
    }
    return res.json({
      message: "Test Generated Successfully!",
      data: generatedQuestions,
    });
  } catch (err) {
    const { status, message, error } = err.message;
    return errorHandler(res, error, status, message);
  }
};

module.exports = {
  generateTest,
};
