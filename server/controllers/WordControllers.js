const Word = require('../models/wordModel');
const axios = require('axios');

const addWord = async (req, res, next) => {
  const body = req.body;
  const name = body.name;
  const userMeanings = body.meanings || [];
  let apiResponse = {};
  try {
    apiResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`);
  } catch (err) { }
  const apiData = apiResponse.data;
  let phonetics = {};
  let meanings = [];
  let origin = apiData?.[0]?.origin || '';
  apiData?.forEach(word => {
    let wmeanings = word.meanings || [];
    wmeanings?.forEach(meaning => {
      meaning.definitions = meaning?.definitions.map(def => ({ definition: def.definition, example: def.example }))
    })
    meanings = [...meanings, ...wmeanings];
    let apiPhonetics = word?.phonetics || [];
    if (!phonetics?.audio?.length) {
      apiPhonetics = apiPhonetics.filter(phone => phone?.audio?.length);
      phonetics = { text: apiPhonetics[0]?.text, audio: apiPhonetics[0]?.audio };
    }
  });
  const word = new Word({ name, userMeanings, phonetics, origin, meanings, user: req.user.id });
  word.save().then(() => {
    return res.json({ message: 'Word Added Successfully!', data: word });
  }).catch(err => {
    return res.status(400).json({ message: 'Some Error Occured!', error: err });
  })
}

const getWords = async (req, res, next) => {
  let { pageNo = 1, pageSize = 10 } = req.query;
  pageNo = +pageNo;
  pageSize = +pageSize;
  if (pageNo < 1) {
    return res.status(400).json({ message: 'Invalid Page Number' });
  }
  const [data, totalRecords] = await Promise.all([
    Word.find({user: req.user.id}).sort({ _id: -1 }).skip((pageNo - 1) * pageSize).limit(pageSize).lean(),
    Word.countDocuments({user: req.user.id}),
  ]);
  const paginationInfo = {
    pageNo,
    pageSize,
    totalRecords,
  }
  return res.json({ message: 'Words Fetched Successfully!', data, paginationInfo });
}

module.exports = {
  addWord,
  getWords
}