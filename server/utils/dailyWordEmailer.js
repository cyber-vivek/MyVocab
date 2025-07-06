const userModel = require('../models/userModel');
const wordModel = require('../models/wordModel');
const { DAYS_OF_WEEK } = require('./constants');
const { send_mail } = require('./emailsender');
sendDailyEmailToEachUser = async (req, res, next) => {
  try {
    const users = await userModel.find({sendEmail: true});
    const userDetails = users.map((user) => ({ name: user.name, email: user.email, _id: user._id }));
    for (let user of userDetails) {
      const revisionWord = await wordModel.find({ user: user._id }).sort({ lastVisited: 1 }).limit(1).lean();
      const { name = '', meaning = '' } = getWordMeaning(revisionWord[0]);
      const mailSubject = getMailSubject(user.name);
      const lastRevsionDate = new Date(revisionWord[0].lastVisited).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const mailBody = generateDailyWordHtml(user, name, meaning, lastRevsionDate);
      await send_mail(user.email, mailSubject, mailBody);
    }
    return res.json({message: 'successfully sent email'});
  } catch (err) {
    return res.json({message:'failed', error: err});
   }
}

const getWordMeaning = (word) => {
  try {
    const name = word.name;
    let meaning = '';
    if (word?.userMeanings?.length) {
      meaning = word?.meanings?.[0]?.definitions?.[0].definition;
    } else if (word?.meanings?.length) {
      meaning = word?.meanings?.[0]?.definitions?.[0].definition;
    }
    return { name, meaning };
  } catch (e) {
    return { name: '', meaning: '' };
  }
}

const getMailSubject = (name) => {
  const today = new Date();
  const dayOfWeek = DAYS_OF_WEEK[today.getDay()];
  const date = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return `Hello There, ${name}! Happy ${dayOfWeek} (${date})`;
}

const generateDailyWordHtml = (user, word, meaning, lastRevsionDate) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; text-align: center; padding: 20px;">
  <h1 style="color: #4CAF50;">Good Morning, ${user.name}!</h1>
  <p style="font-size: 18px;">Here's the revision word for you to review:</p>
  <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; display: inline-block; margin: 10px auto;">
      <h2 style="color: #007BFF; margin: 0;">${word}</h2>
      <p style="font-style: italic; margin: 5px 0; color: #555;">${meaning}</p>
  </div>
  <p style="margin: 10px 0; font-size: 14px; color: #888;">
    <strong>Last Revised On:</strong> ${lastRevsionDate}<br>
  </p>
  <p>Click below for more Details:</p>
  <a href="https://my-vocab-client.vercel.app/revision" style="
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
      margin-top: 20px;
  ">Mark Revision</a>
  </div>`
}

module.exports = {
  sendDailyEmailToEachUser,
}