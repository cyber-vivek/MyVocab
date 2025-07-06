const { generateMCQ } = require("../helpers/commonHelper");
const { errorHandler } = require("../helpers/requestHandler");
const AppError = require("../utils/AppError");

const generateTest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const questionsCount = +req.body.questionsCount || 10;
    if(questionsCount > 10) {
      throw new AppError("You can only generate a test with a maximum of 10 questions.", 403);
    }
    const questionsBank = await generateMCQ(userId, questionsCount);
    return res.json({
      message: "Test Generated Successfully!",
      data: questionsBank,
    });
  } catch (err) {
    const { status, message, error } = err;
    return errorHandler(res, error, status, message);
  }
};

module.exports = {
  generateTest,
};
