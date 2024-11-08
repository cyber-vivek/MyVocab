const { errorHandler, successResponse } = require('../helpers/requestHandler');
const Word = require('../models/wordModel');
const { isValidObjectId } = require('mongoose');
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
  try {
    let { pageNo = 1, pageSize = 10, query = '' } = req.query;
    pageNo = +pageNo;
    pageSize = +pageSize;
    if (pageNo < 1) {
      throw Error({ message: 'Invalid Word Id', status: 400 });
    }
    let reg = new RegExp(query);
    const [data, totalRecords] = await Promise.all([
      Word.find({ user: req.user.id, name: { $regex: reg, $options: 'i' } }).sort({ _id: -1 }).skip((pageNo - 1) * pageSize).limit(pageSize).lean(),
      Word.countDocuments({ user: req.user.id }),
    ]);
    const paginationInfo = {
      pageNo,
      pageSize,
      totalRecords,
    }
    return res.json({ message: 'Words Fetched Successfully!', data, paginationInfo });
  } catch (err) {
    const { status, message, error } = err.message;
    return errorHandler(res, error, status, message);
  }
}

const updateWord = async (req, res, next) => {
  try {
    const { wordId = '', userMeanings = [] } = req.body;
    if (!wordId) throw Error({ message: 'Unable to update' });
    const word = await Word.findOneAndUpdate({ _id: wordId }, { userMeanings }, { new: true }).lean();
    return successResponse(res, word, "Successfully Update the word");
  } catch (err) {
    const { status, message, error } = err.message;
    return errorHandler(res, error, status, message);
  }
}

const deleteWord = async (req, res, next) => {
  try {
    const { wordId } = req.body;
    if (!isValidObjectId(wordId)) {
      throw Error({ message: 'Invalid Word Id' });
    }
    await Word.findByIdAndDelete(wordId);
    return successResponse(res, [], 'Successfully Deleted the Word');
  } catch (err) {
    const { status, message, error } = err.message;
    return errorHandler(res, error, status, message);
  }
}

const getRevisionWord = async (req, res, next) => {
  try {
    const word = await Word.find({ user: req.user.id }).sort({lastVisited: 1}).limit(1).lean();
    return successResponse(res, word, 'Successfuly Retrived Least Revised Word');
  } catch (err) {
    const { status, message, error } = err.message;
    return errorHandler(res, error, status, message);
  }
}

const markRevision = async (req, res, next) => {
  try{
    const {wordId} = req.body;
    const word = await Word.findOneAndUpdate({ _id: wordId }, { lastVisited: new Date() }).lean();
    return successResponse(res, [], "Successfully marked Revision");
  } catch(err) {

  } 
  const {wordId} = req.body;

}

module.exports = {
  addWord,
  getWords,
  updateWord,
  deleteWord,
  getRevisionWord,
  markRevision,
}